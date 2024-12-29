import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ContactSection } from "@/components/ContactSection";
import { useToast } from "@/hooks/use-toast";
import { Json } from "@/integrations/supabase/types";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceSkeleton } from "@/components/service/ServiceSkeleton";
import { ServiceFeatures } from "@/components/service/ServiceFeatures";
import { ServiceBenefits } from "@/components/service/ServiceBenefits";
import { ServiceFAQs } from "@/components/service/ServiceFAQs";
import { injectSchemaMarkup } from "@/utils/schemaMarkup";

interface FAQ {
  question: string;
  answer: string;
}

interface ServiceContent {
  meta_title: string;
  meta_description: string;
  content: string;
  features?: string[];
  benefits?: string[];
  faqs?: FAQ[];
  schema_markup?: any;
}

interface ServicePageCache {
  benefits: Json;
  city: string;
  content: string;
  created_at: string;
  faqs: Json;
  features: Json;
  id: string;
  meta_description: string;
  meta_title: string;
  schema_markup: Json;
  service: string;
  updated_at: string;
}

export default function Service() {
  const { service, city } = useParams();
  const [content, setContent] = useState<ServiceContent | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrGenerateContent = async () => {
      try {
        setLoading(true);
        
        // First, try to fetch from local storage cache
        const cacheKey = `service_${service}_${city || 'general'}`;
        const cachedData = localStorage.getItem(cacheKey);
        
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          // Check if cache is less than 24 hours old
          if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
            console.log("Using cached data");
            setContent(data);
            setLoading(false);
            return;
          }
        }
        
        // If no valid cache, try to fetch existing content from Supabase
        const { data: existingContent, error: fetchError } = await supabase
          .from("service_page_cache")
          .select("*")
          .eq("service", service)
          .eq("city", city || "general")
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (existingContent) {
          // Convert the Supabase data to ServiceContent format
          const formattedContent: ServiceContent = {
            meta_title: existingContent.meta_title,
            meta_description: existingContent.meta_description,
            content: existingContent.content,
            features: Array.isArray(existingContent.features) ? existingContent.features as string[] : [],
            benefits: Array.isArray(existingContent.benefits) ? existingContent.benefits as string[] : [],
            faqs: Array.isArray(existingContent.faqs) 
              ? (existingContent.faqs as Array<{ question: string; answer: string }>)
              : [],
            schema_markup: existingContent.schema_markup
          };

          // Update local storage cache
          localStorage.setItem(cacheKey, JSON.stringify({
            data: formattedContent,
            timestamp: Date.now()
          }));
          
          setContent(formattedContent);
          setLoading(false);
          return;
        }

        // If no content exists, generate new content
        const { data: generatedContent, error: generateError } = await supabase.functions
          .invoke("generate-service-content", {
            body: { 
              service,
              city: city || "general"
            },
          });

        if (generateError) throw generateError;

        // Cache the generated content
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
  }, [service, city]);

  useEffect(() => {
    if (content?.meta_description && service) {
      return injectSchemaMarkup(service, city, content.meta_description, content.faqs);
    }
  }, [content, service, city]);

  if (loading) {
    return <ServiceSkeleton />;
  }

  if (!content) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
            <p className="text-gray-600">
              {city 
                ? `The requested service content for ${service} in ${city} could not be found.`
                : `The requested service content for ${service} could not be found.`
              }
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Meta tags */}
        <title>{content?.meta_title}</title>
        <meta name="description" content={content?.meta_description} />

        {/* Main content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">
              {city 
                ? `${service} Services in ${city}`
                : `${service} Services`
              }
            </h1>
            
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content?.content }} 
            />

            <ServiceFeatures features={content.features || []} />
            <ServiceBenefits benefits={content.benefits || []} />
            <ServiceFAQs faqs={content.faqs || []} />
          </div>
        </div>

        {/* Contact Section */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}