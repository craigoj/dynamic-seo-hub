import { ServiceFeatures } from "./ServiceFeatures";
import { ServiceBenefits } from "./ServiceBenefits";
import { ServiceFAQs } from "./ServiceFAQs";

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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        {city 
          ? `${service} Services in ${city}`
          : `${service} Services`
        }
        {industry && ` for ${industry}`}
      </h1>
      
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content.content }} 
      />

      <ServiceFeatures features={content.features || []} />
      <ServiceBenefits benefits={content.benefits || []} />
      <ServiceFAQs faqs={content.faqs || []} />
    </div>
  );
};