import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Enterprise-Grade IT Solutions for Your Business
          </h1>
          <p className="text-xl mb-8">
            Nationwide managed IT services tailored to your industry. Experience reliable, secure, and scalable technology solutions.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={() => {
              const formSection = document.getElementById("contact-form");
              formSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get Your Free IT Assessment
          </Button>
        </div>
      </div>
    </section>
  );
};