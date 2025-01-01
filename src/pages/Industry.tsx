import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LeadForm } from "@/components/LeadForm";
import { LocationLinks } from "@/components/LocationLinks";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { IndustryHeader } from "@/components/industry/IndustryHeader";
import { IndustryPainPoints } from "@/components/industry/IndustryPainPoints";
import { IndustrySolutions } from "@/components/industry/IndustrySolutions";
import { IndustryBenefits } from "@/components/industry/IndustryBenefits";
import { IndustryCTA } from "@/components/industry/IndustryCTA";

interface Industry {
  name: string;
  description: string;
  meta_title: string;
  meta_description: string;
  content?: string | null;
  schema_markup: any;
}

// Map short URLs to full industry slugs
const industrySlugMap: Record<string, string> = {
  'retail': 'retail-and-ecommerce',
  'healthcare': 'healthcare-and-wellness',
  'trades': 'trades-and-home-services',
  'technology': 'technology-and-startups',
  'education': 'education-and-non-profits',
  'hospitality': 'hospitality-and-travel',
  'manufacturing': 'manufacturing-and-logistics',
  'local-government': 'local-governments',
  'legal': 'professional-services',
  'professional-services': 'professional-services',
  'finance': 'finance-and-banking'
};

const Industry = () => {
  const { slug } = useParams();
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchIndustry = async () => {
      try {
        setLoading(true);
        
        // Map the URL slug to the full industry slug if needed
        const fullSlug = industrySlugMap[slug as string] || slug;
        console.log('Fetching industry with slug:', fullSlug);
        
        // First try to fetch existing content
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
          setIndustry(generatedData);
        } else {
          console.log('Found existing content:', existingData);
          const industryData: Industry = {
            name: existingData.name,
            description: existingData.description,
            meta_title: existingData.meta_title,
            meta_description: existingData.meta_description,
            content: existingData.content,
            schema_markup: existingData.schema_markup
          };
          setIndustry(industryData);
        }

        // Update meta tags and schema
        if (existingData || industry) {
          const content = existingData || industry;
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

    if (slug) {
      fetchIndustry();
    }
  }, [slug]);

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

  if (!industry) {
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
  const parsedContent = industry.content ? JSON.parse(industry.content) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <IndustryHeader 
            name={industry.name} 
            description={industry.description} 
          />
          
          {parsedContent && (
            <>
              <IndustryPainPoints painPoints={parsedContent.painPoints} />
              <IndustrySolutions 
                solutions={parsedContent.solutions} 
                industryName={industry.name}
              />
              <IndustryBenefits benefits={parsedContent.benefits} />
              <IndustryCTA industryName={industry.name} />
            </>
          )}
          
          <section className="my-12">
            <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
            <LeadForm />
          </section>
        </div>
        <LocationLinks />
      </main>
      <Footer />
    </div>
  );
};

export default Industry;