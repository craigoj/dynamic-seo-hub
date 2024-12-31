import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocationsSection } from "@/components/LocationsSection";
import { motion } from "framer-motion";

export default function Locations() {
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
                Locations We Serve
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                CTRL Tech provides comprehensive IT solutions and AI automation services across Ohio and Virginia. 
                Find your local team of IT experts ready to help your business grow.
              </p>
            </motion.div>
          </div>
        </section>

        <LocationsSection />
      </main>
      <Footer />
    </div>
  );
}