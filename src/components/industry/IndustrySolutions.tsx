import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

interface IndustrySolutionsProps {
  solutions: string[];
  industryName: string;
}

export const IndustrySolutions = ({ solutions = [], industryName }: IndustrySolutionsProps) => {
  const solutionItems = Array.isArray(solutions) ? solutions : [];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6">CTRL Tech Solutions for {industryName}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {solutionItems.length > 0 ? (
          solutionItems.map((solution, index) => (
            <Card key={index} className="p-6 border-l-4 border-l-blue-500">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{solution}</h3>
                  <p className="text-gray-600">
                    Implement cutting-edge technology solutions designed specifically 
                    for {industryName.toLowerCase()} businesses to drive efficiency and growth.
                  </p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-6 col-span-2">
            <p className="text-gray-600">
              Solutions are currently being generated for {industryName}. Please check back soon.
            </p>
          </Card>
        )}
      </div>
    </section>
  );
};