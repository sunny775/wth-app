import { useRef, useState } from "react";
import { Link } from "react-router";
import { useClickAway, useDebounce } from "react-use";
import { useQuery } from "@tanstack/react-query";
import { City, LocationSearchResults } from "../utils/types";
import { fetchSearchResults, queryKeys } from "../utils/weather";
import { Search } from "lucide-react";

type SearchProps = {
  addToFavorite?: (city: City) => void;
};

export default function SearchBar({ addToFavorite }: SearchProps) {
  const refDropdown = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryDebounced, setSearchQueryDebounced] = useState("");

  useDebounce(() => setSearchQueryDebounced(searchQuery), 500, [searchQuery]);

  const {
    data: searchResults = [],
    isLoading,
    error,
  } = useQuery<LocationSearchResults>({
    queryKey: queryKeys.search(searchQueryDebounced),
    queryFn: () => fetchSearchResults(searchQueryDebounced),
    enabled: searchQueryDebounced.length > 2, // Fetch only if query length > 2
  });

  useClickAway(refDropdown, () => setShowDropdown(false));

  console.log(searchResults);

  return (
    <div
      ref={refDropdown}
      className="relative flex h-16 max-w-[300px] flex-1 items-center justify-center"
    >
      <div className="absolute left-2 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
        <Search className="w-6 h-6 stroke-gray-500" />
      </div>
      <form role="search" className="flex-1">
        <label htmlFor="SearchCities" className="sr-only">
          Search
        </label>

        <input
          type="text"
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
          onFocus={() => setShowDropdown(true)}
          value={searchQuery}
          placeholder="Search..."
          id="SearchCities"
          className="w-full rounded-full bg-black/4 dark:bg-white/4 border-gray-600 sm:text-sm pl-10 h-10 focus:outline-none focus:border focus:border-sky-600 placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />

        <button tabIndex={-1} className="sr-only">
          Submit
        </button>
      </form>

      {showDropdown && (
        <div className="fixed inset-x-0 top-14 z-50 rounded-md bg-white border border-gray-100 dark:border-black/15 dark:bg-black/10 shadow-lg sm:absolute">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-gray-700">
              Loading search results...
            </div>
          ) : error ? (
            <div className="p-4 text-center text-sm text-red-600">
              Error fetching results.
            </div>
          ) : searchResults.length ? (
            <ul className="max-h-64 space-y-1 overflow-auto p-2">
              {searchResults.map((searchResult) => (
                <li
                  key={searchResult.name}
                  className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div
                    onClick={() => addToFavorite?.(searchResult)}
                    className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
                  >
                    ⭐ Favorite
                  </div>
                  <div>
                    <Link
                      to={`/city?lat=${searchResult.lat}&lon=${searchResult.lon}`}
                      className="group font-semibold text-gray-900"
                    >
                      <h3>{searchResult.name}</h3>
                      <div className="inline-flex items-center gap-1">
                        <p>
                          {searchResult.country}
                          <span
                            aria-hidden="true"
                            className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                          >
                            &rarr;
                          </span>
                        </p>
                      </div>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-gray-700">
              No results found 😢
            </div>
          )}
        </div>
      )}
    </div>
  );
}
