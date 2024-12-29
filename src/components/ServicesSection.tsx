import { Shield, Cloud, Server, Network, Database, Building2 } from "lucide-react";
import { ServiceCard } from "./ServiceCard";

export const ServicesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Managed IT Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={<Shield className="h-8 w-8 text-blue-600" />}
            title="Cybersecurity"
            description="Protect your business with enterprise-grade security solutions and 24/7 monitoring."
          />
          <ServiceCard
            icon={<Cloud className="h-8 w-8 text-blue-600" />}
            title="Cloud Solutions"
            description="Seamlessly migrate and manage your applications in the cloud."
          />
          <ServiceCard
            icon={<Server className="h-8 w-8 text-blue-600" />}
            title="IT Infrastructure"
            description="Build and maintain a robust IT infrastructure that scales with your business."
          />
          <ServiceCard
            icon={<Network className="h-8 w-8 text-blue-600" />}
            title="Network Management"
            description="Ensure optimal network performance with proactive monitoring and maintenance."
          />
          <ServiceCard
            icon={<Database className="h-8 w-8 text-blue-600" />}
            title="Backup & Recovery"
            description="Protect your data with automated backup solutions and disaster recovery planning."
          />
          <ServiceCard
            icon={<Building2 className="h-8 w-8 text-blue-600" />}
            title="IT Consulting"
            description="Strategic technology planning and implementation for your business goals."
          />
        </div>
      </div>
    </section>
  );
};