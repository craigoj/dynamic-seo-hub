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
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq: FAQ, index: number) => (
          <div key={index} className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};