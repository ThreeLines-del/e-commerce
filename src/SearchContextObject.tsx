import { createContext, useContext, useEffect, useState } from "react";
import { ProductContextObject, ProductType } from "./ProductContextObject";

interface SearchContextObjectType {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredProducts: ProductType[] | null;
}

interface Children {
  children: React.ReactNode;
}

export const SearchContextObject = createContext<SearchContextObjectType>({
  searchQuery: "",
  setSearchQuery: () => {},
  filteredProducts: [],
});

function SearchProvider({ children }: Children) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const products = useContext(ProductContextObject).productItems;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceQuery(searchQuery);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const filteredProducts = debounceQuery
    ? products
        .filter((product) =>
          `${product.title} ${product.category}`
            .toLowerCase()
            .includes(debounceQuery.toLowerCase())
        )
        .sort(
          (a, b) =>
            a.title.toLowerCase().indexOf(debounceQuery) -
            b.title.toLowerCase().indexOf(debounceQuery)
        )
    : null;

  const contextObj = {
    searchQuery: searchQuery,
    setSearchQuery: setSearchQuery,
    filteredProducts: filteredProducts,
  };

  return (
    <SearchContextObject.Provider value={contextObj}>
      {children}
    </SearchContextObject.Provider>
  );
}

export default SearchProvider;
