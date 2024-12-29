import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const locations = {
  Ohio: [
    "Columbus",
    "Cleveland",
    "Cincinnati",
    "Toledo",
    "Akron",
    "Dayton"
  ],
  Virginia: [
    "Richmond",
    "Virginia Beach",
    "Norfolk",
    "Chesapeake",
    "Arlington",
    "Alexandria"
  ]
};

export const LocationsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Locations We Serve</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(locations).map(([state, cities]) => (
            <div key={state} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                {state}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {cities.map((city) => (
                  <Link
                    key={city}
                    to={`/locations/${state}/${city}`}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {city}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};