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

const Sitemap = () => {
  const [data, setData] = useState<SitemapData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSitemapData = async () => {
      try {
        // Fetch industries
        const { data: industries } = await supabase
          .from("industries")
          .select("slug, name");

        // Fetch locations
        const { data: locations } = await supabase
          .from("locations")
          .select("city, state");

        // Define core services
        const services = [
          "it-support",
          "cybersecurity",
          "cloud-solutions",
          "network-management",
          "ai-automation",
          "data-backup",
        ];

        setData({
          industries: industries || [],
          locations: locations || [],
          services,
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

          {/* Services */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Services</h2>
            <ul className="space-y-2">
              {data?.services.map((service) => (
                <li key={service}>
                  <Link 
                    to={`/services/${service}`}
                    className="text-blue-600 hover:underline"
                  >
                    {service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
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

          {/* Locations */}
          <section className="md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold mb-4">Locations</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {data?.locations.map((location) => (
                <Link 
                  key={`${location.state}-${location.city}`}
                  to={`/locations/${location.state.toLowerCase()}/${location.city.toLowerCase()}`}
                  className="text-blue-600 hover:underline"
                >
                  {location.city}, {location.state}
                </Link>
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