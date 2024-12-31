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
    const { city, state, service } = await req.json();

    if (!city || !state || !service) {
      return new Response(
        JSON.stringify({ error: "City, state, and service are required" }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`Generating service content for ${service} in ${city}, ${state}`);

    // Generate content using OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://ctrl.tech",
        "X-Title": "CTRL Tech Location Service Content Generator",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a professional content writer for ${COMPANY_NAME}, an IT services and AI automation company. Create engaging, SEO-optimized content for location-specific service pages.`
          },
          {
            role: "user",
            content: `Create detailed content for our ${service} service in ${city}, ${state} including:
            1. Main content about the service specific to this location
            2. Key features of the service (5-7 items)
            3. Benefits for local businesses (5-7 items)
            4. Frequently asked questions (3-5 items)
            Format the content with proper HTML structure.
            Make sure to include local context and references to ${city}, ${state}.`
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

    // Parse the generated content to extract different sections
    const sections = generatedContent.split('\n\n');
    let mainContent = '';
    let features = [];
    let benefits = [];
    let faqs = [];

    // Simple parsing logic - can be improved based on actual AI output format
    sections.forEach(section => {
      if (section.toLowerCase().includes('features:')) {
        features = section.split('\n').slice(1).map(f => f.replace(/^[•-]\s*/, '').trim()).filter(Boolean);
      } else if (section.toLowerCase().includes('benefits:')) {
        benefits = section.split('\n').slice(1).map(b => b.replace(/^[•-]\s*/, '').trim()).filter(Boolean);
      } else if (section.toLowerCase().includes('faq')) {
        const faqLines = section.split('\n').slice(1);
        for (let i = 0; i < faqLines.length; i += 2) {
          if (faqLines[i] && faqLines[i + 1]) {
            faqs.push({
              question: faqLines[i].replace(/^[QA\d.:]*/i, '').trim(),
              answer: faqLines[i + 1].replace(/^[QA\d.:]*/i, '').trim()
            });
          }
        }
      } else {
        mainContent += section + '\n\n';
      }
    });

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const contentData = {
      service,
      city,
      state,
      content: mainContent,
      meta_title: `${service} Services in ${city}, ${state} | ${COMPANY_NAME}`,
      meta_description: `Transform your ${city} business with ${COMPANY_NAME}'s professional ${service} services. Local expertise, 24/7 support, and customized solutions for ${state} businesses.`,
      features,
      benefits,
      faqs,
      schema_markup: {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": `${service} Services in ${city}, ${state}`,
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
      .eq("service", service)
      .eq("city", city)
      .eq("state", state)
      .maybeSingle();

    let result;
    if (existingContent) {
      console.log(`Updating existing content for ${service} in ${city}, ${state}`);
      const { data, error } = await supabase
        .from("location_service_content")
        .update(contentData)
        .eq("id", existingContent.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      console.log(`Creating new content for ${service} in ${city}, ${state}`);
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