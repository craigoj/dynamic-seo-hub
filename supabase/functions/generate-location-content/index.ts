import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');
const COMPANY_NAME = "CTRL Tech";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { city, state } = await req.json();

    if (!city || !state) {
      throw new Error("City and state are required");
    }

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

    const aiResponse = await response.json();
    const generatedContent = aiResponse.choices[0].message.content;

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Store the generated content
    const { data, error } = await supabase
      .from("city_content")
      .upsert({
        city,
        state,
        content: {
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
        },
        meta_title: `${COMPANY_NAME} IT Services & AI Automation in ${city}, ${state}`,
        meta_description: `Enhance your ${city} business operations with ${COMPANY_NAME}'s IT services and AI automation solutions. Expert local support, 24/7 service, and innovative technology solutions.`
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      throw error;
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
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 400,
      }
    );
  }
});