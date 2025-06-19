import { createContext, useContext, useEffect, useState } from "react";
import { ProductContextObject, ProductType } from "./ProductContextObject";

interface SearchContextObjectType {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchResults: ProductType[];
}

interface Children {
  children: React.ReactNode;
}

export const SearchContextObject = createContext<SearchContextObjectType>({
  searchQuery: "",
  setSearchQuery: () => {},
  searchResults: [],
});

function SearchProvider({ children }: Children) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ProductType[]>([]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      fetchSearchResults(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  async function fetchSearchResults(searchQuery: string) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/search?q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {}
  }

  const contextObj = {
    searchQuery,
    setSearchQuery,
    searchResults,
  };

  return (
    <SearchContextObject.Provider value={contextObj}>
      {children}
    </SearchContextObject.Provider>
  );
}

export default SearchProvider;
