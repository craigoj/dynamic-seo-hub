
import { Users, Shield, Rocket } from "lucide-react";

export const OutcomeSection = () => {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Now, imagine this...
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your business running smoothly, 24/7, while you focus on growth
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <Users className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Focused Teams</h3>
            <p className="text-gray-600">Your team focuses on clients while systems handle the rest seamlessly.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <Shield className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Peace of Mind</h3>
            <p className="text-gray-600">You sleep peacefully knowing your business is secure and compliant.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <Rocket className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Efficient Operations</h3>
            <p className="text-gray-600">Every day feels productive, efficient, and under control.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
