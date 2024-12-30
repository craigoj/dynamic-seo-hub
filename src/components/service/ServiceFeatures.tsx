import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface ServiceFeaturesProps {
  features: string[];
}

export const ServiceFeatures = ({ features }: ServiceFeaturesProps) => {
  if (!features?.length) return null;
  
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="my-16"
    >
      <h2 className="text-3xl font-bold mb-8">Key Features</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature: string, index: number) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="flex items-start gap-3 p-4 rounded-lg bg-card hover:shadow-md transition-shadow"
          >
            <CheckCircle2 className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-lg">{feature}</span>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
};