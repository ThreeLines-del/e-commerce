import { useContext } from "react";
import { CartContextObject } from "../CartContextObject";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { SearchContextObject } from "../SearchContextObject";
import Product from "./Product";
import { DarkModeContextObject } from "../DarkModeContextObject";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center border-b border-gray-100 dark:border-gray-600">
      <ul className="flex space-x-6 text-gray-700 dark:text-gray-100 font-semibold">
        <li className="hover:text-blue-300 cursor-pointer transition duration-300">
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li className="hover:text-blue-300 cursor-pointer transition duration-300">
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
  const darkModeContext = useContext(DarkModeContextObject);

  return (
    <header className="">
      <div className="h-14 bg-white dark:bg-gray-800 flex w-full justify-between items-center px-5 border-b border-gray-100 dark:border-gray-600">
        <div className="z-30">
          <h2 className="sm:text-2xl font-bold text-blue-500">lines.store</h2>
        </div>
        <SearchBar />
        {isSearchClicked && (
          <div
            onClick={() => setIsSearchClicked(false)}
            className="fixed inset-0 bg-black dark:bg-white opacity-50 z-10"
          ></div>
        )}
        {isSearchClicked ? (
          <div className="h-auto w-[300px] sm:w-[600px] md:w-[800px] xl:w-[1200px] absolute top-16 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-700 rounded-sm z-20 shadow hover:cursor-pointer">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 m-2 dark:bg-gray-700">
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

        <div className="flex gap-5">
          {darkModeContext.darkMode ? (
            <button
              onClick={() =>
                darkModeContext.setDarkMode(!darkModeContext.darkMode)
              }
              className="flex gap-2 justify-center items-center text-gray-100 text-sm"
            >
              Light Mode
              <span>
                <MdOutlineLightMode className="scale-125 text-gray-100 hover:scale-150 hover:text-blue-400 hover:cursor-pointer transition ease-in-out duration-300" />
              </span>
            </button>
          ) : (
            <button
              onClick={() =>
                darkModeContext.setDarkMode(!darkModeContext.darkMode)
              }
              className="flex gap-2 justify-center items-center text-gray-800 text-sm"
            >
              Dark Mode
              <span>
                <MdDarkMode className="scale-110 text-gray-600 hover:scale-150 hover:text-blue-400 hover:cursor-pointer transition ease-in-out duration-300" />
              </span>
            </button>
          )}

          <div className="flex justify-center items-center hover:cursor-pointer">
            {localStorage.getItem("auth-token") ? (
              <h1
                onClick={() => {
                  localStorage.removeItem("auth-token");
                  window.location.replace("/");
                }}
                className="text-gray-800 hover:text-blue-400 transition duration-300"
              >
                Logout
              </h1>
            ) : (
              <NavLink to={"/signuplogin"}>
                <h1 className="text-gray-800 hover:text-blue-400 transition duration-300">
                  Login
                </h1>
              </NavLink>
            )}
          </div>

          <NavLink
            to={"/cart"}
            className="bg-gray-100 dark:bg-gray-400 flex gap-2 w-15 rounded-sm justify-center py-1 z-30 hover:bg-pink-200 transition duration-300"
          >
            <img className="h-6 hover:animate" src="/svgs/cart.png" alt="" />
            <h1 className="font-medium">{cart.getTotalQuantity()}</h1>
          </NavLink>
        </div>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
