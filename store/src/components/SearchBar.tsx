import { useContext } from "react";
import { SearchContextObject } from "../SearchContextObject";

const SearchBar = () => {
  const searchContext = useContext(SearchContextObject);
  const searchQuery = searchContext.searchQuery;
  const setSearchQuery = searchContext.setSearchQuery;
  const setIsSearchClicked = searchContext.setIsSearchClicked;

  return (
    <div className="w-40 sm:w-98 flex justify-between z-30">
      <input
        className="p-2 w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-100 rounded-sm border-gray-200 dark:border-gray-800 border"
        type="text"
        placeholder="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClick={() => setIsSearchClicked(true)}
      />
    </div>
  );
};

export default SearchBar;
