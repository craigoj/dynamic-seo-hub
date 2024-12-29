import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { LocationLinks } from "@/components/LocationLinks";
import type { Database } from "@/integrations/supabase/types";

type Location = Database["public"]["Tables"]["locations"]["Row"];

const Location = () => {
  const { state, city } = useParams();
  const [locationData, setLocationData] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const { data, error } = await supabase
          .from("locations")
          .select("*")
          .eq("state", state)
          .eq("city", city)
          .maybeSingle();

        if (error) {
          console.error("Error fetching location data:", error);
          setError("Failed to load location data");
        } else {
          setLocationData(data);
          if (data) {
            document.title = data.meta_title;
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
              metaDescription.setAttribute("content", data.meta_description);
            }

            if (data.schema_markup) {
              const scriptTag = document.createElement("script");
              scriptTag.type = "application/ld+json";
              scriptTag.text = JSON.stringify(data.schema_markup);
              document.head.appendChild(scriptTag);

              return () => {
                document.head.removeChild(scriptTag);
              };
            }
          }
        }
      } catch (err) {
        console.error("Error:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchLocationData();
  }, [state, city]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-12">
            <div className="text-red-600">{error}</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!locationData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">
              Location Not Found
            </h1>
            <p>Sorry, we couldn't find information for {city}, {state}.</p>
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
          <h1 className="text-4xl font-bold mb-8">
            IT Services in {city}, {state}
          </h1>
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: locationData.content }} />
          </div>
        </div>
        <ContactSection />
        <LocationLinks />
      </main>
      <Footer />
    </div>
  );
};

export default Location;