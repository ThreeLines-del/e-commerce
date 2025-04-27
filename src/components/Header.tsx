import { useContext } from "react";
import { CartContextObject } from "../CartContextObject";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-4 py-3 flex items-center">
      {/* Desktop menu */}
      <ul className="flex space-x-6 text-gray-700">
        <li className="hover:text-blue-600 cursor-pointer">All</li>
        <li className="cursor-pointer">
          <div className="relative inline-block text-left">
            <button className="">Categories</button>
          </div>
        </li>
        <li className="hover:text-blue-600 cursor-pointer">Today's Deal</li>
        <li className="hover:text-blue-600 cursor-pointer">Sell</li>
      </ul>
    </nav>
  );
};

const Header = () => {
  const cart = useContext(CartContextObject);

  return (
    <header className="">
      <div className="bg-blue-300 h-14 flex w-full justify-between items-center px-5">
        <div className="">
          <h2 className="text-xl font-bold text-gray-800">lines.store</h2>
        </div>
        <div>
          <input
            className="border rounded-sm p-2 bg-amber-50"
            type="text"
            placeholder="search"
          />
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
