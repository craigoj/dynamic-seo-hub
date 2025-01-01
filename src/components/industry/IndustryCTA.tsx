import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface IndustryCTAProps {
  industryName: string;
}

export const IndustryCTA = ({ industryName }: IndustryCTAProps) => {
  return (
    <Card className="bg-blue-600 text-white p-8 rounded-lg text-center mt-12">
      <h2 className="text-3xl font-bold mb-4">Transform Your {industryName} Business Today</h2>
      <p className="text-xl mb-6">
        Ready to overcome your IT challenges and leverage AI automation for growth? 
        Contact CTRL Tech for a personalized consultation.
      </p>
      <Button 
        variant="secondary" 
        size="lg"
        className="bg-white text-blue-600 hover:bg-blue-50"
      >
        Schedule a Consultation
      </Button>
    </Card>
  );
};