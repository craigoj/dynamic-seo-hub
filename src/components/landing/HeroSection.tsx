import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact-form');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Automate Your Business, Simplify Your Life
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Designed for businesses with 4-20 employees, CTRL Tech combines IT expertise with AI automation to eliminate inefficiencies and drive growth.
          </p>
          <ul className="space-y-3 mb-8 text-blue-100">
            <li className="flex items-start">
              <ArrowRight className="h-6 w-6 mr-2 flex-shrink-0" />
              <span>Save time by automating repetitive tasks like email workflows and data entry</span>
            </li>
            <li className="flex items-start">
              <ArrowRight className="h-6 w-6 mr-2 flex-shrink-0" />
              <span>Protect your data with robust cybersecurity and 24/7 monitoring</span>
            </li>
            <li className="flex items-start">
              <ArrowRight className="h-6 w-6 mr-2 flex-shrink-0" />
              <span>Streamline operations with IT support that scales as you grow</span>
            </li>
          </ul>
          <Button 
            size="lg" 
            onClick={scrollToContact}
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            Get Started Today
          </Button>
        </div>
      </div>
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800"
          alt="Technology background"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};