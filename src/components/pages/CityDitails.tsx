import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Current, WeatherData } from "../../utils/shared-types";
import { queryKeys } from "../../utils/weather";
import { fetchCity } from "../../utils/weather";
import Notes from "./Notes";
import { Star } from "lucide-react";
import { useFavorites } from "../../hooks/useFavorites";
import cn from "../../utils/cn";

const CityDetails = () => {
  const [searchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

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

  console.log("Details comp: Error", error);

  console.log(weatherData);

  if (isLoading) {
    return <div>Fetching weather data from API ...</div>;
  }

  if (!weatherData) {
    return (
      <div>Unable to fetch weather information for the give geolocation</div>
    );
  }

  const RenderWeatherData = ({ data }: { data: Current }) => {
    const nodes = [];
    const exclusions = [
      "observation_time",
      "weather_code",
      "weather_icons",
      "weather_descriptions",
    ];
    const units: { [k in keyof Current]?: string } = {
      temperature: "°C",
      wind_speed: "km/h",
      pressure: "mb",
      precip: "mm",
      humidity: "%",
      cloudcover: "%",
      feelslike: "°C",
      visibility: "km",
    };

    for (const k of Object.keys(data) as Array<keyof Current>) {
      if (!exclusions.includes(k)) {
        nodes.push(
          <div key={k} className="flex justify-center items-center flex-col">
            <p className="text-sm">
              {k.split("_").join(" ").toLocaleUpperCase()}
            </p>
            <p className="pt-4 text-gray-400 text-xs">
              {data[k]} {units[k] || ""}
            </p>
          </div>
        );
      }
    }
    return nodes;
  };

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
                {weatherData.location.name.toLocaleUpperCase()}
              </p>
              <p className="pt-1 text-gray-400 text-sm">
                {weatherData.location.country.toLocaleUpperCase()}
              </p>
              <p className="pt-4 text-gray-400 text-xs italic">
                {weatherData.current.weather_descriptions[0]}
              </p>
            </div>
            <button
              onClick={() => toggleFavorite(weatherData.location)}
              className="group flex justify-center items-center w-12 h-12 rounded-full border border-sky-600/20 bg-sky-50 dark:bg-sky-100/5  hover:bg-sky-100/10 cursor-pointer"
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
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-8">
            <RenderWeatherData data={weatherData.current} />
          </div>
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
