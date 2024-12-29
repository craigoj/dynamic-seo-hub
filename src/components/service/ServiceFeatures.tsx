interface ServiceFeaturesProps {
  features: string[];
}

export const ServiceFeatures = ({ features }: ServiceFeaturesProps) => {
  if (!features?.length) return null;
  
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6">Key Features</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature: string, index: number) => (
          <li key={index} className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full" />
            {feature}
          </li>
        ))}
      </ul>
    </section>
  );
};