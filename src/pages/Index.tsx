import { useEffect } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Update meta tags
    document.title = "Enterprise IT Solutions | Nationwide Managed Services";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Nationwide managed IT services tailored to your industry. Experience reliable, secure, and scalable technology solutions for your business.");
    }

    // Add schema markup
    const schema = {
      "@context": "https://schema.org",
      "@type": "ITService",
      "name": "Your Company IT Solutions",
      "description": "Nationwide managed IT services tailored to your industry",
      "areaServed": "United States",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "IT Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Cybersecurity",
              "description": "Enterprise-grade security solutions and 24/7 monitoring"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Cloud Solutions",
              "description": "Cloud migration and management services"
            }
          }
        ]
      }
    };

    const scriptTag = document.createElement("script");
    scriptTag.type = "application/ld+json";
    scriptTag.text = JSON.stringify(schema);
    document.head.appendChild(scriptTag);

    return () => {
      document.head.removeChild(scriptTag);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <ServicesSection />
      <IndustriesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;