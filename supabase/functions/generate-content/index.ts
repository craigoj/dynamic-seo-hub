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
    const generatedContent = {
      metaTitle: `Expert ${service} Services by CTRL Tech: Protect Your Business Today!`,
      metaDescription: `Strengthen your business with CTRL Tech's comprehensive ${service} solutions. Safeguard your digital assets and ensure uninterrupted operations. Contact us today!`,
      content: `
        <main>
          <section>
            <p>
              In today's dynamic business environment, ${service} has become essential for scaling your operations, enhancing security, and improving productivity. CTRL Tech is committed to providing cutting-edge, scalable ${service} services optimized for your unique business needs${city ? ` in ${city}` : ''}.
            </p>
          </section>
          
          <section>
            <h2>Key Features of Our ${service} Services</h2>
            <ul>
              <li>24/7 Monitoring and Support</li>
              <li>Proactive Maintenance</li>
              <li>Advanced Security Solutions</li>
              <li>Regular Updates and Patches</li>
              <li>Expert Technical Support</li>
            </ul>
          </section>
          
          <section>
            <h2>Benefits of Choosing CTRL Tech</h2>
            <ul>
              <li>Enhanced Security and Protection</li>
              <li>Improved Operational Efficiency</li>
              <li>Reduced Downtime and Risks</li>
              <li>Cost-Effective Solutions</li>
              <li>Peace of Mind</li>
            </ul>
          </section>
          
          <section>
            <h2>Protect Your Business with CTRL Tech Today!</h2>
            <p>
              Don't let threats disrupt your operations. With CTRL Tech's comprehensive ${service} services${city ? ` in ${city}` : ''}, your business will stay secure, compliant, and efficient. Contact us now for a free consultation and take the first step toward a better future.
            </p>
          </section>
        </main>
      `
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
          features: [
            "24/7 Monitoring and Support",
            "Proactive Maintenance",
            "Advanced Security Solutions",
            "Regular Updates and Patches",
            "Expert Technical Support"
          ],
          benefits: [
            "Enhanced Security and Protection",
            "Improved Operational Efficiency",
            "Reduced Downtime and Risks",
            "Cost-Effective Solutions",
            "Peace of Mind"
          ],
          faqs: [
            {
              question: `What ${service} services does CTRL Tech offer${city ? ` in ${city}` : ''}?`,
              answer: `We provide comprehensive ${service} solutions including 24/7 monitoring, proactive maintenance, and expert support${city ? ` to businesses in ${city}` : ''}.`
            },
            {
              question: "How quickly can you respond to issues?",
              answer: "We provide 24/7 support with rapid response times, typically addressing critical issues within 1 hour or less."
            },
            {
              question: "Do you offer customized solutions?",
              answer: `Yes, we tailor our ${service} services to meet your specific business needs and requirements.`
            }
          ]
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