import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { ServiceImage } from "./ServiceImage";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const ServiceCard = ({ icon, title, description }: ServiceCardProps) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="pt-6">
      <ServiceImage query={`${title} IT service`} />
      <div className="mt-4 mb-4">{icon}</div>
      <CardTitle className="mb-2">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);