
import { Button } from "@/components/ui/button";
import { Shield, ArrowUpRight, Check } from "lucide-react";

export const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact-form');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold leading-tight text-gray-900">
              Automate Your Business, Simplify Your Life
            </h1>
            <p className="text-xl text-gray-600">
              Empowering small businesses through seamless integration of IT expertise and AI automation. Transform your operations and accelerate business growth with our innovative solutions.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Save time by automating repetitive tasks</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Protect your data with robust cybersecurity</span>
              </div>
              <div className="flex items-center space-x-3">
                <ArrowUpRight className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Streamline operations with scalable IT support</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToContact}
                className="bg-blue-600 text-white px-8 py-6 rounded-full hover:bg-blue-700"
              >
                Get Started Today
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/services'}
                className="border-blue-600 text-blue-600 px-8 py-6 rounded-full hover:bg-blue-50"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              className="rounded-2xl shadow-2xl"
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800" 
              alt="Modern tech workspace with futuristic displays"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
