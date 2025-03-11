import { Link } from "react-router";
import Spinner from "../loaders/Spinner";
import SearchBar from "./SearchInput";
import cn from "../../utils/cn";

type SearchProps = {
  className?: string;
};

export default function HeaderSearchBar({ className }: SearchProps) {
  return (
    <SearchBar
      isDropdown
      className={cn("flex h-16 flex-1 items-center justify-center", className)}
      renderSearchResults={({
        results,
        query,
        error,
        isLoading,
        showDropdown,
      }) =>
        showDropdown && (
          <div className="pt-2 pb-4 fixed inset-x-0 top-14 z-50 rounded-md bg-white border border-gray-100 dark:border-black/5 dark:bg-[rgb(40,40,40)] shadow-lg sm:absolute backdrop-blur-md transition">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Spinner className="w-12 h-12" />
              </div>
            ) : error ? (
              <div className="p-4 text-center text-sm text-red-600">
                {error.message || "Error fetching results."}
              </div>
            ) : results?.results.length ? (
              <ul className="max-h-64 space-y-1 overflow-auto p-2">
                {results.results.map((searchResult) => (
                  <li
                    key={searchResult.name}
                    className="group rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-white/10"
                  >
                    <Link
                      to={`/city?lat=${searchResult.lat}&lon=${searchResult.lon}`}
                      className="group font-semibold text-gray-500 dark:text-white/50 flex items-center justify-between w-full"
                    >
                      <div>
                        <h3>{searchResult.name}</h3>
                        <p> {searchResult.country}</p>
                      </div>
                      <p>
                        <span
                          aria-hidden="true"
                          className="block transition-all group-hover:ms-0.5 rtl:rotate-180 text-sky-600"
                        >
                          &rarr;
                        </span>
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : query.length > 2 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                No results found 😢
              </div>
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">
                Enter at least the first 3 characters of the city name
              </div>
            )}
          </div>
        )
      }
    />
  );
}
