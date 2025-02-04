import { Link } from "react-router-dom";
import { allLocations, states } from "@/config/locations";

export const LocationLinks = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">State Pages</h2>
      <ul className="space-y-2">
        {states.map((state) => (
          <li key={state}>
            <Link 
              to={`/locations/${state}`}
              className="text-blue-600 hover:underline"
            >
              {state}
            </Link>
            <ul className="ml-4 mt-2 space-y-1">
              {allLocations
                .filter(location => location.state === state)
                .map(location => (
                  <li key={`${location.state}-${location.city}`}>
                    <Link 
                      to={`/locations/${location.state}/${location.city}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {location.city}
                    </Link>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};