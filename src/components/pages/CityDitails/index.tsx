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

  console.log(weatherData)

  return (
    <div className="flex gap-x-8 py-16 px-8 items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="rounded-xl p-8 shadow bg-white dark:bg-white/2 transition mb-8">
          <div className="flex items-center justify-center p-4">
            <img
              src={weatherData.current.weather_icons[0]}
              alt={weatherData.current.weather_descriptions[0]}
              className="sm:hidden w-24 h-24 rounded-full drop-shadow-[0_5px_5px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_5px_5px_rgba(135,206,235,0.2)]"
            />
          </div>
          <div className="flex justify-center items-center gap-6 mb-8 lg:mb-12">
            <img
              src={weatherData.current.weather_icons[0]}
              alt={weatherData.current.weather_descriptions[0]}
              className="hidden sm:block w-12 h-12 rounded-full drop-shadow-[0_5px_5px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_5px_5px_rgba(135,206,235,0.2)]"
            />
            <div className="flex justify-center items-center flex-col">
              <div className="flex justify-center items-center gap-x-2">
                <p className="text-2xl">
                  {weatherData.location.name.toUpperCase()}
                </p>
                <Tooltip
                  className="sm:hidden"
                  text={
                    isFavorite(weatherData.location)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <Button
                    title="Toggle Favorite"
                    onClick={() => toggleFavorite(weatherData.location)}
                    className="group  w-12 h-12 rounded-full  hover:bg-sky-100/10 border-0 shadow-none"
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
              <p className="pt-1 text-sm text-gray-500 dark:text-gray-400">
                {weatherData.location.country.toUpperCase()}
              </p>
              <p className="pt-4 text-xs italic text-gray-500 dark:text-gray-400">
                {weatherData.current.weather_descriptions[0]}
              </p>
            </div>
            <Tooltip
              className="hidden sm:block"
              text={
                isFavorite(weatherData.location)
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
            >
              <Button
                title="Toggle Favorite"
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
