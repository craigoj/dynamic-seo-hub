import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface IndustryContent {
  name: string;
  painPoints: string[];
  solutions: string[];
  benefits: string[];
}

const industryData: Record<string, IndustryContent> = {
  healthcare: {
    name: "Healthcare",
    painPoints: [
      "Managing sensitive patient data securely",
      "Meeting strict regulatory compliance standards (HIPAA)",
      "Streamlining patient care workflows",
      "Reducing administrative overhead"
    ],
    solutions: [
      "Advanced cybersecurity systems for patient data protection",
      "Automated compliance monitoring and reporting",
      "AI-powered workflow optimization",
      "Integrated healthcare management systems"
    ],
    benefits: [
      "Enhanced patient data security and privacy",
      "Streamlined operations and reduced costs",
      "Improved patient care quality",
      "Simplified compliance management"
    ]
  },
  finance: {
    name: "Finance",
    painPoints: [
      "Protecting sensitive financial data",
      "Ensuring regulatory compliance",
      "Managing complex transaction systems",
      "Detecting fraud and security threats"
    ],
    solutions: [
      "Enterprise-grade security infrastructure",
      "Automated compliance monitoring",
      "AI-powered fraud detection",
      "Real-time transaction monitoring"
    ],
    benefits: [
      "Enhanced financial data security",
      "Reduced operational risks",
      "Improved customer trust",
      "Streamlined financial operations"
    ]
  },
  manufacturing: {
    name: "Manufacturing",
    painPoints: [
      "Optimizing production efficiency",
      "Managing supply chain complexity",
      "Maintaining equipment reliability",
      "Ensuring quality control"
    ],
    solutions: [
      "IoT-enabled production monitoring",
      "AI-powered predictive maintenance",
      "Automated quality control systems",
      "Real-time supply chain tracking"
    ],
    benefits: [
      "Increased production efficiency",
      "Reduced downtime and maintenance costs",
      "Improved product quality",
      "Enhanced supply chain visibility"
    ]
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { industry } = await req.json()
    console.log('Generating content for industry:', industry)

    if (!industry || !industryData[industry.toLowerCase()]) {
      throw new Error('Invalid industry specified')
    }

    const industryInfo = industryData[industry.toLowerCase()]
    const metaTitle = `${industryInfo.name} IT Services & AI Solutions - CTRL Tech`
    const metaDescription = `Transform your ${industryInfo.name.toLowerCase()} business with CTRL Tech's tailored IT services and AI automation solutions. Expert support for your industry-specific challenges.`

    // Generate the main content
    const content = {
      introduction: `
        <section class="prose prose-lg max-w-none mb-12">
          <h1 class="text-4xl font-bold mb-6">IT Services & AI Solutions for ${industryInfo.name}</h1>
          <p class="text-xl leading-relaxed">
            CTRL Tech understands the unique challenges faced by ${industryInfo.name.toLowerCase()} businesses. 
            Our tailored IT services and AI automation solutions help you overcome these challenges while driving 
            growth and efficiency in your operations.
          </p>
        </section>
      `,
      challenges: `
        <section class="mb-12">
          <h2 class="text-3xl font-bold mb-6">Common Challenges in ${industryInfo.name}</h2>
          <div class="grid md:grid-cols-2 gap-6">
            ${industryInfo.painPoints.map(point => `
              <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold mb-3">${point}</h3>
                <p class="text-gray-600">We understand the complexity of ${point.toLowerCase()} and provide solutions to address this challenge effectively.</p>
              </div>
            `).join('')}
          </div>
        </section>
      `,
      solutions: `
        <section class="mb-12 bg-gray-50 p-8 rounded-lg">
          <h2 class="text-3xl font-bold mb-6">Our ${industryInfo.name} Solutions</h2>
          <div class="grid md:grid-cols-2 gap-6">
            ${industryInfo.solutions.map(solution => `
              <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold mb-3">${solution}</h3>
                <p class="text-gray-600">Implement cutting-edge technology solutions designed specifically for ${industryInfo.name.toLowerCase()} businesses.</p>
              </div>
            `).join('')}
          </div>
        </section>
      `,
      benefits: `
        <section class="mb-12">
          <h2 class="text-3xl font-bold mb-6">Benefits for Your ${industryInfo.name} Business</h2>
          <div class="grid md:grid-cols-3 gap-6">
            ${industryInfo.benefits.map(benefit => `
              <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold mb-3">${benefit}</h3>
                <p class="text-gray-600">Experience tangible improvements in your operations with our tailored solutions.</p>
              </div>
            `).join('')}
          </div>
        </section>
      `,
      cta: `
        <section class="bg-blue-600 text-white p-8 rounded-lg text-center">
          <h2 class="text-3xl font-bold mb-4">Transform Your ${industryInfo.name} Business Today</h2>
          <p class="text-xl mb-6">
            Ready to overcome your IT challenges and leverage AI automation for growth? 
            Contact CTRL Tech for a personalized consultation.
          </p>
          <a href="/contact" class="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Schedule a Consultation
          </a>
        </section>
      `
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Store the generated content
    const { data, error } = await supabase
      .from('industries')
      .upsert({
        name: industryInfo.name,
        slug: industry.toLowerCase(),
        description: `Expert IT services and AI automation solutions for ${industryInfo.name.toLowerCase()} businesses.`,
        meta_title: metaTitle,
        meta_description: metaDescription,
        content: JSON.stringify(content),
        schema_markup: {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": `${industryInfo.name} IT Services & AI Solutions`,
          "provider": {
            "@type": "Organization",
            "name": "CTRL Tech"
          },
          "description": metaDescription,
          "serviceType": "IT Services and AI Automation"
        }
      }, {
        onConflict: 'slug'
      })
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify(data),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 400,
      },
    )
  }
})