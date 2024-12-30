import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt, type, service, city, industry } = await req.json()

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // First, check if we have cached content
    if (type === 'service' && service) {
      const { data: cachedContent } = await supabase
        .from('service_page_cache')
        .select('*')
        .eq('service', service)
        .eq('city', city || 'general')
        .maybeSingle()

      if (cachedContent) {
        console.log('Returning cached content for service:', service)
        return new Response(
          JSON.stringify({ generatedText: cachedContent }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    // If no cached content, generate new content
    const locationText = city ? ` in ${city}` : '';
    const industryText = industry ? ` for ${industry} businesses` : '';
    
    const generatedContent = {
      metaTitle: `Professional ${service} Services${locationText}${industryText} | CTRL Tech`,
      metaDescription: `Transform your business with CTRL Tech's expert ${service} solutions${locationText}${industryText}. Get 24/7 support, advanced security, and tailored IT solutions. Contact us today!`,
      content: `
        <div class="prose prose-lg max-w-none dark:prose-invert">
          <section class="mb-12">
            <h2 class="text-3xl font-bold mb-6">Expert ${service} Solutions${locationText}${industryText}</h2>
            <p class="text-lg leading-relaxed mb-6">
              In today's rapidly evolving digital landscape, having robust ${service} solutions is crucial for business success${industryText}. At CTRL Tech, we deliver comprehensive ${service} services${locationText} that protect your assets, optimize your operations, and drive growth.
            </p>
            <p class="text-lg leading-relaxed">
              Our team of certified experts combines industry best practices with cutting-edge technology to provide solutions that are secure, scalable, and tailored to your specific needs${locationText}.
            </p>
          </section>

          <section class="mb-12">
            <h2 class="text-3xl font-bold mb-6">Why Choose CTRL Tech for ${service}${locationText}?</h2>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-card rounded-lg p-6 shadow-sm">
                <h3 class="text-xl font-semibold mb-4">Expertise & Experience</h3>
                <p>Our certified professionals bring years of experience in delivering ${service} solutions${industryText}.</p>
              </div>
              <div class="bg-card rounded-lg p-6 shadow-sm">
                <h3 class="text-xl font-semibold mb-4">24/7 Support</h3>
                <p>Round-the-clock monitoring and support ensure your systems are always protected and operational.</p>
              </div>
              <div class="bg-card rounded-lg p-6 shadow-sm">
                <h3 class="text-xl font-semibold mb-4">Customized Solutions</h3>
                <p>We tailor our ${service} services to match your unique business requirements and goals.</p>
              </div>
              <div class="bg-card rounded-lg p-6 shadow-sm">
                <h3 class="text-xl font-semibold mb-4">Proactive Approach</h3>
                <p>We identify and address potential issues before they impact your business operations.</p>
              </div>
            </div>
          </section>

          <section class="mb-12">
            <h2 class="text-3xl font-bold mb-6">Our Comprehensive ${service} Services</h2>
            <p class="text-lg mb-6">
              We offer a full spectrum of ${service} solutions${locationText} designed to protect, optimize, and transform your business:
            </p>
            <ul class="list-none space-y-4">
              <li class="flex items-start gap-4">
                <div class="bg-primary/10 p-3 rounded-full">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-semibold mb-2">Strategic Planning & Implementation</h3>
                  <p>Develop and execute comprehensive ${service} strategies aligned with your business objectives.</p>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="bg-primary/10 p-3 rounded-full">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-semibold mb-2">Proactive Monitoring & Maintenance</h3>
                  <p>24/7 system monitoring, regular updates, and preventive maintenance to ensure optimal performance.</p>
                </div>
              </li>
              <li class="flex items-start gap-4">
                <div class="bg-primary/10 p-3 rounded-full">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-semibold mb-2">Advanced Security Solutions</h3>
                  <p>Comprehensive security measures to protect your data and systems from evolving threats.</p>
                </div>
              </li>
            </ul>
          </section>

          <section class="mb-12">
            <h2 class="text-3xl font-bold mb-6">The CTRL Tech Advantage</h2>
            <div class="grid md:grid-cols-3 gap-6">
              <div class="bg-card rounded-lg p-6 shadow-sm">
                <h3 class="text-xl font-semibold mb-4">Proven Expertise</h3>
                <ul class="space-y-2">
                  <li>✓ Certified Professionals</li>
                  <li>✓ Industry Best Practices</li>
                  <li>✓ Continuous Training</li>
                </ul>
              </div>
              <div class="bg-card rounded-lg p-6 shadow-sm">
                <h3 class="text-xl font-semibold mb-4">Superior Support</h3>
                <ul class="space-y-2">
                  <li>✓ 24/7 Availability</li>
                  <li>✓ Rapid Response Times</li>
                  <li>✓ Dedicated Team</li>
                </ul>
              </div>
              <div class="bg-card rounded-lg p-6 shadow-sm">
                <h3 class="text-xl font-semibold mb-4">Business Focus</h3>
                <ul class="space-y-2">
                  <li>✓ Cost-Effective Solutions</li>
                  <li>✓ Scalable Services</li>
                  <li>✓ ROI-Driven Approach</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      `,
      features: [
        "Strategic ${service} Planning & Implementation",
        "24/7 Monitoring & Support",
        "Proactive Maintenance & Updates",
        "Advanced Security Solutions",
        "Scalable Infrastructure Management",
        "Disaster Recovery & Business Continuity",
        "Performance Optimization",
        "Compliance Management"
      ],
      benefits: [
        "Enhanced Security & Protection",
        "Improved Operational Efficiency",
        "Reduced Downtime & Risks",
        "Cost-Effective Solutions",
        "Scalable Infrastructure",
        "Expert Technical Support",
        "Proactive Problem Prevention",
        "Peace of Mind"
      ],
      faqs: [
        {
          question: `What ${service} services does CTRL Tech offer${locationText}?`,
          answer: `We provide comprehensive ${service} solutions including strategic planning, 24/7 monitoring, proactive maintenance, security management, and expert support${locationText}${industryText}.`
        },
        {
          question: "How quickly can you respond to issues?",
          answer: "We provide 24/7 support with rapid response times, typically addressing critical issues within 1 hour or less to minimize any potential impact on your business operations."
        },
        {
          question: "Do you offer customized solutions?",
          answer: `Yes, we tailor our ${service} services to meet your specific business needs and requirements${locationText}. Our solutions are scalable and can grow with your business.`
        },
        {
          question: "What makes CTRL Tech different from other providers?",
          answer: `We combine industry expertise, proactive support, and cutting-edge technology to deliver superior ${service} solutions${locationText}. Our focus is on building long-term partnerships and ensuring your success.`
        }
      ]
    }

    // Store the generated content in the cache
    if (type === 'service' && service) {
      console.log('Storing new content in cache for service:', service)
      const { error: cacheError } = await supabase
        .from('service_page_cache')
        .upsert({
          service,
          city: city || 'general',
          content: generatedContent.content,
          meta_title: generatedContent.metaTitle,
          meta_description: generatedContent.metaDescription,
          features: generatedContent.features,
          benefits: generatedContent.benefits,
          faqs: generatedContent.faqs
        })

      if (cacheError) {
        console.error('Error caching content:', cacheError)
      }
    }

    return new Response(
      JSON.stringify({ generatedText: generatedContent }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})