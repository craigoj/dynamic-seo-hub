import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { city, state } = await req.json()
    console.log(`Generating content for ${city}, ${state}`)

    // Initialize Supabase client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // First check if location already exists
    const { data: existingLocation } = await supabaseAdmin
      .from('locations')
      .select('*')
      .eq('state', state)
      .eq('city', city)
      .maybeSingle()

    if (existingLocation) {
      console.log('Location already exists:', existingLocation)
      return new Response(
        JSON.stringify({ content: existingLocation.content }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const prompt = `Generate detailed content for an IT services company's location page in ${city}, ${state}. Include:
    1. A compelling introduction about IT services in ${city}
    2. Key services offered (cybersecurity, cloud solutions, managed IT)
    3. Why choose our company in ${city}
    4. Local business context and relevance
    Format in HTML with proper h2, h3, p, and ul/li tags.`

    const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY')
    if (!OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key not found')
    }

    console.log('Calling OpenRouter API...')
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://lovable.dev',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          { role: 'system', content: 'You are an expert IT services content writer that creates location-specific content.' },
          { role: 'user', content: prompt }
        ],
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('OpenRouter API error:', error)
      throw new Error('Failed to generate content')
    }

    const data = await response.json()
    console.log('OpenRouter API response received')

    const generatedContent = data.choices[0].message.content

    // Save to database using service role client
    const { data: newLocation, error: insertError } = await supabaseAdmin
      .from('locations')
      .insert([
        {
          state,
          city,
          content: generatedContent,
          meta_title: `IT Services in ${city}, ${state} | Professional IT Support`,
          meta_description: `Professional IT services and solutions in ${city}, ${state}. Expert managed IT support, cybersecurity, and cloud solutions for your business.`,
        }
      ])
      .select()
      .single()

    if (insertError) {
      console.error('Error saving to database:', insertError)
      throw new Error('Failed to save location data')
    }

    console.log('Location saved successfully:', newLocation)

    return new Response(
      JSON.stringify({ content: generatedContent }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in generate-location-content function:', error)
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        details: error
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})