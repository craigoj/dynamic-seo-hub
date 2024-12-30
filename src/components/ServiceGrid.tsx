import { Shield, Cloud, Server, Network, Database, Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const services = [
  { 
    title: "Cybersecurity", 
    slug: "cybersecurity", 
    description: "Protect your business with enterprise-grade security",
    icon: Shield
  },
  { 
    title: "Cloud Solutions", 
    slug: "cloud-solutions", 
    description: "Seamless cloud migration and management",
    icon: Cloud
  },
  { 
    title: "IT Infrastructure", 
    slug: "it-infrastructure", 
    description: "Build and maintain robust IT systems",
    icon: Server
  },
  { 
    title: "Network Management", 
    slug: "network-management", 
    description: "Ensure optimal network performance",
    icon: Network
  },
  { 
    title: "Backup & Recovery", 
    slug: "backup-recovery", 
    description: "Protect your data with automated solutions",
    icon: Database
  },
  { 
    title: "IT Consulting", 
    slug: "it-consulting", 
    description: "Strategic technology planning",
    icon: Building2
  }
];

export const ServiceGrid = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link 
                key={service.slug} 
                to={`/services/${service.slug}`}
                className="transition-transform hover:-translate-y-1"
              >
                <Card className="h-full">
                  <CardHeader>
                    <Icon className="h-8 w-8 text-blue-600 mb-4" />
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-sm text-blue-600 font-medium">
                      Learn more →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};