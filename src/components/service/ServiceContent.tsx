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
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          {city 
            ? `${service} Services in ${city}`
            : `${service} Services`
          }
          {industry && ` for ${industry}`}
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
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="prose prose-lg max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: content.content }} 
      />

      <ServiceFeatures features={content.features || []} />
      <ServiceBenefits benefits={content.benefits || []} />
      <ServiceFAQs faqs={content.faqs || []} />
    </motion.div>
  );
};