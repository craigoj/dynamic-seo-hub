import { Card } from "@/components/ui/card"

interface IndustryBenefitsProps {
  benefits: string[];
}

export const IndustryBenefits = ({ benefits }: IndustryBenefitsProps) => {
  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold mb-6">Key Benefits</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <Card key={index} className="p-6">
            <h3 className="text-xl font-semibold mb-3">{benefit}</h3>
            <p className="text-gray-600">
              Experience tangible improvements in your operations with our tailored solutions.
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};