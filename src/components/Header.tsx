import { useContext } from "react";
import { CartContextObject } from "../CartContextObject";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { SearchContextObject } from "../SearchContextObject";
import Product from "./Product";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-4 py-3 flex items-center">
      <ul className="flex space-x-6 text-gray-700">
        <li className="hover:text-blue-600 cursor-pointer">
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li className="hover:text-blue-600 cursor-pointer">
          <NavLink to={"/categories"}>Categories</NavLink>
        </li>
      </ul>
    </nav>
  );
};

const Header = () => {
  const cart = useContext(CartContextObject);
  const searchContext = useContext(SearchContextObject);
  const searchProducts = searchContext.filteredProducts;
  const isSearchClicked = searchContext.isSearchClicked;
  const setIsSearchClicked = searchContext.setIsSearchClicked;

  return (
    <header className="">
      <div className="bg-blue-400 h-14 flex w-full justify-between items-center px-5">
        <div className="z-30">
          <h2 className="sm:text-2xl font-bold text-white">lines.store</h2>
        </div>
        <SearchBar />
        {isSearchClicked && (
          <div
            onClick={() => setIsSearchClicked(false)}
            className="fixed inset-0 bg-black opacity-50 z-10"
          ></div>
        )}
        {isSearchClicked ? (
          <div className="h-auto w-[300px] sm:w-[500px] md:w-[700px] xl:w-[1000px] absolute top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-sm z-20 shadow hover:cursor-pointer">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 m-2">
              {searchProducts === null ? (
                <></>
              ) : searchProducts.length === 0 ? (
                "No results found"
              ) : (
                searchProducts.map((product) => {
                  return <Product product={product} key={product.id} />;
                })
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
        <NavLink
          to={"/cart"}
          className="bg-amber-300 flex gap-2 w-15 rounded-sm justify-center py-2 z-30 hover:bg-amber-400"
        >
          <img className="h-6 hover:animate" src="/svgs/cart.png" alt="" />
          <h1 className="font-medium">{cart.getTotalQuantity()}</h1>
        </NavLink>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
