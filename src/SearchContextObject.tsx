import { createContext, useContext, useEffect, useState } from "react";
import { ProductContextObject, ProductType } from "./ProductContextObject";

interface SearchContextObjectType {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredProducts: ProductType[] | null;
  isSearchClicked: boolean;
  setIsSearchClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Children {
  children: React.ReactNode;
}

export const SearchContextObject = createContext<SearchContextObjectType>({
  searchQuery: "",
  setSearchQuery: () => {},
  filteredProducts: [],
  isSearchClicked: false,
  setIsSearchClicked: () => {},
});

function SearchProvider({ children }: Children) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);
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
    isSearchClicked: isSearchClicked,
    setIsSearchClicked: setIsSearchClicked,
  };

  return (
    <SearchContextObject.Provider value={contextObj}>
      {children}
    </SearchContextObject.Provider>
  );
}

export default SearchProvider;
