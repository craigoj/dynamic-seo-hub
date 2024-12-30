import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const SolutionSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Introducing CTRL Tech: A smarter way to manage IT and automation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This isn't just another IT solution. CTRL Tech combines cutting-edge AI with expert IT support to bring efficiency, security, and growth to small businesses. Simple, reliable, and designed for teams like yours.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            "Step 1: Book a free consultation to assess your needs.",
            "Step 2: Get a tailored IT and automation plan.",
            "Step 3: Watch your business thrive with streamlined operations."
          ].map((step, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 font-medium">{step}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <p className="text-xl font-medium text-blue-900 mb-4">
            "I started CTRL Tech to level the playing field for small businesses. Let us take care of IT, so you can take care of what matters most."
          </p>
          <p className="text-blue-600 font-medium">- Founder, CTRL Tech</p>
        </div>
      </div>
    </section>
  );
};