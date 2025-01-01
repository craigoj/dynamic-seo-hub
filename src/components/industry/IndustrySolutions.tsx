import { Card } from "@/components/ui/card"

interface IndustrySolutionsProps {
  solutions: string[];
  industryName: string;
}

export const IndustrySolutions = ({ solutions, industryName }: IndustrySolutionsProps) => {
  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold mb-6">Our {industryName} Solutions</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {solutions.map((solution, index) => (
          <Card key={index} className="p-6">
            <h3 className="text-xl font-semibold mb-3">{solution}</h3>
            <p className="text-gray-600">
              Implement cutting-edge technology solutions designed specifically for {industryName.toLowerCase()} businesses.
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};