import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocationsSection } from "@/components/LocationsSection";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Locations() {
  useEffect(() => {
    // Update meta tags for SEO
    document.title = "IT Service Locations | CTRL Tech - Ohio & Virginia";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Find local IT experts in Ohio and Virginia. CTRL Tech provides comprehensive IT solutions and AI automation services. Contact your nearest office today."
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div 
            className="absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1487958449943-2429e8be8625)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Local IT Services Across Ohio & Virginia
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                CTRL Tech provides comprehensive IT solutions and AI automation services across Ohio and Virginia. 
                Find your local team of IT experts ready to help your business grow.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Why Choose Local IT Support?</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 p-1 rounded-full">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">Faster response times with local technicians</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 p-1 rounded-full">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">Understanding of local business environment</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 p-1 rounded-full">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">Face-to-face consultations when needed</p>
                  </li>
                </ul>
              </div>
              <div className="relative h-64 md:h-96">
                <img
                  src="https://images.unsplash.com/photo-1460574283810-2aab119d8511"
                  alt="Modern office building representing our local presence"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <LocationsSection />
      </main>
      <Footer />
    </div>
  );
}