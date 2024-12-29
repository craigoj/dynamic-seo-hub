interface ServiceBenefitsProps {
  benefits: string[];
}

export const ServiceBenefits = ({ benefits }: ServiceBenefitsProps) => {
  if (!benefits?.length) return null;

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6">Benefits</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits.map((benefit: string, index: number) => (
          <li key={index} className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            {benefit}
          </li>
        ))}
      </ul>
    </section>
  );
};