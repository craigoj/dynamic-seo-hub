import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ContactSection } from "@/components/ContactSection";
import { useToast } from "@/components/ui/use-toast";

export default function Service() {
  const { service } = useParams();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrGenerateContent = async () => {
      try {
        // First, try to fetch existing content
        const { data: existingContent, error: fetchError } = await supabase
          .from("service_page_cache")
          .select("*")
          .eq("service", service)
          .maybeSingle();

        if (fetchError) throw fetchError;

        if (existingContent) {
          setContent(existingContent);
          setLoading(false);
          return;
        }

        // If no content exists, generate new content
        const { data: generatedContent, error: generateError } = await supabase.functions
          .invoke("generate-service-content", {
            body: { service, city: "Your City" }, // You can make this dynamic based on user location
          });

        if (generateError) throw generateError;

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
  }, [service]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!content) {
    return <div className="container mx-auto px-4 py-8">Service not found</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Meta tags */}
      <title>{content.meta_title}</title>
      <meta name="description" content={content.meta_description} />

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div dangerouslySetInnerHTML={{ __html: content.content }} />

          {/* Features Section */}
          {content.features && (
            <section className="my-12">
              <h2 className="text-2xl font-bold mb-6">Key Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Benefits Section */}
          {content.benefits && (
            <section className="my-12">
              <h2 className="text-2xl font-bold mb-6">Benefits</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* FAQs Section */}
          {content.faqs && (
            <section className="my-12">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {content.faqs.map((faq: { question: string; answer: string }, index: number) => (
                  <div key={index} className="border-b pb-4">
                    <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}