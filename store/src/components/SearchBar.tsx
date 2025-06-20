import { useContext, useEffect, useRef, useState } from "react";
import { SearchContextObject } from "../SearchContextObject";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const searchContext = useContext(SearchContextObject);
  const [searchBoxOpen, setSearchBoxOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setSearchBoxOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSelectProduct = (productId: string) => {
    // Close dropdown and clear input
    setSearchBoxOpen(false);
    searchContext.setSearchQuery("");

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Navigate programmatically (so all actions happen before route change)
    navigate(`/product/${productId}`);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative flex justify-center items-center border-r border-gray-400 pr-5 gap-5"
    >
      <input
        className="border border-gray-300 focus:ring-1 focus:outline-none focus:ring-[#4f39f6] h-8 w-80 rounded-sm px-3 text-sm"
        type="text"
        value={searchContext.searchQuery}
        onChange={(e) => {
          searchContext.setSearchQuery(e.target.value);
          setSearchBoxOpen(true);
        }}
        placeholder="Search"
      />

      {searchBoxOpen && (
        <div className="absolute bg-white top-0 mt-9 rounded-sm w-80 z-50 overflow-hidden shadow">
          {searchContext.searchResults.map((product) => (
            <div
              key={product._id}
              onClick={() => handleSelectProduct(product._id)}
              className="px-3 py-2 text-sm hover:bg-gray-50 hover:cursor-pointer"
            >
              <h1>{product.name}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
