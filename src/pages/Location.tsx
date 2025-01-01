import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { LocationLinks } from "@/components/LocationLinks";
import { LocationContent } from "@/components/location/LocationContent";
import { LocationHeader } from "@/components/location/LocationHeader";
import { LocationIndustries } from "@/components/location/LocationIndustries";
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
          
          const { data: generatedData, error: functionError } = await supabase.functions
            .invoke('generate-location-content', {
              body: { city, state }
            });

          if (functionError) {
            console.error('Error generating content:', functionError);
            throw new Error('Failed to generate content');
          }

          if (!generatedData) {
            throw new Error('No content was generated');
          }

          const { data: newLocation, error: fetchError } = await supabase
            .from("locations")
            .select("*")
            .eq("state", state)
            .eq("city", city)
            .maybeSingle();

          if (fetchError) {
            console.error("Error fetching new location:", fetchError);
            throw new Error("Failed to retrieve location data");
          }

          if (!newLocation) {
            throw new Error("Location data not found after generation");
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

  let parsedContent;
  try {
    parsedContent = typeof locationData.content === 'string' 
      ? JSON.parse(locationData.content)
      : locationData.content;
  } catch (err) {
    parsedContent = {
      main: locationData.content,
      services: [
        { name: "Cybersecurity", slug: "cybersecurity", description: "Protect your business with enterprise-grade security" },
        { name: "Cloud Solutions", slug: "cloud-solutions", description: "Seamless cloud migration and management" },
        { name: "IT Support", slug: "it-support", description: "24/7 technical support and maintenance" }
      ]
    };
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <LocationHeader city={city!} state={state!} />
        <LocationContent 
          city={city!}
          state={state!}
          content={parsedContent}
        />
        <LocationIndustries city={city!} state={state!} />
        <ContactSection />
        <LocationLinks />
      </main>
      <Footer />
    </div>
  );
};

export default Location;