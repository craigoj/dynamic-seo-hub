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

The content should follow this exact structure and formatting:

1. Meta Information:
- Title: "Expert ${service} Services by CTRL Tech${locationText}: Empower Your Business Today!"
- Description: A compelling description highlighting the benefits and value proposition

2. Main Content:
The content must be properly formatted with semantic HTML tags. Here's the exact structure to follow:

<div class="prose max-w-none">
  <h1>Expert ${service} Services by CTRL Tech${locationText}</h1>
  
  <div class="introduction">
    <p>[Compelling introduction about the importance of ${service}]</p>
  </div>

  <h2>Key Features of Our ${service} Services</h2>
  <ul>
    <li>[Feature 1]</li>
    <li>[Feature 2]</li>
    <li>[Feature 3]</li>
    <li>[Feature 4]</li>
    <li>[Feature 5]</li>
  </ul>

  <h2>Benefits of Choosing CTRL Tech</h2>
  <ul>
    <li>[Benefit 1]</li>
    <li>[Benefit 2]</li>
    <li>[Benefit 3]</li>
    <li>[Benefit 4]</li>
    <li>[Benefit 5]</li>
  </ul>

  <h2>Frequently Asked Questions</h2>
  <div class="faqs">
    [Series of questions and answers about ${service}]
  </div>

  <h2>Transform Your Business with CTRL Tech's ${service} Solutions</h2>
  <div class="cta">
    <p>[Compelling call to action]</p>
    <a href="/contact" class="cta-button">Schedule a Free Consultation</a>
  </div>
</div>

The response must be in JSON format with these exact keys:
- metaTitle (string)
- metaDescription (string)
- content (HTML formatted string using semantic tags as shown above)
- features (array of 5-6 strings)
- benefits (array of 5-6 strings)
- faqs (array of objects with question and answer keys)

Make the content highly professional, SEO-optimized, and focused on ${service} services${industryText}${locationText}.
Ensure all HTML tags are properly nested and formatted.`
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt, type, service, city, industry } = await req.json()

    const finalPrompt = type === 'custom' ? prompt : generatePrompt(service, city, industry)

    console.log('Generating content with prompt:', finalPrompt)

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
            content: 'You are an expert in creating SEO-optimized service pages. Generate content that is engaging, relevant, and optimized for search engines. Always use proper semantic HTML tags and maintain a consistent structure.' 
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