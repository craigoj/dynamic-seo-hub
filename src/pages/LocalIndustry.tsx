import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { PageBreadcrumbs } from "@/components/navigation/PageBreadcrumbs";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { ServiceGrid } from "@/components/ServiceGrid";

interface IndustryContent {
  content: string;
  meta_title: string;
  meta_description: string;
  schema_markup?: any;
}

export default function LocalIndustry() {
  const { industry, city, state } = useParams();
  const [content, setContent] = useState<IndustryContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [forceRegenerate, setForceRegenerate] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: adminProfile } = await supabase
          .from('admin_profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .single();
        
        setIsAdmin(adminProfile?.is_admin || false);
      }
    };

    checkAdminStatus();
  }, []);

  useEffect(() => {
    const fetchOrGenerateContent = async () => {
      try {
        setLoading(true);
        console.log(`Fetching industry content for ${industry} in ${city}, ${state}`);

        // Skip cache if forceRegenerate is true
        if (!forceRegenerate) {
          const { data: existingContent, error: fetchError } = await supabase
            .from("location_service_content")
            .select("*")
            .eq("service", industry)
            .eq("city", city)
            .eq("state", state)
            .maybeSingle();

          if (fetchError) throw fetchError;

          if (existingContent) {
            console.log('Found existing content:', existingContent);
            setContent(existingContent);
            setLoading(false);
            return;
          }
        }

        console.log('No existing content found, generating new content...');
        const { data: generatedData, error: generateError } = await supabase.functions.invoke(
          'generate-location-industry-content',
          {
            body: { industry, city, state },
          }
        );

        if (generateError) throw generateError;
        
        console.log('Content generated successfully:', generatedData);
        setContent(generatedData);

      } catch (error) {
        console.error("Error fetching/generating content:", error);
        toast({
          title: "Error",
          description: "Failed to load content. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (industry && city && state) {
      fetchOrGenerateContent();
    }
  }, [industry, city, state, forceRegenerate]);

  const breadcrumbItems = [
    { label: "Industries", href: "/industries" },
    { label: industry || "", href: `/industries/${industry}` },
    { label: state || "", href: `/locations/${state}` },
    { label: city || "" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl font-bold mb-4">Content Not Found</h1>
              <p className="text-gray-600">
                The requested content for {industry} in {city}, {state} could not be found.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <Header />
      <main className="flex-grow">
        <title>{content.meta_title}</title>
        <meta name="description" content={content.meta_description} />

        <div className="container mx-auto px-4 py-12">
          <PageBreadcrumbs items={breadcrumbItems} />
          
          {isAdmin && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-end mb-6"
            >
              <Button 
                onClick={() => setForceRegenerate(true)}
                variant="outline"
                className="flex items-center gap-2 hover:shadow-md transition-shadow"
              >
                <RefreshCw className="h-4 w-4" />
                Regenerate Content
              </Button>
            </motion.div>
          )}

          <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
            <div dangerouslySetInnerHTML={{ __html: content.content }} />
          </div>

          <ServiceGrid industry={industry} city={city} />
        </div>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}