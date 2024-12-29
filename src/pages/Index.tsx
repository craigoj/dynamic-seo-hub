import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Shield, Cloud, Server, Network, Database } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Enterprise-Grade IT Solutions for Your Business
            </h1>
            <p className="text-xl mb-8">
              Nationwide managed IT services tailored to your industry. Experience reliable, secure, and scalable technology solutions.
            </p>
            <Button size="lg" variant="secondary">
              Get Your Free IT Assessment
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
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

      {/* Industries Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Industries We Serve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <Card key={industry.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{industry.title}</CardTitle>
                  <CardDescription>{industry.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-gray-300">
                Leading nationwide provider of managed IT services for businesses of all sizes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Cybersecurity</li>
                <li>Cloud Solutions</li>
                <li>IT Support</li>
                <li>Network Management</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-300">
                <li>1-800-IT-SUPPORT</li>
                <li>contact@company.com</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/about" className="hover:text-white">About</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
                <li><a href="/admin-login" className="hover:text-white">Admin Login</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="pt-6">
      <div className="mb-4">{icon}</div>
      <CardTitle className="mb-2">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);

// Industries Data
const industries = [
  {
    title: "Healthcare",
    description: "HIPAA-compliant IT solutions for healthcare providers."
  },
  {
    title: "Legal",
    description: "Secure document management and compliance solutions."
  },
  {
    title: "Finance",
    description: "Secure and compliant IT solutions for financial services."
  },
  {
    title: "Manufacturing",
    description: "IT solutions for modern manufacturing operations."
  },
  {
    title: "Retail",
    description: "Technology solutions for modern retail businesses."
  },
  {
    title: "Education",
    description: "IT support for educational institutions."
  }
];

export default Index;