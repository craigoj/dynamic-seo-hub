import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export const PainPointsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Is this what your workday feels like?</h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Many think AI is out of reach, but at CTRL Tech, we simplify AI to fit your needs. Our solutions are designed to integrate seamlessly, without the hassle or cost you might expect.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            "You spend hours manually moving data between tools instead of focusing on growth.",
            "Your team is overwhelmed with repetitive tasks and can't tackle strategic projects.",
            "You're paying for expensive tools but not using their full potential."
          ].map((pain, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="p-6">
                <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                <p className="text-gray-700">{pain}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};