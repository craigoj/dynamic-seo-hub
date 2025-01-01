import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { LocationLinks } from "@/components/LocationLinks";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { IndustryHeader } from "@/components/industry/IndustryHeader";
import { IndustryPainPoints } from "@/components/industry/IndustryPainPoints";
import { IndustrySolutions } from "@/components/industry/IndustrySolutions";
import { IndustryBenefits } from "@/components/industry/IndustryBenefits";
import { IndustryCTA } from "@/components/industry/IndustryCTA";
import { ServiceGrid } from "@/components/ServiceGrid";

interface Industry {
  name: string;
  description: string;
  meta_title: string;
  meta_description: string;
  content?: string | null;
  schema_markup: any;
}

const Industry = () => {
  const { industry } = useParams();
  const [industryData, setIndustryData] = useState<Industry | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchIndustry = async () => {
      try {
        setLoading(true);
        console.log('Fetching industry with slug:', industry);
        
        // Map the URL slug to the full industry slug if needed
        const fullSlug = industry?.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/^manufacturing$/, 'manufacturing-and-logistics')
          .replace(/^retail$/, 'retail-and-ecommerce')
          .replace(/^healthcare$/, 'healthcare-and-wellness')
          .replace(/^trades$/, 'trades-and-home-services')
          .replace(/^technology$/, 'technology-and-startups')
          .replace(/^education$/, 'education-and-non-profits')
          .replace(/^hospitality$/, 'hospitality-and-travel')
          .replace(/^local-government$/, 'local-governments')
          .replace(/^legal$/, 'professional-services')
          .replace(/^finance$/, 'finance-and-banking');
        
        console.log('Normalized slug:', fullSlug);

        const { data: existingData, error: fetchError } = await supabase
          .from("industries")
          .select("*")
          .eq("slug", fullSlug)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (!existingData) {
          console.log('No existing content found, generating new content...');
          // Generate new content if none exists
          const { data: generatedData, error: generateError } = await supabase.functions.invoke(
            'generate-industry-content',
            {
              body: { industry: fullSlug },
            }
          );

          if (generateError) throw generateError;
          
          console.log('Content generated successfully:', generatedData);
          setIndustryData(generatedData);
        } else {
          console.log('Found existing content:', existingData);
          setIndustryData(existingData);
        }

        // Update meta tags and schema
        if (existingData || industryData) {
          const content = existingData || industryData;
          document.title = content.meta_title;
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute("content", content.meta_description);
          }

          if (content.schema_markup) {
            const existingSchema = document.querySelector('script[type="application/ld+json"]');
            if (existingSchema) {
              existingSchema.remove();
            }
            const scriptTag = document.createElement("script");
            scriptTag.type = "application/ld+json";
            scriptTag.text = JSON.stringify(content.schema_markup);
            document.head.appendChild(scriptTag);
          }
        }
      } catch (error) {
        console.error("Error fetching/generating industry content:", error);
        toast({
          title: "Error",
          description: "Failed to load industry content. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (industry) {
      fetchIndustry();
    }
  }, [industry]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <Skeleton className="h-12 w-3/4 mb-6" />
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-6 w-5/6 mb-8" />
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!industryData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">Industry Not Found</h1>
            <p>Sorry, we couldn't find information for this industry.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Parse the content if it's a string
  const parsedContent = industryData.content ? JSON.parse(industryData.content) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <IndustryHeader 
            name={industryData.name} 
            description={industryData.description} 
          />
          
          {parsedContent && (
            <>
              <IndustryPainPoints painPoints={parsedContent.painPoints} />
              <IndustrySolutions 
                solutions={parsedContent.solutions} 
                industryName={industryData.name}
              />
              <IndustryBenefits benefits={parsedContent.benefits} />
              <IndustryCTA industryName={industryData.name} />
            </>
          )}
          
          <section className="my-12">
            <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
            <ServiceGrid industry={industry} />
          </section>
        </div>
        <LocationLinks />
      </main>
      <Footer />
    </div>
  );
};

export default Industry;