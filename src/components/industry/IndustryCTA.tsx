import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface IndustryCTAProps {
  industryName: string;
}

export const IndustryCTA = ({ industryName }: IndustryCTAProps) => {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 md:p-8 rounded-lg text-center mt-8 md:mt-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Transform Your {industryName} Business Today</h2>
      <p className="text-base md:text-xl mb-6 md:mb-8">
        Ready to overcome your IT challenges and leverage AI automation for growth? 
        Contact CTRL Tech for a personalized consultation tailored to your industry needs.
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4">
        <Button 
          variant="secondary" 
          size="lg"
          className="w-full md:w-auto bg-white text-blue-600 hover:bg-blue-50"
          onClick={() => {
            const formSection = document.getElementById("contact-form");
            formSection?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Schedule a Consultation
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          className="w-full md:w-auto border-white text-white hover:bg-white/10"
        >
          Learn More
        </Button>
      </div>
    </Card>
  );
};