import { useCallback, useEffect, useState } from "react";
import CityCard from "../components/CityCard";
import SearchBar from "../components/SearchBar";
import { City } from "../utils/types";
import { useFavorites } from "../utils/useFavorites";
import { getUserLocation } from "../utils/getUserLocation";
import Spinner from "../components/loaders/Spinner";

const Home = () => {

  const {
    favoritesQuery,
    initialCitiesQuery,
    deleteInitialCity,
    addFavorite,
    toggleFavorite,
  } = useFavorites();

  useEffect(() => {
    (() => {
      const CACHE_KEY = "userLocation";
      const CACHE_EXPIRY_KEY = "userLocation-expiry";
      const EXPIRY_TIME = 1000  * 60 * 30; // 30 minutes
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cacheExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);

      if (cachedData && cacheExpiry && (Date.now() < Number(cacheExpiry))) {
        // const { lat, lon } = JSON.parse(cachedData) as {
        //  lat: number;
         // lon: number;
        //};
        // setuserLocation({ lat, lon });
        return;
      }
      getUserLocation((lat, lon) => {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ lat, lon }));
        localStorage.setItem(
          CACHE_EXPIRY_KEY,
          JSON.stringify(Date.now() + EXPIRY_TIME)
        );
        window.location.href = `/city?lat=${lat}&lon=${lon}`;
      });
    })();
  }, []);

  const sortCities = (cities: City[]) =>
    cities.sort((a, b) => a.name.localeCompare(b.name));

  const [correctFavs, setCorrectFavs] = useState<City[]>([])

  useEffect(()=>{
    console.log(correctFavs)
  },[correctFavs])

  const setFavs = useCallback((city: City)=> {
    setCorrectFavs(favs => [...favs, city])
  }, [])

  return (
    <div className="py-16 px-8">
      <h2 className="text-3xl">My Cities</h2>
      <Spinner className="m-8 fill-gray-600 dark:fill-white/50" />
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {sortCities(favoritesQuery.data).map((city) => (
          <CityCard
            key={city.name}
            city={city}
            toggleFavorite={(c: City) => toggleFavorite(c)}
            isFavorite
            setCorrectFavs={setFavs}
          />
        ))}
        {sortCities(initialCitiesQuery.data).map((city) => (
          <CityCard
            key={city.name}
            city={city}
            addToFavorite={(c: City) => addFavorite.mutate(c)}
            deleteInitialCity={(c: City) => deleteInitialCity.mutate(c)}
            setCorrectFavs={setFavs}
          />
        ))}
      </ul>
    </div>
  );
};

export default Home;
