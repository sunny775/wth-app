import { Link } from "react-router";
import Spinner from "../loaders/Spinner";
import SearchBar from "./SearchBar";
import Modal from "../Modal";
import { City, LocationSearch } from "../../utils/shared-types";
import { Star } from "lucide-react";
import cn from "../../utils/cn";
import Tooltip from "../Tooltip";

type SearchProps = {
  className?: string;
  closeModal(): void;
  open?: boolean;
  toggleFavorite: (city: City) => void;
  isFavorite: (City: City) => boolean;
};

type ResultListProps = {
  results: LocationSearch["results"];
  toggleFavorite: (city: City) => void;
  isFavorite: (City: City) => boolean;
};

function ResultList({ results, isFavorite, toggleFavorite }: ResultListProps) {
  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 dark:divide-gray-700 space-y-1 p-2"
    >
      {results.map((result) => (
        <li
          key={`${result.lat}${result.lon}`}
          className="flex justify-between gap-x-6 py-5 text-gray-700 dark:text-gray-300"
        >
          <div className="flex gap-x-4 justify-center items-center">
            <Tooltip
              direction="right"
              text={
                isFavorite(result)
                  ? "Remove From Favorites"
                  : "Add To Favorites"
              }
            >
              <Star
                onClick={() => toggleFavorite(result)}
                className={cn(
                  "h-6 w-6 cursor-pointer hover:stroke-orange-500",
                  {
                    "fill-orange-500 stroke-orange-500": isFavorite(result),
                  }
                )}
                strokeWidth={1}
              />
            </Tooltip>

            <div className="flex-auto">
              <p className="text-sm/6 font-semibold">{result.name}</p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">
                {result.country}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <Link
              to={`/${result.lat}/${result.lon}`}
              className="group font-semibold flex items-center justify-between gap-1 w-full text-sky-600"
            >
              <p className="text-sm/6">Details</p>
              <p>
                <span
                  aria-hidden="true"
                  className="block transition-all group-hover:ms-0.5 rtl:rotate-180 "
                >
                  &rarr;
                </span>
              </p>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function SearchModal({
  className,
  closeModal,
  open,
  isFavorite,
  toggleFavorite,
}: SearchProps) {
  return (
    <Modal
      open={open}
      closeModal={closeModal}
      header={
        <div className="flex w-10/12 h-auto py-3 justify-center items-center text-2xl font-bold text-gray-700 dark:text-gray-300">
          Search and add cities to favorites
        </div>
      }
    >
      <SearchBar
        id="CitiesSearchModal"
        isDropdown
        className={cn("overflow-auto", className)}
        renderSearchResults={({
          results,
          query,
          error,
          isLoading,
          showDropdown,
        }) =>
          showDropdown && (
            <div className="w-full pt-2 pb-4 mt-4 rounded-md bg-white border border-gray-100 dark:border-black/5 dark:bg-[rgb(40,40,40)] shadow  backdrop-blur-md transition">
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Spinner className="w-12 h-12" />
                </div>
              ) : error ? (
                <div className="p-4 text-center text-sm text-red-600">
                  {error.message || "Error fetching results."}
                </div>
              ) : results?.length ? (
                <ResultList
                  results={results}
                  isFavorite={isFavorite}
                  toggleFavorite={toggleFavorite}
                />
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
    </Modal>
  );
}
