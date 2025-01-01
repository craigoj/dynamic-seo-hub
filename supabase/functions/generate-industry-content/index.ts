import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"
import { industryData } from "../_shared/industryData.ts"
import { generateContent } from "../_shared/contentGenerator.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { industry } = await req.json()
    console.log('Generating content for industry:', industry)

    // Convert industry slug to the format used in industryData
    const normalizedSlug = industry.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/^manufacturing$/, 'manufacturing-and-logistics')
      .replace(/^retail$/, 'retail-and-ecommerce')
      .replace(/^healthcare$/, 'healthcare-and-wellness')
      .replace(/^trades$/, 'trades-and-home-services')
      .replace(/^technology$/, 'technology-and-startups')
      .replace(/^education$/, 'education-and-non-profits')
      .replace(/^hospitality$/, 'hospitality-and-travel')
      .replace(/^local-government$/, 'local-governments')
      .replace(/^legal$/, 'professional-services')
      .replace(/^finance$/, 'finance-and-banking')
    
    console.log('Normalized slug:', normalizedSlug)

    // Create default industry data if not found
    const defaultIndustryData = {
      name: normalizedSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      painPoints: [
        "Legacy System Integration",
        "Data Security and Compliance",
        "Digital Transformation",
        "Operational Efficiency",
        "Customer Experience Enhancement"
      ],
      solutions: [
        "Custom IT Infrastructure",
        "AI-Powered Automation",
        "Cloud Migration Services",
        "Cybersecurity Solutions",
        "Digital Process Optimization"
      ],
      benefits: [
        "Increased Operational Efficiency",
        "Enhanced Security Posture",
        "Improved Customer Satisfaction",
        "Cost Optimization",
        "Competitive Advantage"
      ]
    }

    const industryInfo = industryData[normalizedSlug] || defaultIndustryData
    const { content, metaTitle, metaDescription } = generateContent(industry, industryInfo)

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Delete existing content first to clear the cache
    await supabase
      .from('industries')
      .delete()
      .eq('slug', normalizedSlug)

    // Store the generated content
    const { data, error } = await supabase
      .from('industries')
      .insert({
        name: industryInfo.name,
        slug: normalizedSlug,
        description: `Expert IT services and AI automation solutions for ${industryInfo.name.toLowerCase()} businesses.`,
        meta_title: metaTitle,
        meta_description: metaDescription,
        content: JSON.stringify({
          painPoints: industryInfo.painPoints,
          solutions: industryInfo.solutions,
          benefits: industryInfo.benefits
        }),
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
      })
      .select()
      .single()

    if (error) {
      console.error('Error storing content:', error)
      throw error
    }

    console.log('Successfully generated and stored content for:', normalizedSlug)
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