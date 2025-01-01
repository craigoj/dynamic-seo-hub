import { Card } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

interface IndustryPainPointsProps {
  painPoints: string[];
}

export const IndustryPainPoints = ({ painPoints = [] }: IndustryPainPointsProps) => {
  const painPointItems = Array.isArray(painPoints) ? painPoints : [];

  return (
    <section className="mb-8 md:mb-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Common Challenges in Your Industry</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {painPointItems.length > 0 ? (
          painPointItems.map((point, index) => (
            <Card key={index} className="p-4 md:p-6 border-l-4 border-l-orange-500">
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="p-2 bg-orange-100 rounded-full">
                  <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{point}</h3>
                  <p className="text-sm md:text-base text-gray-600">
                    We understand the complexity of {point.toLowerCase()} and provide 
                    proven solutions to address this challenge effectively.
                  </p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-4 md:p-6 col-span-full">
            <p className="text-gray-600">
              Challenges are currently being analyzed. Please check back soon.
            </p>
          </Card>
        )}
      </div>
    </section>
  );
};