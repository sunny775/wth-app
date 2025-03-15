import { City, LocationSearch, WeatherData } from "./shared-types";

export const initialLargestCities: () => Promise<City[]> = async () => [
  /* { name: "Tokyo", country: "Japan", lat: "35.690", lon: "139.692" },
  { name: "New Delhi", country: "India", lat: "28.600", lon: "77.200" },
  { name: "Shanghai", country: "China", lat: "31.005", lon: "121.409" },
  {
    name: "Sao Paulo",
    country: "Brazil",
    lat: "-23.533",
    lon: "-46.617",
  },
  {
    name: "Mexico City",
    country: "Mexico",
    lat: "19.429",
    lon: "-99.128",
  },
  { name: "Cairo", country: "Egypt", lat: "30.050", lon: "31.250" },
  {
    name: "Dhaka",
    country: "Bangladesh",
    lat: "23.723",
    lon: "90.409",
  },
  { name: "Bombay", country: "India", lat: "18.975", lon: "72.826" },
  { name: "Beijing", country: "China", lat: "39.929", lon: "116.388" },
  {
    name: "Osaka-Shi",
    country: "Japan",
    lat: "34.694",
    lon: "135.502",
  },*/
  {
    name: "New York",
    country: "United States of America",
    lat: "40.714",
    lon: "-74.006",
  },
  {
    name: "Karachi",
    country: "Pakistan",
    lat: "24.867",
    lon: "67.050",
  },
  {
    name: "Chongqing",
    country: "China",
    lat: "29.563",
    lon: "106.553",
  },
  { name: "Istanbul", country: "Turkey", lat: "41.019", lon: "28.965" },
  {
    name: "Buenos Aires",
    country: "Argentina",
    lat: "-34.588",
    lon: "-58.673",
  },
];

export const fetchFn = async <T>(url: string): Promise<T> => {
  const options = {
    method: "GET",
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok || (data && data.success === false)) {
      const errorMessage = data?.error?.info || "Unknown API error";
      throw new Error(
        `API Error: ${errorMessage} (Code: ${data?.error?.code})`
      );
    }
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch"
    );
  }
};

export function removeDuplicateCities<T extends City>(cities: T[]): T[] {
  const uniqueCities = new Map<string, T>();

  cities.forEach((city) => {
    const key = `${city.lat},${city.lon},${city.country}`;

    if (!uniqueCities.has(key)) {
      uniqueCities.set(key, city);
    }
  });

  return Array.from(uniqueCities.values());
}

// const API_KEY = "85192dff816031ea400b255b583411be";
const API_KEY = "61d56a1173c3706f92b355775ba41dfb";

export const fetchCity = async (query: string) => {
  const url = `https://api.weatherstack.com/current?access_key=${API_KEY}&query=${query}`;
  return fetchFn<WeatherData>(url);
};

export const fetchSearchResults = async (query: string) => {
  const url = `https://api.weatherstack.com/autocomplete?access_key=${API_KEY}&query=${query}`;
  return fetchFn<LocationSearch>(url);
};

export const queryKeys = {
  userLoation: () => ["userLocation"],
  theme: () => ["app-theme"],
  initialCities: () => ["weatherData", "initialCities"],
  favorites: () => ["weatherData", "favorites"],
  city: (args: { lat: string; lon: string }) => [
    "weatherData",
    Object.values(args).toString(),
  ],
  search: (query: string) => ["searchResults", query],
};
