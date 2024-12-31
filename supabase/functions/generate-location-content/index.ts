import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');
const COMPANY_NAME = "CTRL Tech";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { city, state } = await req.json();

    if (!city || !state) {
      return new Response(
        JSON.stringify({ error: "City and state are required" }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`Generating content for ${city}, ${state}`);

    // Generate content using OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://ctrl.tech",
        "X-Title": "CTRL Tech Location Content Generator",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a professional content writer for ${COMPANY_NAME}, an IT services and AI automation company. Create engaging, SEO-optimized content for our location pages.`
          },
          {
            role: "user",
            content: `Create detailed content sections for our ${city}, ${state} location page including:
            1. A local introduction about the business environment
            2. Services offered with internal links
            3. Local business challenges
            4. Why choose us section
            5. Generic testimonials (2-3)
            Focus on local business challenges and how we solve them.`
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

    console.log(`Checking existing content for ${city}, ${state}`);

    // First check if content exists for this city/state
    const { data: existingLocation } = await supabase
      .from("locations")
      .select("id")
      .eq("city", city)
      .eq("state", state)
      .maybeSingle();

    const contentData = {
      city,
      state,
      content: JSON.stringify({
        main: generatedContent,
        services: [
          { name: "Cybersecurity", slug: "cybersecurity", description: "Protect your business with enterprise-grade security" },
          { name: "Cloud Solutions", slug: "cloud-solutions", description: "Seamless cloud migration and management" },
          { name: "IT Support", slug: "it-support", description: "24/7 technical support and maintenance" },
          { name: "AI Automation", slug: "ai-automation", description: "Streamline operations with AI" },
          { name: "Network Management", slug: "network-management", description: "Optimize your network infrastructure" }
        ],
        industries: [
          { name: "Healthcare", slug: "healthcare", description: "HIPAA-compliant IT solutions" },
          { name: "Manufacturing", slug: "manufacturing", description: "Smart manufacturing solutions" },
          { name: "Finance", slug: "finance", description: "Secure financial technology" },
          { name: "Retail", slug: "retail", description: "Modern retail IT solutions" },
          { name: "Legal", slug: "legal", description: "Legal tech solutions" }
        ]
      }),
      meta_title: `${COMPANY_NAME} IT Services & AI Automation in ${city}, ${state}`,
      meta_description: `Enhance your ${city} business operations with ${COMPANY_NAME}'s IT services and AI automation solutions. Expert local support, 24/7 service, and innovative technology solutions.`
    };

    let result;
    if (existingLocation) {
      console.log(`Updating existing content for ${city}, ${state}`);
      const { data, error } = await supabase
        .from("locations")
        .update(contentData)
        .eq("id", existingLocation.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      console.log(`Creating new content for ${city}, ${state}`);
      const { data, error } = await supabase
        .from("locations")
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