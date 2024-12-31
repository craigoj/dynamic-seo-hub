import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LocationsSection } from "@/components/LocationsSection";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, Building2, Users, ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function Locations() {
  useEffect(() => {
    // Update meta tags for SEO
    document.title = "IT Services & AI Automation in Virginia & Ohio | CTRL Tech";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Discover CTRL Tech's IT services and AI automation solutions for businesses across Virginia and Ohio. Explore our local expertise in cities like Richmond, Virginia Beach, Columbus, and Cleveland."
      );
    }
  }, []);

  const scrollToLocations = () => {
    const element = document.getElementById('locations-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
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
                Local IT Services & AI Solutions in Virginia & Ohio
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mb-8">
                Experience the power of local expertise combined with cutting-edge technology. 
                CTRL Tech delivers personalized IT solutions and AI automation services across 
                Virginia and Ohio's thriving business communities.
              </p>
              <Button 
                onClick={scrollToLocations}
                size="lg"
                variant="secondary"
                className="group"
              >
                Find Your Local Office
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Regional Overview Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Regional Expertise</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Building2 className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-4">Virginia Operations</h3>
                <p className="text-gray-700 mb-4">
                  From Richmond's historic business district to Virginia Beach's coastal enterprises, 
                  we provide tailored IT solutions that help Virginia businesses thrive in the 
                  digital age.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                    Richmond Tech Hub
                  </li>
                  <li className="flex items-center">
                    <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                    Virginia Beach Innovation Center
                  </li>
                </ul>
              </motion.div>

              <motion.div 
                className="p-6 rounded-lg shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Building2 className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-4">Ohio Operations</h3>
                <p className="text-gray-700 mb-4">
                  Serving businesses from Columbus's tech corridor to Cleveland's industrial hub, 
                  we deliver innovative IT and AI solutions that drive Ohio's economic growth.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                    Columbus Technology Center
                  </li>
                  <li className="flex items-center">
                    <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                    Cleveland Innovation Hub
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose CTRL Tech Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose CTRL Tech</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <MapPin className="h-12 w-12 text-blue-600" />,
                  title: "Local Presence",
                  description: "Quick response times with technicians who understand your local business environment."
                },
                {
                  icon: <Users className="h-12 w-12 text-blue-600" />,
                  title: "Regional Expertise",
                  description: "Deep understanding of Virginia and Ohio's business landscapes and regulations."
                },
                {
                  icon: <Building2 className="h-12 w-12 text-blue-600" />,
                  title: "Industry Focus",
                  description: "Specialized solutions for manufacturing, healthcare, and professional services."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-white rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                >
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <div id="locations-section">
          <LocationsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}