import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { MainLinks } from "@/components/sitemap/MainLinks";
import { ServiceLinks } from "@/components/sitemap/ServiceLinks";
import { IndustryLinks } from "@/components/sitemap/IndustryLinks";
import { LocationLinks } from "@/components/sitemap/LocationLinks";
import { LocationBasedLinks } from "@/components/sitemap/LocationBasedLinks";

interface Industry {
  name: string;
  slug: string;
}

const Sitemap = () => {
  const [data, setData] = useState<Industry[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First, try to get data from cache
        const { data: cacheData } = await supabase
          .from('page_cache')
          .select('content')
          .eq('url', '/sitemap')
          .single();

        if (cacheData) {
          setData(JSON.parse(cacheData.content));
          setLoading(false);
          return;
        }

        // If no cache, fetch from industries table
        const { data: industries, error: industriesError } = await supabase
          .from("industries")
          .select("name, slug");

        if (industriesError) throw industriesError;

        // Cache the result
        await supabase
          .from('page_cache')
          .upsert({
            url: '/sitemap',
            content: JSON.stringify(industries),
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'url'
          });

        setData(industries);
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
          <MainLinks />
          <ServiceLinks />
          {data && <IndustryLinks industries={data} />}
          <LocationLinks />
          {data && <LocationBasedLinks industries={data} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sitemap;