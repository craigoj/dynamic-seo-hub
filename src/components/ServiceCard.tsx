import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { ServiceImage } from "./ServiceImage";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

export const ServiceCard = ({ icon, title, description, href }: ServiceCardProps) => (
  <Link to={href}>
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <ServiceImage query={`${title} IT service`} />
        {icon && <div className="mt-4 mb-4">{icon}</div>}
        <CardTitle className="mb-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  </Link>
);