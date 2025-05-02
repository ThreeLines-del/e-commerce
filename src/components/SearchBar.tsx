import { useContext } from "react";
import { SearchContextObject } from "../SearchContextObject";

interface SearchBarType {
  setIsSearchClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: React.FC<SearchBarType> = ({ setIsSearchClicked }) => {
  const searchContext = useContext(SearchContextObject);
  const searchQuery = searchContext.searchQuery;
  const setSearchQuery = searchContext.setSearchQuery;

  return (
    <div className="w-96 flex justify-between z-30">
      <input
        className="w-[330px] p-2 bg-amber-50 rounded-sm"
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
