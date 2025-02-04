import { Link } from "react-router-dom";
import { coreServices } from "@/config/services";

export const ServiceLinks = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Main Services</h2>
      <ul className="space-y-2">
        {coreServices.map((service) => (
          <li key={service.slug}>
            <Link
              to={`/services/${service.slug}`}
              className="text-blue-600 hover:underline"
            >
              {service.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};