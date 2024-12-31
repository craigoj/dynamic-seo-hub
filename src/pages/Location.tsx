import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { LocationLinks } from "@/components/LocationLinks";
import { LocationContent } from "@/components/location/LocationContent";
import type { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";

type Location = Database["public"]["Tables"]["locations"]["Row"];

const Location = () => {
  const { state, city } = useParams();
  const [locationData, setLocationData] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        if (!state || !city) {
          throw new Error("State and city are required");
        }

        // First try to get from database
        const { data: existingData, error: dbError } = await supabase
          .from("locations")
          .select("*")
          .eq("state", state)
          .eq("city", city)
          .maybeSingle();

        if (dbError) {
          console.error("Error fetching location data:", dbError);
          throw new Error("Failed to load location data");
        }

        if (existingData) {
          console.log("Found existing location data:", existingData);
          setLocationData(existingData);
          if (existingData.meta_title) {
            document.title = existingData.meta_title;
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
              metaDescription.setAttribute("content", existingData.meta_description);
            }
          }

          // Add schema markup
          const schemaScript = document.createElement('script');
          schemaScript.type = 'application/ld+json';
          const schemaData = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "CTRL Tech",
            "description": existingData.meta_description,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": city,
              "addressRegion": state,
              "addressCountry": "US"
            },
            "url": `https://www.ctrltech.com/locations/${state}/${city}`,
            "telephone": "+1-800-123-4567",
            "areaServed": {
              "@type": "City",
              "name": city
            },
            "serviceArea": {
              "@type": "State",
              "name": state
            }
          };
          schemaScript.textContent = JSON.stringify(schemaData);
          document.head.appendChild(schemaScript);
        } else {
          console.log("No existing data found, generating content...");
          
          // Generate content using Edge Function
          const { data: generatedData, error: functionError } = await supabase.functions
            .invoke('generate-location-content', {
              body: { city, state }
            });

          if (functionError || !generatedData) {
            console.error('Error generating content:', functionError);
            throw new Error('Failed to generate content');
          }

          // The Edge Function now handles saving to the database
          // Fetch the newly created location data
          const { data: newLocation, error: fetchError } = await supabase
            .from("locations")
            .select("*")
            .eq("state", state)
            .eq("city", city)
            .single();

          if (fetchError) {
            console.error("Error fetching new location:", fetchError);
            throw new Error("Failed to retrieve location data");
          }

          console.log("Location data retrieved successfully:", newLocation);
          setLocationData(newLocation);
          document.title = newLocation.meta_title;
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute("content", newLocation.meta_description);
          }
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
        toast.error("Failed to load or generate location content");
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
          <LocationContent 
            city={city}
            state={state}
            content={JSON.parse(locationData.content)}
          />
        </div>
        <ContactSection />
        <LocationLinks />
      </main>
      <Footer />
    </div>
  );
};

export default Location;