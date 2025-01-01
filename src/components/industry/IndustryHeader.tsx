import { Card } from "@/components/ui/card"

interface IndustryHeaderProps {
  name: string;
  description: string;
}

export const IndustryHeader = ({ name, description }: IndustryHeaderProps) => {
  return (
    <Card className="mb-8 p-8">
      <h1 className="text-4xl font-bold mb-4">{name}</h1>
      <p className="text-lg text-gray-600">{description}</p>
    </Card>
  );
};