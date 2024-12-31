import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, Briefcase, RefreshCw } from "lucide-react";
import { ContentGenerator } from "@/components/ContentGenerator";
import { ServiceContent } from "@/components/service/ServiceContent";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Service {
  name: string;
  slug: string;
  description: string;
}

interface Industry {
  name: string;
  slug: string;
  description: string;
}

interface LocationContentProps {
  city: string;
  state: string;
  content: {
    main: string;
    services: Service[];
    industries: Industry[];
  };
}

export const LocationContent = ({ city, state, content }: LocationContentProps) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [serviceContent, setServiceContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Clean the HTML content by removing any HTML comments
  const cleanContent = content.main.replace(/<!--[\s\S]*?-->/g, '');

  // Check if user is admin
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

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const handleServiceSelect = async (service: Service) => {
    setSelectedService(service.name);
    setIsLoading(true);

    try {
      // First try to get existing content
      const { data: existingContent } = await supabase
        .from('location_service_content')
        .select('*')
        .eq('service', service.name)
        .eq('city', city)
        .eq('state', state)
        .maybeSingle();

      if (existingContent) {
        setServiceContent(existingContent);
      } else {
        // Generate new content
        const { data: generatedContent, error } = await supabase.functions.invoke(
          'generate-location-service-content',
          {
            body: { service: service.name, city, state }
          }
        );

        if (error) throw error;
        setServiceContent(generatedContent);
      }
    } catch (error) {
      console.error('Error fetching/generating service content:', error);
      toast({
        title: "Error",
        description: "Failed to load service content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateContent = async () => {
    if (!selectedService) return;

    setIsLoading(true);
    try {
      const { data: generatedContent, error } = await supabase.functions.invoke(
        'generate-location-service-content',
        {
          body: { 
            service: selectedService, 
            city, 
            state,
            forceRegenerate: true 
          }
        }
      );

      if (error) throw error;
      setServiceContent(generatedContent);
      toast({
        title: "Success",
        description: "Content regenerated successfully",
      });
    } catch (error) {
      console.error('Error regenerating content:', error);
      toast({
        title: "Error",
        description: "Failed to regenerate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Main Content */}
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: cleanContent }} />
      
      {/* Services Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-blue-600" />
          Services in {city}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.services.map((service) => (
            <Card 
              key={service.slug} 
              className={`hover:shadow-lg transition-shadow cursor-pointer ${
                selectedService === service.name ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleServiceSelect(service)}
            >
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Selected Service Content */}
      {selectedService && (
        <section className="mt-8">
          {isLoading ? (
            <div className="flex items-center justify-center p-12">
              <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <>
              {isAdmin && (
                <div className="flex justify-end mb-4">
                  <Button
                    onClick={handleRegenerateContent}
                    variant="outline"
                    className="flex items-center gap-2"
                    disabled={isLoading}
                  >
                    <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    Regenerate Content
                  </Button>
                </div>
              )}
              {serviceContent && (
                <ServiceContent
                  service={selectedService}
                  city={city}
                  content={serviceContent}
                />
              )}
            </>
          )}
        </section>
      )}

      {/* Industries Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Building2 className="h-6 w-6 text-blue-600" />
          Industries We Serve in {city}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.industries.map((industry) => (
            <Card key={industry.slug} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">{industry.name}</h3>
                <p className="text-gray-600 mb-4">{industry.description}</p>
                <Link 
                  to={`/industries/${industry.slug}`} 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Learn More →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Transform Your Business in {city}?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Get started with a free consultation and discover how our IT solutions can help your business thrive.
        </p>
        <Button 
          size="lg"
          onClick={() => {
            const formSection = document.getElementById("contact-form");
            formSection?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Get Your Free Assessment
        </Button>
      </section>
    </div>
  );
};