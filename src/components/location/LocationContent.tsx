import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, Briefcase } from "lucide-react";

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
  // Clean the HTML content by removing any HTML comments
  const cleanContent = content.main.replace(/<!--[\s\S]*?-->/g, '');

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
            <Card key={service.slug} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link 
                  to={`/services/${service.slug}`} 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Learn More →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

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