import { useState } from "react";
import CityCard from "../components/CityCard";
import { City } from "../utils/types";
import { useFavorites } from "../utils/useFavorites";
import SearchModal from "../components/search/SearchModal";
import { Plus } from "lucide-react";

const Home = () => {
  const {
    favoritesQuery,
    initialCitiesQuery,
    deleteInitialCity,
    addFavorite,
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
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 border border-sky-600/20 bg-sky-50 dark:bg-sky-100/5 rounded-lg  hover:bg-sky-100/10 flex items-center justify-center cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-4" /> <span>Add City</span>
        </button>
      </div>
      <SearchModal
        open={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {sortCities(favoritesQuery.data || []).map((city) => (
          <CityCard
            key={city.name}
            city={city}
            toggleFavorite={(c: City) => toggleFavorite(c)}
            isFavorite
          />
        ))}
        {sortCities(initialCitiesQuery.data || []).map((city) => (
          <CityCard
            key={city.name}
            city={city}
            addToFavorite={(c: City) => addFavorite.mutate(c)}
            deleteInitialCity={(c: City) => deleteInitialCity.mutate(c)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Home;
