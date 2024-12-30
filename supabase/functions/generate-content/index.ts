import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const generatePrompt = (service: string, city?: string, industry?: string) => {
  const locationText = city ? ` in ${city}` : '';
  const industryText = industry ? ` for ${industry}` : '';
  
  return `Generate an SEO-optimized service page for CTRL Tech's ${service} services${industryText}${locationText}.

The content should follow this exact structure:

1. Meta Information:
- Title should be compelling and include "${service} Services${locationText}"
- Description should be informative and include key benefits

2. Main Content:
- Start with a compelling introduction about ${service}
- Include specific challenges and solutions related to ${industry || 'businesses'}
- Highlight CTRL Tech's expertise in ${service}

3. Key Features (5-6 items):
- List specific ${service} features
- Focus on technical capabilities
- Include monitoring, protection, and support aspects

4. Benefits (5-6 items):
- Business advantages
- Risk mitigation
- Compliance and security improvements

5. FAQs (4-5 questions):
- Common questions about ${service}
- Include pricing, implementation, and support
- Address industry-specific concerns${industry ? ` for ${industry}` : ''}

The response should be in JSON format with these keys:
- metaTitle (string)
- metaDescription (string)
- content (HTML formatted string)
- features (array of strings)
- benefits (array of strings)
- faqs (array of objects with question and answer keys)

Make the content highly professional, SEO-optimized, and focused on ${service} services${industryText}${locationText}.`
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt, type, service, city, industry } = await req.json()

    const finalPrompt = type === 'custom' ? prompt : generatePrompt(service, city, industry)

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
          { 
            role: 'system', 
            content: 'You are an expert in creating SEO-optimized service pages. Generate content that is engaging, relevant, and optimized for search engines. Use proper HTML formatting with semantic tags.'
          },
          { role: 'user', content: finalPrompt }
        ],
      }),
    })

    const data = await response.json()
    console.log('OpenRouter API response:', data)

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to generate content')
    }

    let generatedContent
    try {
      generatedContent = JSON.parse(data.choices[0].message.content)
    } catch (error) {
      console.error('Error parsing generated content:', error)
      generatedContent = {
        content: data.choices[0].message.content,
        metaTitle: '',
        metaDescription: '',
        features: [],
        benefits: [],
        faqs: []
      }
    }

    return new Response(JSON.stringify({ generatedText: generatedContent }), {
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