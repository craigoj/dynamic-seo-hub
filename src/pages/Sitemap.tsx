import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

interface Industry {
  name: string;
  slug: string;
}

interface Service {
  name: string;
  slug: string;
}

interface SitemapData {
  industries: Industry[];
  services: Service[];
}

// Core services data
const coreServices = [
  { name: "IT Support", slug: "it-support" },
  { name: "Cybersecurity", slug: "cybersecurity" },
  { name: "Cloud Solutions", slug: "cloud-solutions" },
  { name: "Network Services", slug: "network-services" },
  { name: "AI Automation", slug: "ai-automation" },
];

// Location data
const allLocations = [
  { city: "Cleveland", state: "Ohio" },
  { city: "Columbus", state: "Ohio" },
  { city: "Cincinnati", state: "Ohio" },
  { city: "Dayton", state: "Ohio" },
  { city: "Toledo", state: "Ohio" },
  { city: "Akron", state: "Ohio" },
  { city: "Canton", state: "Ohio" },
  { city: "Richmond", state: "Virginia" },
  { city: "Virginia Beach", state: "Virginia" },
  { city: "Norfolk", state: "Virginia" },
  { city: "Chesapeake", state: "Virginia" },
  { city: "Newport News", state: "Virginia" },
  { city: "Alexandria", state: "Virginia" },
  { city: "Hampton", state: "Virginia" },
];

// Get unique states from locations
const states = [...new Set(allLocations.map(location => location.state))];

const Sitemap = () => {
  const [data, setData] = useState<SitemapData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: industries, error: industriesError } = await supabase
          .from("industries")
          .select("name, slug");

        if (industriesError) throw industriesError;

        setData({
          industries,
          services: coreServices,
        });
      } catch (error) {
        console.error("Error fetching sitemap data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Sitemap</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Main Services */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Main Services</h2>
            <ul className="space-y-2">
              {coreServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Industries */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Industries</h2>
            <ul className="space-y-2">
              {data?.industries.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    to={`/industries/${industry.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* State Pages */}
          <section>
            <h2 className="text-xl font-semibold mb-4">State Pages</h2>
            <ul className="space-y-2">
              {states.map((state) => (
                <li key={state}>
                  <Link 
                    to={`/locations/${state}`}
                    className="text-blue-600 hover:underline"
                  >
                    {state}
                  </Link>
                  <ul className="ml-4 mt-2 space-y-1">
                    {allLocations
                      .filter(location => location.state === state)
                      .map(location => (
                        <li key={`${location.state}-${location.city}`}>
                          <Link 
                            to={`/locations/${location.state}/${location.city}`}
                            className="text-blue-600 hover:underline text-sm"
                          >
                            {location.city}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          {/* Location-Based Services */}
          <section className="md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold mb-4">Location-Based Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allLocations.map((location) => (
                <div key={`${location.state}-${location.city}`} className="space-y-2">
                  <h3 className="font-medium text-gray-700">
                    <Link 
                      to={`/locations/${location.state}/${location.city}`}
                      className="text-blue-600 hover:underline"
                    >
                      {location.city}, {location.state}
                    </Link>
                  </h3>
                  <ul className="space-y-1">
                    {coreServices.map((service) => (
                      <li key={`${location.city}-${service.slug}`}>
                        <Link 
                          to={`/services/${service.slug}/${location.state}/${location.city}`}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          {service.name} in {location.city}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sitemap;