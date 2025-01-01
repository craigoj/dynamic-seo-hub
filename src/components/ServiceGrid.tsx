import React from "react";
import { ServiceCard } from "./ServiceCard";

interface ServiceGridProps {
  industry?: string;
  city?: string;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({ industry, city }) => {
  const services = [
    {
      title: "IT Support",
      description: "24/7 technical support and maintenance for your business",
      href: `/services/it-support${city ? `/${state}/${city}` : ''}`
    },
    {
      title: "Cloud Services",
      description: "Secure and scalable cloud solutions for modern businesses",
      href: `/services/cloud-services${city ? `/${state}/${city}` : ''}`
    },
    {
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your data",
      href: `/services/cybersecurity${city ? `/${state}/${city}` : ''}`
    },
    {
      title: "Network Solutions",
      description: "Reliable networking infrastructure for your organization",
      href: `/services/network-solutions${city ? `/${state}/${city}` : ''}`
    }
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            href={service.href}
          />
        ))}
      </div>
    </section>
  );
};