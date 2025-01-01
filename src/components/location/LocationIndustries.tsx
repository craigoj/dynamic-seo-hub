import { Link } from "react-router-dom";
import { Stethoscope, Factory, Building2, ShoppingBag, Landmark } from "lucide-react";

interface LocationIndustriesProps {
  city: string;
  state: string;
}

export const LocationIndustries = ({ city, state }: LocationIndustriesProps) => {
  const industries = [
    {
      icon: <Stethoscope className="h-8 w-8 text-blue-600" />,
      title: "Healthcare",
      description: "HIPAA-compliant IT solutions",
      slug: "healthcare"
    },
    {
      icon: <Factory className="h-8 w-8 text-blue-600" />,
      title: "Manufacturing",
      description: "Smart manufacturing solutions",
      slug: "manufacturing"
    },
    {
      icon: <Building2 className="h-8 w-8 text-blue-600" />,
      title: "Professional Services",
      description: "Legal tech solutions",
      slug: "professional-services"
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-blue-600" />,
      title: "Retail",
      description: "Modern retail IT solutions",
      slug: "retail"
    },
    {
      icon: <Landmark className="h-8 w-8 text-blue-600" />,
      title: "Finance",
      description: "Secure financial technology",
      slug: "finance"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Industries We Serve in {city}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <Link
              key={index}
              to={`/industries/${industry.slug}/${state}/${city}`}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                {industry.icon}
                <h3 className="text-xl font-semibold">{industry.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{industry.description}</p>
              <span className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                Learn More →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};