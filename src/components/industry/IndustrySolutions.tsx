import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

interface IndustrySolutionsProps {
  solutions: string[];
  industryName: string;
}

export const IndustrySolutions = ({ solutions = [], industryName }: IndustrySolutionsProps) => {
  const solutionItems = Array.isArray(solutions) ? solutions : [];

  return (
    <section className="mb-8 md:mb-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">CTRL Tech Solutions for {industryName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {solutionItems.length > 0 ? (
          solutionItems.map((solution, index) => (
            <Card key={index} className="p-4 md:p-6 border-l-4 border-l-blue-500">
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{solution}</h3>
                  <p className="text-sm md:text-base text-gray-600">
                    Implement cutting-edge technology solutions designed specifically 
                    for {industryName.toLowerCase()} businesses to drive efficiency and growth.
                  </p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-4 md:p-6 col-span-full">
            <p className="text-gray-600">
              Solutions are currently being generated for {industryName}. Please check back soon.
            </p>
          </Card>
        )}
      </div>
    </section>
  );
};