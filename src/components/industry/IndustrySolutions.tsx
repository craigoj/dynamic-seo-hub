import { Card } from "@/components/ui/card"

interface IndustrySolutionsProps {
  solutions: string[];
  industryName: string;
}

export const IndustrySolutions = ({ solutions = [], industryName }: IndustrySolutionsProps) => {
  // Ensure solutions is an array and has items
  const solutionItems = Array.isArray(solutions) ? solutions : [];

  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold mb-6">Our {industryName} Solutions</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {solutionItems.length > 0 ? (
          solutionItems.map((solution, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-xl font-semibold mb-3">{solution}</h3>
              <p className="text-gray-600">
                Implement cutting-edge technology solutions designed specifically for {industryName.toLowerCase()} businesses.
              </p>
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