import { Card } from "@/components/ui/card"
import { Heart } from "lucide-react"

interface IndustryHeaderProps {
  name: string;
  description: string;
}

export const IndustryHeader = ({ name, description }: IndustryHeaderProps) => {
  return (
    <div className="mb-8 md:mb-12">
      <Card className="p-4 md:p-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
          <Heart className="h-6 w-6 md:h-8 md:w-8 flex-shrink-0" />
          <h1 className="text-2xl md:text-4xl font-bold">{name}: Tailored IT & AI Solutions</h1>
        </div>
        <p className="text-base md:text-xl leading-relaxed">
          {description}
        </p>
      </Card>
      <div className="mt-6 md:mt-8 text-base md:text-lg text-gray-600">
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