
import { Clock, ShieldX, TrendingDown } from "lucide-react";

export const PainPointsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Does this sound familiar?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Many small businesses think IT and automation are too costly or complex. In reality, they're the key to scaling efficiently without breaking the bank.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-xl">
            <Clock className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Time Waste</h3>
            <p className="text-gray-600">Wasting hours on manual data entry while your competition moves ahead.</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl">
            <ShieldX className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Security Concerns</h3>
            <p className="text-gray-600">Struggling to keep your systems secure with limited IT expertise.</p>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl">
            <TrendingDown className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-3">Missed Opportunities</h3>
            <p className="text-gray-600">Missing out on growth opportunities because you're bogged down with inefficiencies.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
