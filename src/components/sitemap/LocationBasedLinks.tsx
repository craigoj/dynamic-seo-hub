import { Link } from "react-router-dom";
import { allLocations } from "@/config/locations";
import { coreServices } from "@/config/services";

interface Industry {
  name: string;
  slug: string;
}

export const LocationBasedLinks = ({ industries }: { industries: Industry[] }) => {
  return (
    <section className="md:col-span-2 lg:col-span-3">
      <h2 className="text-xl font-semibold mb-4">Location-Based Services & Industries</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allLocations.map((location) => (
          <div key={`${location.state}-${location.city}`} className="space-y-2">
            <h3 className="font-medium text-gray-700">
              <Link 
                to={`/locations/${location.state}/${location.city}`}
                className="text-blue-600 hover:underline"
              >
                {location.city}, {location.state}
              </Link>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Services</h4>
                <ul className="space-y-1">
                  {coreServices.map((service) => (
                    <li key={`${location.city}-${service.slug}`}>
                      <Link 
                        to={`/services/${service.slug}/${location.state}/${location.city}`}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Industries</h4>
                <ul className="space-y-1">
                  {industries.map((industry) => (
                    <li key={`${location.city}-${industry.slug}`}>
                      <Link 
                        to={`/industries/${industry.slug}/${location.state}/${location.city}`}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {industry.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};