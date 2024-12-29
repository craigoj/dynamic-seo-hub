import { LeadForm } from "@/components/LeadForm";

export const ContactSection = () => {
  return (
    <section id="contact-form" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Get Your Free IT Assessment</h2>
          <LeadForm />
        </div>
      </div>
    </section>
  );
};