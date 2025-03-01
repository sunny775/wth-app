import { useRef, useState } from "react";
import { Link } from "react-router";
import { useClickAway, useDebounce } from "react-use";
import { useQuery } from "@tanstack/react-query";
import { LocationSearchResults } from "../utils/types";

const fetchSearchResults = async (query: string): Promise<LocationSearchResults> => {
  const url = `https://api.weatherstack.com/current?access_key={PASTE_YOUR_API_KEY_HERE}&query=${query}`;
  const options = {
    method: "GET",
  };
  try {
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch search results");
  }
};

export default function SearchBar() {
  const refDropdown = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryDebounced, setSearchQueryDebounced] = useState("");

  useDebounce(() => setSearchQueryDebounced(searchQuery), 500, [searchQuery]);

  const { data: searchResults = [], isLoading, error } = useQuery<LocationSearchResults>({
    queryKey: ["searchResults", searchQueryDebounced],
    queryFn: () => fetchSearchResults(searchQueryDebounced),
    enabled: searchQueryDebounced.length > 2, // Fetch only if query length > 2
    staleTime: 1000 * 60 * 60, // Cache results for 1 hour
  });

  useClickAway(refDropdown, () => setShowDropdown(false));

  return (
    <div ref={refDropdown} className="relative flex h-16 max-w-[300px] flex-1 items-center">
      <form role="search" className="flex-1">
        <label htmlFor="SiteSearch" className="sr-only">
          Search
        </label>

        <input
          type="text"
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
          onFocus={() => setShowDropdown(true)}
          value={searchQuery}
          placeholder="Search..."
          id="SiteSearch"
          className="w-full rounded-md border-gray-200 sm:text-sm"
        />

        <button tabIndex={-1} className="sr-only">
          Submit
        </button>
      </form>

      {showDropdown && (
        <div className="fixed inset-x-0 top-14 z-50 rounded-md border border-gray-100 bg-white shadow-lg sm:absolute">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-gray-700">Loading search results...</div>
          ) : error ? (
            <div className="p-4 text-center text-sm text-red-600">Error fetching results.</div>
          ) : searchResults.length ? (
            <ul className="max-h-64 space-y-1 overflow-auto p-2">
              {searchResults.map((searchResult) => (
                    <li key={searchResult.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                ⭐ Favorite
                </div>
                <div>
                  <Link to={`/city?lat=${searchResult.lat}&lon=${searchResult.lon}`} className="group font-semibold text-gray-900">
                    <h3>{searchResult.name}</h3>
                    <div className="inline-flex items-center gap-1">
                    <p>{searchResult.country}
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
            <div className="p-4 text-center text-sm text-gray-700">No results found 😢</div>
          )}
        </div>
      )}
    </div>
  );
};




