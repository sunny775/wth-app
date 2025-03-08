import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { WeatherData } from "../utils/types";
import { queryKeys } from "../utils/weather";
import { fetchCity } from "../utils/weather";
import Notes from "./Notes";

const CityDetails = () => {
  const [searchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  const {
    data: weatherData,
    isLoading,
    error,
  } = useQuery<WeatherData>({
    queryKey: lat && lon ? queryKeys.city(lat, lon) : [],
    queryFn: () => fetchCity(`${lat},${lon}`),
    enabled: !!lat && !!lon, // Only fetch if lat & lon exist
    // staleTime: 1000, // 1 second
  });

  console.log("Details comp: Error", error);

  console.log(weatherData);

  if(isLoading){
    return <div>Fetching weather data from API ...</div>
  }

  if (!weatherData) {
    return (
      <div>Unable to fetch weather information for the give geolocation</div>
    );
  }

  return (
    <div className="flex gap-x-8 py-16 px-8 items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="rounded-xl p-3 shadow dark:shadow-md bg-white dark:bg-white/2 transition mb-8">
          <div className="flex justify-center items-center gap-6 mb-8 lg:mb-12">
            <img
              src={weatherData.current.weather_icons[0]}
              className="w-12 h-12 rounded-full drop-shadow-[0_5px_5px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_5px_5px_rgba(135,206,235,0.2)]"
            />
            <div className="flex justify-center items-center flex-col">
              <p className="text-2xl">{weatherData.location.name}</p>
              <p className="pt-1 text-gray-400 text-sm">
                {weatherData.location.country}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4">
            <div className="flex justify-center items-center flex-col">
              <p>Temperature</p>
              <p className="pt-4 text-gray-400 text-xs">
                {weatherData.current.temperature}°C
              </p>
            </div>
            <div className="flex justify-center items-center flex-col">
              <p>Cloud Cover</p>
              <p className="pt-4 text-gray-400 text-xs">
                {weatherData.current.cloudcover}
              </p>
            </div>
            <div className="flex justify-center items-center flex-col">
              <p>Humidity</p>
              <p className="pt-4 text-gray-400 text-xs">
                {weatherData.current.humidity}
              </p>
            </div>
            <div className="flex justify-center items-center flex-col">
              <p>Precip</p>
              <p className="pt-4 text-gray-400 text-xs">
                {weatherData.current.precip}
              </p>
            </div>
            <div className="flex justify-center items-center flex-col">
              <p>Pressure</p>
              <p className="pt-4 text-gray-400 text-xs">
                {weatherData.current.pressure}
              </p>
            </div>
            <div className="flex justify-center items-center flex-col">
              <p>Visibility</p>
              <p className="pt-4 text-gray-400 text-xs">
                {weatherData.current.visibility}
              </p>
            </div>
            <div className="flex justify-center items-center flex-col">
              <p>UV Index</p>
              <p className="pt-4 text-gray-400 text-xs">
                {weatherData.current.uv_index}
              </p>
            </div>
            <div className="flex justify-center items-center flex-col">
              <p>Wind Speed</p>
              <p className="pt-4 text-gray-400 text-xs">
                {weatherData.current.wind_speed}
              </p>
            </div>
          </div>
        </div>
        <div className="min-h-screen rounded-xl p-3 shadow dark:shadow-md  bg-white dark:bg-white/2 transition">
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
