import { useCallback } from "react";
import { useGeolocation, useLocalStorage } from "react-use";
import CityCard from "../components/CityCard";
import SearchBar from "../components/SearchBar";
import { redirect } from "react-router";
import { City } from "../utils/types";



const initialLargestCities: City[] = [
    { name: "Tokyo", country: "Japan", lat: "35.6895", lon: "139.6917" },
    { name: "Delhi", country: "India", lat: "28.7041", lon: "77.1025" },
    { name: "Shanghai", country: "China", lat: "31.2304", lon: "121.4737" },
    { name: "São Paulo", country: "Brazil", lat: "-23.5505", lon: "-46.6333" },
    { name: "Mexico City", country: "Mexico", lat: "19.4326", lon: "-99.1332" },
    { name: "Cairo", country: "Egypt", lat: "30.0444", lon: "31.2357" },
    { name: "Dhaka", country: "Bangladesh", lat: "23.8103", lon: "90.4125" },
    { name: "Mumbai", country: "India", lat: "19.0760", lon: "72.8777" },
    { name: "Beijing", country: "China", lat: "39.9042", lon: "116.4074" },
    { name: "Osaka", country: "Japan", lat: "34.6937", lon: "135.5023" },
    { name: "New York City", country: "United States", lat: "40.7128", lon: "-74.0060" },
    { name: "Karachi", country: "Pakistan", lat: "24.8607", lon: "67.0011" },
    { name: "Chongqing", country: "China", lat: "29.5630", lon: "106.5516" },
    { name: "Istanbul", country: "Turkey", lat: "41.0082", lon: "28.9784" },
    { name: "Buenos Aires", country: "Argentina", lat: "-34.6037", lon: "-58.3816" }
  ];
  
  

const Home = () => {
  const { longitude, latitude } = useGeolocation();
  
  const [largestCities, setLargestCities] = useLocalStorage(
    "largestCities",
    initialLargestCities
  );

  const [favorites, setFavorites] = useLocalStorage<City[]>(
      "favoriteCities",
      []
    );


  const toggleFavorite = useCallback((targetCity: City) => {
    setFavorites((prev= []) =>
        prev.some(
            city =>city.lat === targetCity.lat && city.lon === targetCity.lon
          )? prev.filter(c => c.lat !== targetCity.lat || c.lon !== targetCity.lon) : [...prev, targetCity]
    );
  }, [setFavorites]);


  const removeFromLargestCities = (targetCity: City) => {
     setLargestCities((prev=[]) => prev.filter(city => city.lat !== targetCity.lat || city.lon !== targetCity.lon))
  }

  const addToFavorite = useCallback((targetCity: City) => {
    setFavorites((prev= []) =>[...prev, targetCity]
    );
  }, [setFavorites]);

  const sortCities = (cities: City[]) => cities.sort((a, b) => a.name.localeCompare(b.name))



  if(longitude && latitude){
   redirect(`/city?lat=${latitude},lon=${longitude}`);
   return;
  }
  return (
    <div>
      <SearchBar />
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {favorites && sortCities(favorites).map((city) => (
        <CityCard key={city.name} city={city} toggleFavorite={() => toggleFavorite(city)} isFavorite />
      ))}
      {sortCities(largestCities || []).map((city) => (
        <CityCard key={city.name} city={city} removeFromLargestCities={removeFromLargestCities} addToFavorite={addToFavorite} />
      ))}
      </ul>
    </div>
  );
};

export default Home;
