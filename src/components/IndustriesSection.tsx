import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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

export const IndustriesSection = () => {
  return (
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
  );
};