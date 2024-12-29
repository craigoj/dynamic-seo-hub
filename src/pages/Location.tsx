import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";

const Location = () => {
  const { state, city } = useParams();
  const [locationData, setLocationData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocationData = async () => {
      const { data, error } = await supabase
        .from("locations")
        .select("*")
        .eq("state", state)
        .eq("city", city)
        .single();

      if (error) {
        console.error("Error fetching location data:", error);
      } else {
        setLocationData(data);
        // Update meta tags
        document.title = data.meta_title;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute("content", data.meta_description);
        }

        // Add schema markup
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
      setLoading(false);
    };

    fetchLocationData();
  }, [state, city]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">
            IT Services in {city}, {state}
          </h1>
          {locationData && (
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: locationData.content }} />
            </div>
          )}
        </div>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Location;