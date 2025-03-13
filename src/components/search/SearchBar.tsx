import { useRef, useState } from "react";
import { useClickAway, useDebounce } from "react-use";
import { useQuery } from "@tanstack/react-query";
import { LocationSearch } from "../../utils/shared-types";
import {
  fetchSearchResults,
  queryKeys,
  removeDuplicateCities,
} from "../../utils/weather";
import { Search } from "lucide-react";
import cn from "../../utils/cn";

type SearchResultProps = {
  results?: LocationSearch["results"];
  query: string;
  error: Error | null;
  isLoading: boolean;
  showDropdown: boolean;
};

interface SearchProps {
  className?: string;
  isDropdown: boolean;
  renderSearchResults: (props: SearchResultProps) => React.ReactNode;
}

export default function SearchBar({
  isDropdown,
  className,
  renderSearchResults,
}: SearchProps) {
  const refDropdown = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryDebounced, setSearchQueryDebounced] = useState("");

  useDebounce(() => setSearchQueryDebounced(searchQuery), 500, [searchQuery]);

  const {
    data: searchResults,
    isLoading,
    error,
  } = useQuery<LocationSearch["results"]>({
    queryKey: queryKeys.search(searchQueryDebounced),
    queryFn: async () => {
      const results = await fetchSearchResults(searchQueryDebounced);
      return removeDuplicateCities(results.results);
    },
    enabled: searchQueryDebounced.length > 2,
    retry: false,
  });

  useClickAway(refDropdown, () => setShowDropdown(false));

  console.log(searchResults);

  return (
    <div
      {...(isDropdown ? { ref: refDropdown } : {})}
      className={cn("relative", className)}
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
          className="w-full rounded-full bg-black/4 dark:bg-white/4 text-gray-700 dark:text-gray-300  border-gray-600 sm:text-sm pl-10 h-10 focus:outline-none focus:border focus:border-sky-600 placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />

        <button tabIndex={-1} className="sr-only">
          Submit
        </button>
      </form>
      {renderSearchResults({
        results: searchResults,
        query: searchQueryDebounced,
        error,
        isLoading,
        showDropdown,
      })}
    </div>
  );
}
