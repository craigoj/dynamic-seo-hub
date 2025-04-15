
import { Headset, Cloud, Shield, Network } from "lucide-react";
import { Link } from "react-router-dom";

export const ServiceIconSection = () => {
  const services = [
    {
      icon: <Headset className="h-12 w-12 text-blue-600 mb-4" />,
      title: "IT Support",
      description: "24/7 technical support and maintenance for your business",
      link: "/services/it-infrastructure"
    },
    {
      icon: <Cloud className="h-12 w-12 text-blue-600 mb-4" />,
      title: "Cloud Services",
      description: "Secure and scalable cloud solutions for modern businesses",
      link: "/services/cloud-solutions"
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600 mb-4" />,
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your data",
      link: "/services/cybersecurity"
    },
    {
      icon: <Network className="h-12 w-12 text-blue-600 mb-4" />,
      title: "Network Solutions",
      description: "Reliable networking infrastructure for your organization",
      link: "/services/network-management"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link to={service.link} key={index} className="group">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                {service.icon}
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
