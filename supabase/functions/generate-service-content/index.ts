import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"

const COMPANY_NAME = "CTRL Tech"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { city, service } = await req.json()

    if (!service) {
      throw new Error("Service is required")
    }

    const locationSpecific = city && city !== "general"
    const locationText = locationSpecific ? ` in ${city}` : ""

    // Create content for the service page
    const content = `
      <div class="prose max-w-none">
        <p>${COMPANY_NAME} provides professional ${service} services${locationText}. Our team of certified experts ensures your business stays secure and efficient with industry-leading solutions.</p>
        
        <h2>Our ${service} Solutions${locationText}</h2>
        <p>As your trusted technology partner${locationText}, we offer comprehensive ${service} services tailored to your business needs:</p>
        <ul>
          <li>24/7 Monitoring and Support</li>
          <li>Proactive Maintenance and Updates</li>
          <li>Risk Assessment and Compliance</li>
          <li>Employee Training and Best Practices</li>
          <li>Incident Response and Recovery</li>
        </ul>
        
        <h2>Why Choose ${COMPANY_NAME} for ${service}${locationText}?</h2>
        <p>With years of experience and a dedicated team of professionals${locationSpecific ? ` serving ${city}` : ""}, we deliver:</p>
        <ul>
          <li>Expert Technical Support</li>
          <li>Customized Solutions</li>
          <li>Rapid Response Times</li>
          <li>Competitive Pricing</li>
          <li>Proven Track Record</li>
        </ul>
      </div>
    `

    const metaTitle = `${service} Services${locationText} | ${COMPANY_NAME}`
    const metaDescription = `${COMPANY_NAME} provides professional ${service} services and solutions${locationText}. Contact us for reliable ${service.toLowerCase()} support and consulting.`

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Insert the service page data
    const { data, error } = await supabase
      .from("service_page_cache")
      .insert({
        city: city || "general",
        service,
        content,
        meta_title: metaTitle,
        meta_description: metaDescription,
        features: [
          "24/7 Monitoring",
          "Proactive Maintenance",
          "Risk Assessment",
          "Employee Training",
          "Incident Response"
        ],
        benefits: [
          "Enhanced Security",
          "Improved Efficiency",
          "Reduced Downtime",
          "Cost Savings",
          "Peace of Mind"
        ],
        faqs: [
          {
            question: `What ${service} services does ${COMPANY_NAME} offer${locationText}?`,
            answer: `We offer comprehensive ${service} solutions including 24/7 monitoring, proactive maintenance, risk assessment, employee training, and incident response${locationSpecific ? ` to businesses in ${city}` : ""}.`
          },
          {
            question: "How quickly can you respond to issues?",
            answer: `We provide 24/7 support with rapid response times${locationSpecific ? ` in ${city}` : ""}, typically addressing critical issues within 1 hour or less.`
          },
          {
            question: "Do you offer customized solutions?",
            answer: `Yes, we tailor our ${service} services to meet your specific business needs and requirements${locationSpecific ? ` in ${city}` : ""}.`
          }
        ]
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      throw error
    }

    return new Response(
      JSON.stringify(data),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      }
    )

  } catch (error) {
    console.error("Error:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 400,
      }
    )
  }
})