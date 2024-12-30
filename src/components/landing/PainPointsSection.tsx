import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export const PainPointsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Does this sound familiar?</h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Many small businesses think IT and automation are too costly or complex. In reality, they're the key to scaling efficiently without breaking the bank.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Wasting hours on manual data entry while your competition moves ahead.",
            "Struggling to keep your systems secure with limited IT expertise.",
            "Missing out on growth opportunities because you're bogged down with inefficiencies."
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