import { useContext } from "react";
import { CartContextObject } from "../CartContextObject";
import SideCartProduct from "./SideCartProduct";
import { NavLink } from "react-router-dom";
import { SideCartContextObject } from "../SideCartContext";

const SideCart = () => {
  const cart = useContext(CartContextObject);
  const cartItems = cart.items;
  const isSideCartOpen = useContext(SideCartContextObject).isSideCartOpen;

  const reversedCartItems = [...(cartItems ?? [])].reverse();

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-32 bg-white dark:bg-gray-700 border-l border-gray-200 dark:border-gray-600 shadow-lg transform transition-transform duration-300 ${
        isSideCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/*Make this the flex container*/}
      <div className="h-full flex flex-col">
        {/* Fixed header */}
        <div className="w-full h-24 flex flex-col justify-center items-center border-b border-gray-200 dark:border-gray-600">
          <h1 className="text-sm dark:text-gray-100">Subtotal</h1>
          <h1 className="text-lg font-bold text-red-900 dark:text-blue-400">{`$${cart.getTotalCost()}`}</h1>
          <button className="border border-gray-300 dark:border-0 rounded-2xl text-xs px-7 py-[2px] mt-2 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-blue-900 dark:text-gray-100 dark:bg-gray-800">
            <NavLink to={"/cart"}>Go to cart</NavLink>
          </button>
        </div>

        {/* Scrollable content that fills the remaining height */}
        <div id="custom-scrollbar" className="flex-1 overflow-y-auto">
          {reversedCartItems.map((item) => (
            <SideCartProduct item={item} key={item.productId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideCart;
