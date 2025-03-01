import { memo } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { WeathewrData, City } from "../utils/types";

const fetchCity = async (query: string): Promise<WeathewrData> => {
  const url = `https://api.weatherstack.com/current?access_key={PASTE_YOUR_API_KEY_HERE}&query=${query}`;
  const options = {
    method: "GET",
  };
  try {
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch search results");
  }
};

export interface CityCardProps {
  city: City;
  isFavorite?: boolean;
  toggleFavorite?: (city: City) => void;
  addToFavorite?: (city: City) => void;
  removeFromLargestCities?: (city: City) => void;
}

const CityCard = memo(
  ({
    city: { lat, lon },
    isFavorite,
    toggleFavorite,
    addToFavorite,
    removeFromLargestCities,
  }: CityCardProps) => {
    const {
      data: weatherData,
      isLoading,
      error,
    } = useQuery<WeathewrData>({
      queryKey: [`${lat}_${lon}`, lat, lon],
      queryFn: () => fetchCity(`${lat},${lon}`),
      staleTime: 1000 * 60 * 60, // Cache results for 1 hour
    });

    if (isLoading) return <div>loading ...</div>;
    if (error) return <div>Failed to fetch</div>;
    if (!weatherData) return <div>Data not Found</div>;
    return (
        <div
        className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-xs hover:[animation-duration:_4s]"
      >
        <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
        <div className="flex justify-center items-center">
          <img src={weatherData.current.weather_icons[0]} className="w-4 h-4" />
          <div>{weatherData.current.temperature}</div>
        </div>

        <Link to={`/city/${weatherData?.location.name}`}>
          <h3 className="mt-0.5 text-lg font-medium text-gray-900">
            {weatherData.location.name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          {weatherData.location.country}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                if (isFavorite) {
                  toggleFavorite?.(weatherData.location);
                } else {
                  addToFavorite?.(weatherData?.location);
                  removeFromLargestCities?.(weatherData?.location);
                }
              }}
            >
              ⭐ Favorite
            </button>
            {!isFavorite && (
              <button
                onClick={() => removeFromLargestCities?.(weatherData.location)}
              >
                Delete
              </button>
            )}
          </div>
          <Link
            to={`/city/${weatherData?.location.name}`}
            className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
          >
            Details
            <span
              aria-hidden="true"
              className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
            >
              &rarr;
            </span>
          </Link>
        </div>
      </div>
      </div>
    );
  }
);

export default CityCard;


