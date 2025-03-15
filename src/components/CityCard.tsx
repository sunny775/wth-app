import { memo } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Star, Trash } from "lucide-react";
import { WeatherData, City } from "../utils/shared-types";
import { queryKeys } from "../utils/weather";
import { fetchCity } from "../utils/weather";
import CityCardSkeleton from "./loaders/CityCardSkeleton";
import cn from "../utils/cn";
import Card, { CardProps } from "./Card";
import Button from "./Button";
import Tooltip from "./Tooltip.";

export interface CityCardProps extends Omit<CardProps, "children"> {
  city: City;
  isFavorite?: boolean;
  toggleFavorite: (city: City) => void;
  deleteInitialCity?: (city: City) => void;
}

const CityCard = memo(
  ({
    city: { lat, lon },
    isFavorite,
    toggleFavorite,
    deleteInitialCity,
    className,
    ...props
  }: CityCardProps) => {
    const {
      data: weatherData,
      isLoading,
      error,
    } = useQuery<WeatherData>({
      queryKey: queryKeys.city({ lat, lon }),
      queryFn: () => fetchCity(`${lat},${lon}`),
    });

    if (isLoading) return <CityCardSkeleton />;
    if (error)
      return (
        <Card className="flex items-center justify-center w-full h-full min-h-32">
          {error.message}
        </Card>
      );
    if (!weatherData)
      return (
        <Card className="flex items-center justify-center w-full h-full min-h-32">
          Data Not Found
        </Card>
      );

    return (
      <Card {...props} className={className}>
        <div className="flex justify-center items-center gap-x-2">
          <img
            src={weatherData.current.weather_icons[0]}
            className="w-8 h-8 rounded-full drop-shadow-[0_5px_5px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_5px_5px_rgba(135,206,235,0.2)]"
          />
          <div>{weatherData.current.temperature}°C</div>
        </div>

        <Link to={`${weatherData.location.lat}/${weatherData.location.lon}`}>
          <h3 className="mt-0.5 text-lg font-medium w-fit">
            {weatherData.location.name}
          </h3>
        </Link>

        <p className="mb-4 line-clamp-3 text-sm/relaxed text-gray-500">
          {weatherData.location.country}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center gap-x-1">
            <Tooltip
              text={isFavorite ? "Remove From Favorites" : "Add To Favorites"}
            >
              <Button
                className="rounded-full w-9 px-0"
                onClick={() => toggleFavorite(weatherData.location)}
              >
                <Star
                  className={cn("h-4 w-4 hover:stroke-orange-500", {
                    "fill-orange-500 stroke-orange-500": isFavorite,
                  })}
                  strokeWidth={1}
                />
              </Button>
            </Tooltip>
            {!isFavorite && (
              <Tooltip text="Delete">
                <Button
                  className="rounded-full w-9 px-0"
                  onClick={() => deleteInitialCity?.(weatherData.location)}
                >
                  <Trash className="h-4 w-4 stroke-red-500" strokeWidth={1} />
                </Button>
              </Tooltip>
            )}
          </div>
          <Link
            className="group flex items-center gap-x-1 text-sm font-medium text-sky-600"
            to={`${weatherData.location.lat}/${weatherData.location.lon}`}
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
      </Card>
    );
  }
);

export default CityCard;
