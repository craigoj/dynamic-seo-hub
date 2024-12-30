import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface ServiceFAQsProps {
  faqs: FAQ[];
}

export const ServiceFAQs = ({ faqs }: ServiceFAQsProps) => {
  if (!faqs?.length) return null;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="my-16"
    >
      <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq: FAQ, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            <AccordionItem value={`item-${index}`} className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.section>
  );
};