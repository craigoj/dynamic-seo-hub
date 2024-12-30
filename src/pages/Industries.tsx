import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IndustriesSection } from "@/components/IndustriesSection";
import { motion } from "framer-motion";

export default function Industries() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Industries We Serve
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                From professional services to manufacturing, we provide tailored IT solutions 
                and AI automation for diverse industries. Find out how we can help your business thrive.
              </p>
            </motion.div>
          </div>
        </section>

        <IndustriesSection />
      </main>
      <Footer />
    </div>
  );
}