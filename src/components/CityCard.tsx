import { memo } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Star, Trash } from "lucide-react";
import { WeatherData, City } from "../utils/types";
import { queryKeys } from "../utils/weather";
import { fetchCity } from "../utils/weather";
import CityCardSkeleton from "./loaders/CityCardSkeleton";

export interface CityCardProps {
  city: City;
  isFavorite?: boolean;
  toggleFavorite?: (city: City) => void;
  addToFavorite?: (city: City) => void;
  deleteInitialCity?: (city: City) => void;
}

const CityCard = memo(
  ({
    city: { lat, lon },
    isFavorite,
    toggleFavorite,
    addToFavorite,
    deleteInitialCity,
  }: CityCardProps) => {
    const {
      data: weatherData,
      isLoading,
      error,
    } = useQuery<WeatherData>({
      queryKey: queryKeys.city(lat, lon),
      queryFn: () => fetchCity(`${lat},${lon}`),
    });

    if (isLoading) return <CityCardSkeleton />;
    if (error) return <div>Failed to fetch</div>;
    if (!weatherData) return <div>Data not Found</div>;

    
    return (
        <div className="rounded-xl p-3 shadow-sm hover:shadow-lg bg-white dark:bg-white/2 transition">
          <div className="flex justify-center items-center gap-x-2">
            <img
              src={weatherData.current.weather_icons[0]}
              className="w-8 h-8 rounded-full drop-shadow-[0_5px_5px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_5px_5px_rgba(135,206,235,0.2)]"
            />
            <div>{weatherData.current.temperature}°C</div>
          </div>

          <Link to={`/city?lat=${weatherData.location.lat}&lon=${weatherData.location.lon}`}>
            <h3 className="mt-0.5 text-lg font-medium w-fit" >
              {weatherData.location.name}
            </h3>
          </Link>

          <p className="mb-4 line-clamp-3 text-sm/relaxed text-gray-500">
            {weatherData.location.country}
          </p>

          <div className="flex justify-between items-center">
            <div className="flex items-center justify-center gap-x-1">
              <button
                className="rounded-full border border-sky-100 dark:border-0 bg-sky-50 dark:bg-sky-800 dark:border-sky-700 dark:text-sky-100 px-2.5 py-0.5 text-xs  text-sky-600 cursor-pointer hover:shadow-md"
                onClick={() => {
                  if (isFavorite) {
                    toggleFavorite?.(weatherData.location);
                  } else {
                    addToFavorite?.(weatherData?.location);
                  }
                }}
              >
                {isFavorite ? (
                  <Star fill="orange" className="h-4 w-4" strokeWidth={0} />
                ) : (
                  <Star className="h-4 w-4" />
                )}
              </button>
              {!isFavorite && (
                <button
                  className="rounded-full bg-sky-50 dark:bg-sky-800 dark:border-sky-700 dark:text-sky-100  border border-sky-100 px-2.5 py-0.5 text-xs text-sky-600 cursor-pointer hover:shadow-md"
                  onClick={() => deleteInitialCity?.(weatherData.location)}
                >
                  <Trash className="h-4 w-4" />
                </button>
              )}
            </div>
            <Link
              className="group flex items-center gap-x-1 text-sm font-medium text-sky-600"
              to={`/city?lat=${weatherData.location.lat}&lon=${weatherData.location.lon}`}
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
    );
  }
);

export default CityCard;
