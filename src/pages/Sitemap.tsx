import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface SitemapData {
  industries: Array<{ slug: string; name: string }>;
  locations: Array<{ city: string; state: string }>;
  services: Array<string>;
}

const coreServices = [
  { slug: "it-support", name: "IT Support" },
  { slug: "cybersecurity", name: "Cybersecurity" },
  { slug: "cloud-solutions", name: "Cloud Solutions" },
  { slug: "network-management", name: "Network Management" },
  { slug: "ai-automation", name: "AI Automation" },
  { slug: "data-backup", name: "Data Backup" },
  { slug: "it-consulting", name: "IT Consulting" },
  { slug: "managed-services", name: "Managed Services" },
];

// Define all possible locations
const allLocations = [
  // Virginia locations
  { city: "Richmond", state: "Virginia" },
  { city: "Virginia Beach", state: "Virginia" },
  { city: "Norfolk", state: "Virginia" },
  { city: "Chesapeake", state: "Virginia" },
  { city: "Arlington", state: "Virginia" },
  { city: "Alexandria", state: "Virginia" },
  { city: "Roanoke", state: "Virginia" },
  { city: "Lynchburg", state: "Virginia" },
  // Ohio locations
  { city: "Columbus", state: "Ohio" },
  { city: "Cleveland", state: "Ohio" },
  { city: "Cincinnati", state: "Ohio" },
  { city: "Toledo", state: "Ohio" },
  { city: "Akron", state: "Ohio" },
  { city: "Dayton", state: "Ohio" },
  { city: "Parma", state: "Ohio" },
  { city: "Canton", state: "Ohio" },
];

const Sitemap = () => {
  const [data, setData] = useState<SitemapData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSitemapData = async () => {
      try {
        // Fetch industries
        const { data: industries } = await supabase
          .from("industries")
          .select("slug, name")
          .order('name');  // Order industries alphabetically

        setData({
          industries: industries || [],
          locations: allLocations,
          services: coreServices.map(service => service.slug),
        });
      } catch (error) {
        console.error("Error fetching sitemap data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSitemapData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full max-w-md" />
            <div className="grid gap-4 md:grid-cols-3">
              <Skeleton className="h-40" />
              <Skeleton className="h-40" />
              <Skeleton className="h-40" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Sitemap</h1>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Main Pages */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Main Pages</h2>
            <ul className="space-y-2">
              <li><Link to="/" className="text-blue-600 hover:underline">Home</Link></li>
              <li><Link to="/services" className="text-blue-600 hover:underline">Services</Link></li>
              <li><Link to="/industries" className="text-blue-600 hover:underline">Industries</Link></li>
              <li><Link to="/locations" className="text-blue-600 hover:underline">Locations</Link></li>
              <li><Link to="/ai-services" className="text-blue-600 hover:underline">AI Services</Link></li>
            </ul>
          </section>

          {/* Core Services */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Services</h2>
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

          {/* Location-Based Services */}
          <section className="md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold mb-4">Location-Based Services</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {data?.locations.map((location) => (
                <div key={`${location.state}-${location.city}`} className="space-y-2">
                  <h3 className="font-medium text-gray-700">
                    <Link 
                      to={`/locations/${location.state.toLowerCase()}/${location.city.toLowerCase()}`}
                      className="text-blue-600 hover:underline"
                    >
                      {location.city}, {location.state}
                    </Link>
                  </h3>
                  <ul className="space-y-1 pl-4">
                    {coreServices.map((service) => (
                      <li key={`${location.city}-${service.slug}`}>
                        <Link 
                          to={`/locations/${location.state.toLowerCase()}/${location.city.toLowerCase()}/services/${service.slug}`}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          {service.name} in {location.city}
                        </Link>
                      </li>
                    ))}
                    {data.industries.map((industry) => (
                      <li key={`${location.city}-${industry.slug}`}>
                        <Link 
                          to={`/locations/${location.state.toLowerCase()}/${location.city.toLowerCase()}/industries/${industry.slug}`}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          {industry.name} IT Services in {location.city}
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