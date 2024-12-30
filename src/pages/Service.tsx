import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { ServiceSkeleton } from "@/components/service/ServiceSkeleton";
import { ServiceContent } from "@/components/service/ServiceContent";
import { useServiceContent } from "@/hooks/useServiceContent";
import { injectSchemaMarkup } from "@/utils/schemaMarkup";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function Service() {
  const { service, city, industry } = useParams();
  const [forceRegenerate, setForceRegenerate] = useState(false);
  const { content, loading } = useServiceContent(service, city, industry, forceRegenerate);

  useEffect(() => {
    if (content?.meta_description && service) {
      return injectSchemaMarkup(service, city, content.meta_description, content.faqs);
    }
  }, [content, service, city]);

  const handleRegenerateContent = () => {
    setForceRegenerate(true);
  };

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
        <title>{content.meta_title}</title>
        <meta name="description" content={content.meta_description} />

        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-end mb-4">
            <Button 
              onClick={handleRegenerateContent}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Regenerate Content
            </Button>
          </div>
          
          <ServiceContent 
            service={service}
            city={city}
            industry={industry}
            content={content}
          />
        </div>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}