import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Building2, Factory, Stethoscope, GraduationCap, ShoppingBag } from "lucide-react";

export const IndustriesSection = () => {
  const { state, city } = useParams();

  const industries = [
    {
      icon: <Stethoscope className="h-8 w-8 text-blue-600" />,
      title: "Healthcare",
      description: "HIPAA-compliant IT solutions and AI automation for healthcare providers.",
      slug: "healthcare"
    },
    {
      icon: <Factory className="h-8 w-8 text-blue-600" />,
      title: "Manufacturing",
      description: "Smart manufacturing solutions and industrial automation services.",
      slug: "manufacturing"
    },
    {
      icon: <Building2 className="h-8 w-8 text-blue-600" />,
      title: "Professional Services",
      description: "Technology solutions for law firms, accounting, and consulting practices.",
      slug: "professional-services"
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-blue-600" />,
      title: "Retail",
      description: "Digital transformation and POS solutions for retail businesses.",
      slug: "retail"
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-blue-600" />,
      title: "Education",
      description: "EdTech solutions and IT infrastructure for educational institutions.",
      slug: "education"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Industries We Serve</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <Link
              key={index}
              to={state && city 
                ? `/industries/${industry.slug}/${state}/${city}`
                : `/industries/${industry.slug}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                {industry.icon}
                <h3 className="text-xl font-semibold">{industry.title}</h3>
              </div>
              <p className="text-gray-600">{industry.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};