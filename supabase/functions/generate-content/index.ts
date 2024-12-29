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
    const { prompt, type } = await req.json()

    // Define system messages based on content type
    const systemMessages = {
      'meta-description': 'You are an SEO expert that writes compelling meta descriptions that are under 160 characters.',
      'meta-title': 'You are an SEO expert that writes compelling meta titles that are under 60 characters.',
      'description': 'You are a professional copywriter that writes compelling service descriptions.',
      'schema': 'You are an SEO expert that creates schema markup for local business services.',
    }

    const systemMessage = systemMessages[type] || systemMessages['description']

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
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
      }),
    })

    const data = await response.json()
    console.log('OpenRouter API response:', data)

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to generate content')
    }

    const generatedText = data.choices[0].message.content

    return new Response(JSON.stringify({ generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in generate-content function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})