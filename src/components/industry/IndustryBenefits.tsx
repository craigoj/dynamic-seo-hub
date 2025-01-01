import { Card } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface IndustryBenefitsProps {
  benefits: string[];
}

export const IndustryBenefits = ({ benefits = [] }: IndustryBenefitsProps) => {
  const benefitItems = Array.isArray(benefits) ? benefits : [];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Key Benefits for Your Business</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {benefitItems.length > 0 ? (
          benefitItems.map((benefit, index) => (
            <Card key={index} className="p-6 border-t-4 border-t-green-500">
              <div className="flex flex-col items-center text-center">
                <div className="p-2 bg-green-100 rounded-full mb-4">
                  <Sparkles className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit}</h3>
                <p className="text-gray-600">
                  Experience tangible improvements in your operations with our 
                  tailored solutions.
                </p>
              </div>
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