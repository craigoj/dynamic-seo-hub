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
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { industry } = await req.json()
    console.log('Generating content for industry:', industry)

    // Convert industry slug to the format used in industryData
    const normalizedSlug = industry.toLowerCase().replace(/\s+/g, '-')
    
    if (!industry || !industryData[normalizedSlug]) {
      console.error('Invalid industry specified:', industry, 'Normalized slug:', normalizedSlug)
      console.error('Available industries:', Object.keys(industryData))
      throw new Error('Invalid industry specified')
    }

    const industryInfo = industryData[normalizedSlug]
    const { content, metaTitle, metaDescription } = generateContent(industry, industryInfo)

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Store the generated content
    const { data, error } = await supabase
      .from('industries')
      .upsert({
        name: industryInfo.name,
        slug: normalizedSlug,
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