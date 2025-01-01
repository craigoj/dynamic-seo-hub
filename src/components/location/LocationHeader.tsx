interface LocationHeaderProps {
  city: string;
  state: string;
}

export const LocationHeader = ({ city, state }: LocationHeaderProps) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">
        IT Services in {city}, {state}
      </h1>
    </div>
  );
};