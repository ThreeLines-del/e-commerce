import { useContext, useEffect, useState } from "react";
import { CartContextObject } from "../CartContextObject";
import SideCartProduct from "./SideCartProduct";
import { NavLink } from "react-router-dom";

interface SideCartType {
  isSideCartOpen: boolean;
}

const SideCart: React.FC<SideCartType> = ({ isSideCartOpen }) => {
  const cart = useContext(CartContextObject);
  const cartItems = cart.items;
  const [totalCartCost, setTotalCartCost] = useState<string>("0");

  useEffect(() => {
    cart.getTotalCost().then((cost) => setTotalCartCost(cost));
  }, [cart]);

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-32 bg-white border-l border-gray-400 shadow-lg transform transition-transform duration-300 ${
        isSideCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Make this the flex container */}
      <div className="h-full flex flex-col">
        {/* Fixed header */}
        <div className="w-full h-24 flex flex-col justify-center items-center border-b border-gray-400">
          <h1 className="text-sm">Subtotal</h1>
          <h1 className="text-lg font-medium text-red-900">{`$${totalCartCost}`}</h1>
          <button className="border border-gray-400 rounded-2xl text-xs px-7 py-[2px] mt-2 hover:cursor-pointer hover:bg-gray-100">
            <NavLink to={"/cart"}>Go to cart</NavLink>
          </button>
        </div>

        {/* Scrollable content that fills the remaining height */}
        <div id="custom-scrollbar" className="flex-1 overflow-y-auto">
          {cartItems?.reverse().map((item) => (
            <SideCartProduct item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideCart;
