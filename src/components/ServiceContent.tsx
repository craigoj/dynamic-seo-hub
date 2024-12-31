import { ServiceFeatures } from "./service/ServiceFeatures";
import { ServiceBenefits } from "./service/ServiceBenefits";
import { ServiceFAQs } from "./service/ServiceFAQs";
import { motion } from "framer-motion";
import { Shield, Building2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ServiceContentProps {
  service?: string;
  city?: string;
  industry?: string;
  content: {
    content: string;
    features?: string[];
    benefits?: string[];
    faqs?: Array<{ question: string; answer: string }>;
  };
}

export const ServiceContent = ({ service, city, industry, content }: ServiceContentProps) => {
  const pageTitle = city 
    ? `Expert ${service} Services in ${city}${industry ? ` for ${industry}` : ''}`
    : `Expert ${service} Services${industry ? ` for ${industry}` : ''}`;

  const locations = {
    Ohio: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton"],
    Virginia: ["Richmond", "Virginia Beach", "Norfolk", "Chesapeake", "Arlington", "Alexandria"]
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="max-w-4xl mx-auto"
    >
      <header className="mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
        >
          {pageTitle}
        </motion.h1>

        <div className="flex flex-wrap gap-4 text-muted-foreground">
          {service && (
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>{service}</span>
            </div>
          )}
          {city && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{city}</span>
            </div>
          )}
          {industry && (
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>{industry}</span>
            </div>
          )}
        </div>
      </header>
      
      <main>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="prose prose-lg max-w-none dark:prose-invert mb-12"
          dangerouslySetInnerHTML={{ __html: content.content }} 
        />

        {!city && (
          <section className="my-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Find {service} Services Near You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(locations).map(([state, cities]) => (
                <div key={state}>
                  <h3 className="text-xl font-semibold mb-4">{state}</h3>
                  <ul className="space-y-2">
                    {cities.map((locationCity) => (
                      <li key={locationCity}>
                        <Link
                          to={`/services/${service?.toLowerCase().replace(/\s+/g, '-')}/${state}/${locationCity}`}
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                        >
                          <MapPin className="h-4 w-4" />
                          {service} in {locationCity}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {content.features && content.features.length > 0 && (
          <ServiceFeatures features={content.features} />
        )}

        {content.benefits && content.benefits.length > 0 && (
          <ServiceBenefits benefits={content.benefits} />
        )}

        {content.faqs && content.faqs.length > 0 && (
          <ServiceFAQs faqs={content.faqs} />
        )}

        <section className="mt-16 bg-blue-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">
            Get Started with {service} Services{city ? ` in ${city}` : ''}
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Ready to enhance your business with professional {service} services
            {city ? ` in ${city}` : ''}? Contact us now for a free consultation and 
            discover how we can help protect and grow your business.
          </p>
          <Button 
            size="lg"
            onClick={() => {
              const formSection = document.getElementById("contact-form");
              formSection?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Schedule Your Free Consultation
          </Button>
        </section>

        {/* Area Served Section */}
        <section className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6">Areas We Serve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(locations).map(([state, cities]) => (
              <div key={state} className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  {state}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {cities.map((locationCity) => (
                    <Link
                      key={locationCity}
                      to={`/locations/${state}/${locationCity}`}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {locationCity}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-gray-600">
            Don't see your area listed? Contact us to check if we serve your location!
          </p>
        </section>
      </main>
    </motion.div>
  );
};