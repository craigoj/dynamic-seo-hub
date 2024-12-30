import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceGrid } from "@/components/ServiceGrid";
import { motion } from "framer-motion";

export default function Services() {
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
                Our Managed IT Services
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                Comprehensive IT solutions designed for businesses with 4-20 employees. 
                We combine expert support with AI automation to help you grow efficiently.
              </p>
            </motion.div>
          </div>
        </section>

        <ServiceGrid />
      </main>
      <Footer />
    </div>
  );
}