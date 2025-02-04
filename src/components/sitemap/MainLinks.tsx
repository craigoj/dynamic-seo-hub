import { Link } from "react-router-dom";

export const MainLinks = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Main Pages</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/ai-services" className="text-blue-600 hover:underline">
            AI Services
          </Link>
        </li>
        <li>
          <Link to="/services" className="text-blue-600 hover:underline">
            All Services
          </Link>
        </li>
        <li>
          <Link to="/industries" className="text-blue-600 hover:underline">
            All Industries
          </Link>
        </li>
        <li>
          <Link to="/locations" className="text-blue-600 hover:underline">
            All Locations
          </Link>
        </li>
      </ul>
    </section>
  );
};