import { useContext } from "react";
import { CartContextObject } from "../CartContextObject";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { DarkModeContextObject } from "../DarkModeContextObject";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
  const cart = useContext(CartContextObject);

  return (
    <nav className="bg-white h-16 dark:bg-gray-800 px-5 py-3 flex items-center justify-between border-b border-gray-100 dark:border-gray-600">
      <ul className="flex space-x-6 text-gray-700 dark:text-gray-100 font-semibold">
        <li className="cursor-pointer transition duration-300">
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/allproducts"}>Products</NavLink>
        </li>
        <li className="cursor-pointer transition duration-300">
          <NavLink to={"/categories"}>Categories</NavLink>
        </li>
      </ul>

      <div className="flex">
        <SearchBar />

        <NavLink
          to={"/cart"}
          className="flex gap-2 justify-center items-center pl-5"
        >
          <IoCartOutline className="scale-150 text-gray-400" />
          <h1 className="font-medium">{cart.getTotalCartItemNumber()}</h1>
        </NavLink>
      </div>
    </nav>
  );
};

const Header = () => {
  const darkModeContext = useContext(DarkModeContextObject);

  return (
    <header className="">
      <div className="h-10 bg-gray-50 dark:bg-gray-800 flex w-full justify-between items-center px-5 border-b border-gray-100 dark:border-gray-600">
        <div className="z-30">
          <h2 className="sm:text-2xl font-bold text-[#4f39f6]">lines.store</h2>
        </div>

        <h1 className="font-semibold text-gray-800">
          Get free deliveries on offers over $100
        </h1>

        <div className="flex gap-5">
          {darkModeContext.darkMode ? (
            <button
              onClick={() =>
                darkModeContext.setDarkMode(!darkModeContext.darkMode)
              }
              className="flex gap-2 justify-center items-center  text-gray-100 text-sm"
            >
              <span>
                <MdDarkMode className="scale-110 text-gray-100 hover:scale-150 hover:text-blue-400 hover:cursor-pointer transition ease-in-out duration-300" />
              </span>
            </button>
          ) : (
            <button
              onClick={() =>
                darkModeContext.setDarkMode(!darkModeContext.darkMode)
              }
              className="flex gap-2 justify-center items-center text-gray-400 text-sm"
            >
              <span>
                <MdOutlineLightMode className="scale-125  text-gray-600 hover:scale-150 hover:text-blue-400 hover:cursor-pointer transition ease-in-out duration-300" />
              </span>
            </button>
          )}

          <div className="flex justify-center items-center hover:cursor-pointer font-semibold">
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
                  Sign in
                </h1>
              </NavLink>
            )}
          </div>
        </div>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
