import { useEffect, useState } from "react";

interface PainPointImageProps {
  query: string;
}

interface PixabayImage {
  id: number;
  webformatURL: string;
  tags: string;
}

export const PainPointImage = ({ query }: PainPointImageProps) => {
  const [image, setImage] = useState<PixabayImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=47853988-a5853ac484fa1e0eee37fc99b&q=${encodeURIComponent(
            query
          )}&image_type=photo&per_page=3&safesearch=true`
        );
        const data = await response.json();
        if (data.hits.length > 0) {
          const randomIndex = Math.floor(Math.random() * Math.min(3, data.hits.length));
          setImage(data.hits[randomIndex]);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [query]);

  if (loading) {
    return <div className="w-full h-32 bg-gray-200 animate-pulse rounded-lg"></div>;
  }

  if (!image) {
    return null;
  }

  return (
    <div className="relative w-full h-32 overflow-hidden rounded-lg mb-4">
      <img
        src={image.webformatURL}
        alt={image.tags}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-2 right-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
        Powered by Pixabay
      </div>
    </div>
  );
};