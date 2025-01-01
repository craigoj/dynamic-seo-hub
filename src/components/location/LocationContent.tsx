import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, Briefcase } from "lucide-react";
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
  const navigate = useNavigate();
  const { toast } = useToast();

  // Default services if none are provided
  const defaultServices = [
    { 
      name: "Cybersecurity", 
      slug: "cybersecurity", 
      description: "Protect your business with enterprise-grade security solutions" 
    },
    { 
      name: "Cloud Solutions", 
      slug: "cloud-solutions", 
      description: "Seamless cloud migration and management services" 
    },
    { 
      name: "IT Support", 
      slug: "it-support", 
      description: "24/7 technical support and maintenance" 
    }
  ];

  // Extract content from markdown code block if necessary
  const processContent = (rawContent: string) => {
    if (typeof rawContent === 'string' && rawContent.includes('```')) {
      // Extract content between code blocks
      const matches = rawContent.match(/```(?:html)?\n([\s\S]*?)\n```/);
      return matches ? matches[1] : rawContent;
    }
    return rawContent;
  };

  const cleanContent = processContent(content.main);
  const services = content.services || defaultServices;

  const handleServiceSelect = (service: Service) => {
    navigate(`/services/${service.slug}/${state}/${city}`);
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
          {services.map((service) => (
            <Card 
              key={service.slug} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
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