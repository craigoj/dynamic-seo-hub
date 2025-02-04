import { Link } from "react-router-dom";

interface Industry {
  name: string;
  slug: string;
}

export const IndustryLinks = ({ industries }: { industries: Industry[] }) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Industries</h2>
      <ul className="space-y-2">
        {industries.map((industry) => (
          <li key={industry.slug}>
            <Link
              to={`/industries/${industry.slug}`}
              className="text-blue-600 hover:underline"
            >
              {industry.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};