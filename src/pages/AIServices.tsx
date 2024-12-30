import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIHeroSection } from "@/components/ai-services/AIHeroSection";
import { AIPainPointsSection } from "@/components/ai-services/AIPainPointsSection";
import { AIOutcomeSection } from "@/components/ai-services/AIOutcomeSection";
import { AISolutionSection } from "@/components/ai-services/AISolutionSection";
import { ContactSection } from "@/components/ContactSection";

const AIServices = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <AIHeroSection />
        <AIPainPointsSection />
        <AIOutcomeSection />
        <AISolutionSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default AIServices;