import { useState } from "react";
import { City } from "../../utils/shared-types";
import { useFavorites } from "../../hooks/useFavorites";
import SearchModal from "../search/SearchModal";
import { Plus } from "lucide-react";
import Button from "../Button";
import LazyCityCard from "../LazyCityCard";

const Home = () => {
  const {
    favoritesQuery,
    initialCitiesQuery,
    deleteInitialCity,
    isFavorite,
    toggleFavorite,
  } = useFavorites();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortCities = (cities: City[]) =>
    cities.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="py-16 px-8">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl">My Cities</h2>
        <Button
          className="border border-sky-600/20 bg-sky-50/20 dark:bg-sky-100/5 rounded-full  hover:bg-sky-50 dark:hover:bg-sky-100/10 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-4" /> <span>Add City</span>
        </Button>
      </div>
    
      <SearchModal
        open={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {sortCities(favoritesQuery.data || []).map((city) => (
          <LazyCityCard
            key={`${city.lat}${city.lon}`}
            city={city}
            toggleFavorite={(c: City) => toggleFavorite(c)}
            isFavorite
          />
        ))}
        {sortCities(initialCitiesQuery.data || []).map((city) => (
          <LazyCityCard
            key={`${city.lat}${city.lon}`}
            city={city}
            toggleFavorite={(c: City) => toggleFavorite(c)}
            deleteInitialCity={(c: City) => deleteInitialCity.mutate(c)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Home;
