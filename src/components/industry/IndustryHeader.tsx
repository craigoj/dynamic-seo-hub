import { Card } from "@/components/ui/card"
import { Heart } from "lucide-react"

interface IndustryHeaderProps {
  name: string;
  description: string;
}

export const IndustryHeader = ({ name, description }: IndustryHeaderProps) => {
  return (
    <div className="mb-12">
      <Card className="p-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex items-center gap-4 mb-4">
          <Heart className="h-8 w-8" />
          <h1 className="text-4xl font-bold">{name}: Tailored IT & AI Solutions</h1>
        </div>
        <p className="text-xl leading-relaxed">
          {description}
        </p>
      </Card>
      <div className="mt-8 text-lg text-gray-600">
        <p>
          At CTRL Tech, we specialize in delivering innovative IT services and AI automation solutions 
          tailored to the unique needs of {name.toLowerCase()} businesses. Our deep industry expertise 
          and cutting-edge technology empower organizations to overcome challenges and thrive in 
          today's competitive environment.
        </p>
      </div>
    </div>
  );
};