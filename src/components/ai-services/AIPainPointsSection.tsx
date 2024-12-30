import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export const AIPainPointsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Does this sound like your business?</h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Many businesses hesitate to adopt AI, thinking it's out of reach. But with CTRL Tech, AI and automation are tailored to your needs, making it affordable and easy to implement.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            "You're juggling multiple tools, and none of them talk to each other.",
            "Your team spends hours on repetitive tasks that should take seconds.",
            "You're paying for features you're not using and leaving efficiency on the table."
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