import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { WeatherData } from "../../../utils/shared-types";
import { queryKeys } from "../../../utils/weather";
import { fetchCity } from "../../../utils/weather";
import Notes from "./Notes";
import { Star } from "lucide-react";
import { useFavorites } from "../../../hooks/useFavorites";
import cn from "../../../utils/cn";
import FullPage from "../../FullPage";
import PageLoader from "../../loaders/PageLoader";
import CurrentDataList from "./CurrentDataList";
import Button from "../../Button";
import Tooltip from "../../Tooltip.";

const CityDetails = () => {
  const { lat, lon } = useParams();

  const {
    data: weatherData,
    isLoading,
    error,
  } = useQuery<WeatherData>({
    queryKey: lat && lon ? queryKeys.city({ lat, lon }) : [],
    queryFn: () => fetchCity(`${lat},${lon}`),
    enabled: !!lat && !!lon,
  });

  const { toggleFavorite, isFavorite } = useFavorites();

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <FullPage>{error.message}</FullPage>;
  }

  if (!weatherData) {
    return (
      <FullPage>
        Unable to fetch weather information for the give geolocation
      </FullPage>
    );
  }

  return (
    <div className="flex gap-x-8 py-16 px-8 items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="rounded-xl p-8 shadow bg-white dark:bg-white/2 transition mb-8">
          <div className="flex justify-center items-center gap-6 mb-8 lg:mb-12">
            <img
              src={weatherData.current.weather_icons[0]}
              className="w-12 h-12 rounded-full drop-shadow-[0_5px_5px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_5px_5px_rgba(135,206,235,0.2)]"
            />
            <div className="flex justify-center items-center flex-col">
              <p className="text-2xl">
                {weatherData.location.name.toUpperCase()}
              </p>
              <p className="pt-1 text-gray-400 text-sm">
                {weatherData.location.country.toUpperCase()}
              </p>
              <p className="pt-4 text-gray-400 text-xs italic">
                {weatherData.current.weather_descriptions[0]}
              </p>
            </div>
            <Tooltip
              text={
                isFavorite(weatherData.location)
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
            >
              <Button
                onClick={() => toggleFavorite(weatherData.location)}
                className="group  w-12 h-12 rounded-full bg-sky-50 dark:bg-sky-100/5  hover:bg-sky-100/10"
              >
                <Star
                  className={cn(
                    "h-6 w-6 cursor-pointer group-hover:stroke-orange-500",
                    {
                      "fill-orange-500 stroke-orange-500": isFavorite(
                        weatherData.location
                      ),
                    }
                  )}
                  strokeWidth={1}
                />
              </Button>
            </Tooltip>
          </div>
          <CurrentDataList data={weatherData.current} />
        </div>
        <div className="min-h-90 rounded-xl p-3 shadow bg-white dark:bg-white/2 transition">
          <Notes
            lat={weatherData.location.lat}
            lon={weatherData.location.lon}
          />
        </div>
      </div>
    </div>
  );
};

export default CityDetails;
