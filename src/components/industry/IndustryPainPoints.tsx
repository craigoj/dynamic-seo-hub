import { Card } from "@/components/ui/card"

interface IndustryPainPointsProps {
  painPoints: string[];
}

export const IndustryPainPoints = ({ painPoints = [] }: IndustryPainPointsProps) => {
  // Ensure painPoints is an array and has items
  const painPointItems = Array.isArray(painPoints) ? painPoints : [];

  return (
    <section className="mb-8">
      <h2 className="text-3xl font-bold mb-6">Common Challenges</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {painPointItems.length > 0 ? (
          painPointItems.map((point, index) => (
            <Card key={index} className="p-6">
              <h3 className="text-xl font-semibold mb-3">{point}</h3>
              <p className="text-gray-600">
                We understand the complexity of {point.toLowerCase()} and provide solutions to address this challenge effectively.
              </p>
            </Card>
          ))
        ) : (
          <Card className="p-6 col-span-2">
            <p className="text-gray-600">
              Challenges are currently being analyzed. Please check back soon.
            </p>
          </Card>
        )}
      </div>
    </section>
  );
};