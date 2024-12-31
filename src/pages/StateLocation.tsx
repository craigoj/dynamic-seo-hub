import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { LocationLinks } from "@/components/LocationLinks";
import { PageBreadcrumbs } from "@/components/navigation/PageBreadcrumbs";
import { MapPin, Building2, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const locations = {
  Ohio: [
    "Columbus",
    "Cleveland",
    "Cincinnati",
    "Toledo",
    "Akron",
    "Dayton",
    "Parma",
    "Canton"
  ],
  Virginia: [
    "Richmond",
    "Virginia Beach",
    "Norfolk",
    "Chesapeake",
    "Arlington",
    "Alexandria",
    "Roanoke",
    "Lynchburg"
  ]
};

const stateDescriptions = {
  Virginia: {
    title: "IT Services & AI Solutions in Virginia",
    description: "From Richmond's historic business district to Virginia Beach's coastal enterprises, CTRL Tech delivers cutting-edge IT solutions and AI automation services across Virginia. Our local expertise and dedicated support help businesses thrive in the digital age.",
    keyPoints: [
      "24/7 Local IT Support",
      "Custom AI Solutions",
      "Cybersecurity Services",
      "Cloud Migration",
      "Network Management"
    ]
  },
  Ohio: {
    title: "IT Services & AI Solutions in Ohio",
    description: "Serving businesses from Columbus's tech corridor to Cleveland's industrial hub, CTRL Tech provides innovative IT solutions and AI automation services throughout Ohio. Our comprehensive services are tailored to meet the unique needs of Ohio's diverse business landscape.",
    keyPoints: [
      "Local Technical Support",
      "AI Implementation",
      "Data Security",
      "Cloud Services",
      "IT Infrastructure"
    ]
  }
};

export default function StateLocation() {
  const { state } = useParams<{ state: string }>();
  const stateInfo = state ? stateDescriptions[state as keyof typeof stateDescriptions] : null;
  const stateCities = state ? locations[state as keyof typeof locations] : [];

  useEffect(() => {
    if (stateInfo) {
      document.title = `${stateInfo.title} | CTRL Tech`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", stateInfo.description);
      }
    }
  }, [state, stateInfo]);

  if (!state || !stateInfo || !stateCities) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">State Not Found</h1>
            <p>Sorry, we couldn't find information for this state.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <PageBreadcrumbs
            items={[
              { label: "Locations", href: "/locations" },
              { label: state }
            ]}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{stateInfo.title}</h1>
            <p className="text-xl text-gray-600 mb-12 max-w-4xl">
              {stateInfo.description}
            </p>

            {/* Key Features */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8">Why Choose CTRL Tech in {state}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stateInfo.keyPoints.map((point, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {index % 3 === 0 && <MapPin className="h-6 w-6 text-blue-600" />}
                      {index % 3 === 1 && <Building2 className="h-6 w-6 text-blue-600" />}
                      {index % 3 === 2 && <Users className="h-6 w-6 text-blue-600" />}
                      <h3 className="font-semibold text-lg">{point}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Cities Grid */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8">Cities We Serve in {state}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stateCities.map((city) => (
                  <Link
                    key={city}
                    to={`/locations/${state}/${city}`}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                        {city}
                      </h3>
                    </div>
                    <p className="text-gray-600">
                      IT Services & Support
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Transform Your Business in {state}?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Get started with a free consultation and discover how our IT solutions can help your business thrive.
              </p>
              <Button 
                size="lg"
                onClick={() => {
                  const formSection = document.getElementById("contact-form");
                  formSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get Your Free Assessment
              </Button>
            </section>
          </motion.div>
        </div>
        <ContactSection />
        <LocationLinks />
      </main>
      <Footer />
    </div>
  );
}