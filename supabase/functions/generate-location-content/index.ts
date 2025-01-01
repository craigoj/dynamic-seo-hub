import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { city, state } = await req.json();
    console.log(`Generating content for ${city}, ${state}`);

    if (!city || !state) {
      throw new Error('City and state are required');
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Generate content using OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://ctrl.tech',
        'X-Title': 'CTRL Tech Location Content Generator',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a professional content writer for an IT services company. Create engaging, SEO-optimized content for location pages.'
          },
          {
            role: 'user',
            content: `Create detailed content for our ${city}, ${state} location page including:
              1. A local introduction
              2. Key services offered
              3. Local business challenges
              4. Why choose us section
              Format with proper HTML structure.`
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

    // Store in database
    const { data, error } = await supabase
      .from('locations')
      .upsert({
        city,
        state,
        content: generatedContent,
        meta_title: `IT Services in ${city}, ${state} | CTRL Tech`,
        meta_description: `Professional IT services and solutions in ${city}, ${state}. Expert local support, managed services, and technology consulting.`
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});