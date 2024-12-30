import { Card, CardContent } from "@/components/ui/card";
import { Target } from "lucide-react";

export const AIOutcomeSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          What if your business looked like this?
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Imagine the possibilities with AI-powered automation
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Your team works seamlessly, focusing on high-value tasks while AI handles the rest.",
            "Your tools work together, automating your workflows and increasing efficiency.",
            "You scale your business without hiring more, keeping costs low and productivity high."
          ].map((outcome, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="p-6">
                <Target className="h-12 w-12 text-blue-500 mb-4" />
                <p className="text-gray-700">{outcome}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};