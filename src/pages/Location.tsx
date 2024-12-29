import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { LocationLinks } from "@/components/LocationLinks";
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
        // First try to get from database
        const { data: existingData, error: dbError } = await supabase
          .from("locations")
          .select("*")
          .eq("state", state)
          .eq("city", city)
          .maybeSingle();

        if (dbError) {
          console.error("Error fetching location data:", dbError);
          setError("Failed to load location data");
          return;
        }

        if (existingData) {
          setLocationData(existingData);
          if (existingData.meta_title) {
            document.title = existingData.meta_title;
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
              metaDescription.setAttribute("content", existingData.meta_description);
            }
          }
        } else {
          // If not in database, generate content using Supabase Edge Function
          const { data, error: functionError } = await supabase.functions
            .invoke('generate-location-content', {
              body: { city, state },
            });

          if (functionError || !data) {
            console.error('Error generating content:', functionError);
            throw new Error('Failed to generate content');
          }

          // Save to database
          const { data: newLocation, error: insertError } = await supabase
            .from("locations")
            .insert([
              {
                state,
                city,
                content: data.content,
                meta_title: `IT Services in ${city}, ${state} | Professional IT Support`,
                meta_description: `Professional IT services and solutions in ${city}, ${state}. Expert managed IT support, cybersecurity, and cloud solutions for your business.`,
              },
            ])
            .select()
            .single();

          if (insertError) {
            console.error("Error saving location:", insertError);
            toast.error("Failed to save location data");
          } else {
            setLocationData(newLocation);
            document.title = newLocation.meta_title;
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
              metaDescription.setAttribute("content", newLocation.meta_description);
            }
          }
        }
      } catch (err) {
        console.error("Error:", err);
        setError("An unexpected error occurred");
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