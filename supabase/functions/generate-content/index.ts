import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { ContentParams, ServiceContent } from "../_shared/contentTypes.ts";
import {
  generateMetaTags,
  generateServiceContent,
  generateFeatures,
  generateBenefits,
  generateFAQs
} from "../_shared/seoHelpers.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const params: ContentParams = await req.json();
    const { type = 'custom', service, city, industry, prompt } = params;

    if (type === 'service' && service) {
      console.log(`Generating service content for ${service}${city ? ` in ${city}` : ''}${industry ? ` for ${industry}` : ''}`);
      
      const metaTags = generateMetaTags(service, city, industry);
      const content: ServiceContent = {
        metaTitle: metaTags.title,
        metaDescription: metaTags.description,
        content: generateServiceContent(service, city, industry),
        features: generateFeatures(service),
        benefits: generateBenefits(),
        faqs: generateFAQs(service, city, industry)
      };

      return new Response(
        JSON.stringify({ generatedText: content }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!prompt?.trim()) {
      throw new Error('Prompt is required for custom content generation');
    }

    console.log('Generating custom content with prompt:', prompt);
    return new Response(
      JSON.stringify({ generatedText: { content: prompt } }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-content function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});