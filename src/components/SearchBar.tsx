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
        className="p-2 w-full bg-amber-50 rounded-sm"
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
