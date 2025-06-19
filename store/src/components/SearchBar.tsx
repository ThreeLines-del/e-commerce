import { useContext } from "react";
import { SearchContextObject } from "../SearchContextObject";

const SearchBar = () => {
  const searchContext = useContext(SearchContextObject);

  return (
    <div className="relative flex justify-center items-center border-r border-gray-400 pr-5 gap-5">
      <input
        className="border border-gray-300 focus:ring-1 focus:outline-none focus:ring-[#4f39f6] h-8 w-80 rounded-sm px-3 text-sm"
        type="text"
        value={searchContext.searchQuery}
        onChange={(e) => searchContext.setSearchQuery(e.target.value)}
        placeholder="Search"
      />
      {/* <FiSearch className="scale-125 text-gray-400" /> */}
      <div className="absolute bg-white top-0 mt-9 rounded-sm w-80 z-50 overflow-hidden">
        {searchContext.searchResults.map((product) => {
          return (
            <div className="px-3 py-2 text-sm hover:bg-gray-50 hover:cursor-pointer">
              <h1>{product.name}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchBar;
