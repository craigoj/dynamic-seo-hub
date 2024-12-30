import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ServiceContent {
  meta_title: string;
  meta_description: string;
  content: string;
  features?: string[];
  benefits?: string[];
  faqs?: Array<{ question: string; answer: string }>;
  schema_markup?: any;
}

export const useServiceContent = (service?: string, city?: string, industry?: string) => {
  const [content, setContent] = useState<ServiceContent | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrGenerateContent = async () => {
      try {
        setLoading(true);
        
        const cacheKey = `service_${service}_${city || 'general'}_${industry || 'general'}`;
        const cachedData = localStorage.getItem(cacheKey);
        
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          // Cache for 24 hours
          if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
            setContent(data);
            setLoading(false);
            return;
          }
        }
        
        // Check database cache
        const { data: existingContent, error: fetchError } = await supabase
          .from("service_page_cache")
          .select("*")
          .eq("service", service)
          .eq("city", city || "general")
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (existingContent) {
          const formattedContent: ServiceContent = {
            meta_title: existingContent.meta_title,
            meta_description: existingContent.meta_description,
            content: existingContent.content,
            features: Array.isArray(existingContent.features) 
              ? (existingContent.features as string[]) 
              : [],
            benefits: Array.isArray(existingContent.benefits) 
              ? (existingContent.benefits as string[]) 
              : [],
            faqs: Array.isArray(existingContent.faqs) 
              ? (existingContent.faqs as Array<{ question: string; answer: string }>) 
              : [],
            schema_markup: existingContent.schema_markup
          };

          localStorage.setItem(cacheKey, JSON.stringify({
            data: formattedContent,
            timestamp: Date.now()
          }));
          
          setContent(formattedContent);
          setLoading(false);
          return;
        }

        // Generate new content
        const { data: generatedData, error: generateError } = await supabase.functions.invoke('generate-content', {
          body: { 
            type: 'service',
            service,
            city,
            industry
          },
        });

        if (generateError) throw generateError;

        const generatedContent = generatedData.generatedText;

        // Store in database cache
        const { error: insertError } = await supabase
          .from("service_page_cache")
          .insert({
            service: service,
            city: city || "general",
            content: generatedContent.content,
            meta_title: generatedContent.metaTitle,
            meta_description: generatedContent.metaDescription,
            features: (generatedContent.features || []) as string[],
            benefits: (generatedContent.benefits || []) as string[],
            faqs: (generatedContent.faqs || []) as Array<{ question: string; answer: string }>
          });

        if (insertError) throw insertError;

        // Store in local cache
        localStorage.setItem(cacheKey, JSON.stringify({
          data: generatedContent,
          timestamp: Date.now()
        }));
        
        setContent(generatedContent);
      } catch (error) {
        console.error("Error fetching/generating content:", error);
        toast({
          title: "Error",
          description: "Failed to load service content. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (service) {
      fetchOrGenerateContent();
    }
  }, [service, city, industry]);

  return { content, loading };
};