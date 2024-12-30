import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const AIHeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact-form');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AI Services That Work Like Your Best Employee
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            CTRL Tech specializes in AI and automation services for small teams, helping businesses operate smarter, faster, and leaner.
          </p>
          <ul className="space-y-3 mb-8 text-blue-100">
            <li className="flex items-start">
              <ArrowRight className="h-6 w-6 mr-2 flex-shrink-0" />
              <span>Save time with AI agents that handle repetitive tasks like data entry and reporting</span>
            </li>
            <li className="flex items-start">
              <ArrowRight className="h-6 w-6 mr-2 flex-shrink-0" />
              <span>Turn call transcripts into engaging LinkedIn content automatically</span>
            </li>
            <li className="flex items-start">
              <ArrowRight className="h-6 w-6 mr-2 flex-shrink-0" />
              <span>Increase team productivity by 30-50% with AI-enhanced systems</span>
            </li>
          </ul>
          <Button 
            size="lg" 
            onClick={scrollToContact}
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            Book a Free Consultation
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