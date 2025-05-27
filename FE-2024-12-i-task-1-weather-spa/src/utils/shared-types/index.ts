export interface Location {
  name: string;
  country: string;
  region: string;
  lat: string;
  lon: string;
  timezone_id: string;
  localtime: string;
  localtime_epoch: number;
  utc_offset: string;
}
export interface Current {
  observation_time: string;
  temperature: number;
  weather_code: number;
  weather_icons: string[];
  weather_descriptions: string[];
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uv_index: number;
  visibility: number;
}

export type WeatherData = { location: Location; current: Current };

export type LocationSearch = {
  request: { query: string; results: number };
  results: Omit<Location, "localtime" | "localtime_epoch">[];
};

export type City = Pick<Location, "name" | "country" | "lat" | "lon">;

export type Note = { id: string; text: string; date: string };
