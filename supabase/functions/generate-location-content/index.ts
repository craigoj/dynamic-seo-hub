import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY')

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

    const prompt = `Generate detailed content for an IT services company's location page in ${city}, ${state}. Include:
    1. A compelling introduction about IT services in ${city}
    2. Key services offered (cybersecurity, cloud solutions, managed IT)
    3. Why choose our company in ${city}
    4. Local business context and relevance
    Format in HTML with proper h2, h3, p, and ul/li tags.`

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

    return new Response(
      JSON.stringify({ content: generatedContent }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in generate-location-content function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})