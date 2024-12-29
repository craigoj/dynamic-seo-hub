import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LeadForm } from "@/components/LeadForm";
import { LocationLinks } from "@/components/LocationLinks";
import { supabase } from "@/integrations/supabase/client";

interface Industry {
  name: string;
  description: string;
  meta_title: string;
  meta_description: string;
  schema_markup: any;
}

const Industry = () => {
  const { slug } = useParams();
  const [industry, setIndustry] = useState<Industry | null>(null);

  useEffect(() => {
    const fetchIndustry = async () => {
      const { data, error } = await supabase
        .from("industries")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) {
        console.error("Error fetching industry:", error);
        return;
      }

      setIndustry(data);

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
    };

    fetchIndustry();
  }, [slug]);

  if (!industry) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{industry.name} IT Solutions</h1>
          <p className="text-xl">{industry.description}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Industry-Specific Solutions</CardTitle>
                <CardDescription>Tailored IT services for {industry.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>24/7 Monitoring & Support</li>
                  <li>Industry Compliance Management</li>
                  <li>Data Backup & Recovery</li>
                  <li>Security & Risk Assessment</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Why Choose Us</CardTitle>
                <CardDescription>Expert IT support for {industry.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Industry-Specific Expertise</li>
                  <li>Proven Track Record</li>
                  <li>Comprehensive Support</li>
                  <li>Scalable Solutions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Get Your Free IT Assessment</h2>
            <LeadForm />
          </div>
        </div>
      </section>

      <LocationLinks />
    </div>
  );
};

export default Industry;