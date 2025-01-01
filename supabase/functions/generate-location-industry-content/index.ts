import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');
const COMPANY_NAME = "CTRL Tech";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { city, state, industry } = await req.json();

    if (!city || !state || !industry) {
      return new Response(
        JSON.stringify({ error: "City, state, and industry are required" }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`Generating industry content for ${industry} in ${city}, ${state}`);

    // Generate content using OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://ctrl.tech",
        "X-Title": "CTRL Tech Location Industry Content Generator",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a professional content writer for ${COMPANY_NAME}, an IT services and AI automation company. Create engaging, SEO-optimized content for location-specific industry pages.`
          },
          {
            role: "user",
            content: `Create detailed content about how our IT and AI automation services help ${industry} businesses in ${city}, ${state}. Include:
            1. Overview of the local ${industry} market
            2. Specific challenges faced by ${industry} businesses in ${city}
            3. How our solutions address these challenges
            4. Success stories or case studies (hypothetical but realistic)
            5. Call to action
            Format the content with proper HTML structure and Tailwind CSS classes.`
          }
        ]
      })
    });

    if (!response.ok) {
      console.error('OpenRouter API error:', await response.text());
      throw new Error('Failed to generate content from OpenRouter API');
    }

    const aiResponse = await response.json();
    const generatedContent = aiResponse.choices[0].message.content;

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const contentData = {
      service: industry,
      city,
      state,
      content: generatedContent,
      meta_title: `${industry} IT Services & AI Solutions in ${city}, ${state} | ${COMPANY_NAME}`,
      meta_description: `Transform your ${city}-based ${industry} business with ${COMPANY_NAME}'s professional IT services and AI automation. Local expertise and customized solutions for ${state} businesses.`,
      schema_markup: {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": `${industry} IT Services in ${city}, ${state}`,
        "provider": {
          "@type": "Organization",
          "name": COMPANY_NAME
        },
        "areaServed": {
          "@type": "City",
          "name": city,
          "containedInPlace": {
            "@type": "State",
            "name": state
          }
        }
      }
    };

    // Check if content already exists
    const { data: existingContent } = await supabase
      .from("location_service_content")
      .select("id")
      .eq("service", industry)
      .eq("city", city)
      .eq("state", state)
      .maybeSingle();

    let result;
    if (existingContent) {
      console.log(`Updating existing content for ${industry} in ${city}, ${state}`);
      const { data, error } = await supabase
        .from("location_service_content")
        .update(contentData)
        .eq("id", existingContent.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      console.log(`Creating new content for ${industry} in ${city}, ${state}`);
      const { data, error } = await supabase
        .from("location_service_content")
        .insert(contentData)
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return new Response(
      JSON.stringify(result),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});