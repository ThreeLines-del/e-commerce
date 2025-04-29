import { useContext } from "react";
import { CartContextObject } from "../CartContextObject";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-4 py-3 flex items-center">
      {/* Desktop menu */}
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

  return (
    <header className="">
      <div className="bg-blue-400 h-14 flex w-full justify-between items-center px-5">
        <div className="">
          <h2 className="text-2xl font-bold text-white">lines.store</h2>
        </div>
        <div className="w-96 flex justify-between">
          <input
            className="w-[330px] p-2 bg-amber-50 rounded-l-sm"
            type="text"
            placeholder="search"
          />
          <div className="flex-1 flex justify-center items-center bg-amber-300 rounded-r-sm hover:bg-amber-400 hover:cursor-pointer">
            <img className="h-7" src="/svgs/search.png" alt="" />
          </div>
        </div>
        <NavLink
          to={"/cart"}
          className="bg-amber-300 flex gap-2 w-15 rounded-sm justify-center py-2"
        >
          <img className="h-6" src="/svgs/cart.png" alt="" />
          <h1 className="font-medium">{cart.getTotalQuantity()}</h1>
        </NavLink>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
