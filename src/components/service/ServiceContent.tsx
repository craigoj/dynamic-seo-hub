import { ServiceFeatures } from "./ServiceFeatures";
import { ServiceBenefits } from "./ServiceBenefits";
import { ServiceFAQs } from "./ServiceFAQs";
import { motion } from "framer-motion";
import { Shield, Building2, MapPin } from "lucide-react";

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

        {content.features && content.features.length > 0 && (
          <ServiceFeatures features={content.features} />
        )}

        {content.benefits && content.benefits.length > 0 && (
          <ServiceBenefits benefits={content.benefits} />
        )}

        {content.faqs && content.faqs.length > 0 && (
          <ServiceFAQs faqs={content.faqs} />
        )}

        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-4">Protect Your Business with CTRL Tech Today!</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Don't let threats disrupt your operations. With CTRL Tech's comprehensive {service} services
            {city ? ` in ${city}` : ''}, your business will stay secure, compliant, and efficient. 
            Contact us now for a free consultation and take the first step toward a better future.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Schedule a Free Consultation
          </a>
        </section>
      </main>
    </motion.div>
  );
};