import { Card } from "@/components/ui/card"

interface IndustryBenefitsProps {
  benefits: string[];
}

export const IndustryBenefits = ({ benefits = [] }: IndustryBenefitsProps) => {
  // Ensure benefits is an array and has items
  const benefitItems = Array.isArray(benefits) ? benefits : [];

  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold mb-6">Key Benefits</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {benefitItems.length > 0 ? (
          benefitItems.map((benefit, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-xl font-semibold mb-3">{benefit}</h3>
              <p className="text-gray-600">
                Experience tangible improvements in your operations with our tailored solutions.
              </p>
            </Card>
          ))
        ) : (
          <Card className="p-6 col-span-3">
            <p className="text-gray-600">
              Benefits are currently being generated. Please check back soon.
            </p>
          </Card>
        )}
      </div>
    </section>
  );
};