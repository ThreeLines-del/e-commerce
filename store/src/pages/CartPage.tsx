import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { CartContextObject } from "../CartContextObject";
import CartProduct from "../components/CartProduct";

const CartPage = () => {
  const cart = useContext(CartContextObject);
  const cartItems = cart.items;
  const [totalCost, setTotalCost] = useState<string>("0");

  useEffect(() => {
    cart.getTotalCost().then((cost) => setTotalCost(cost));
  }, [cartItems]);

  return (
    <div className="h-screen w-full flex flex-col overflow-x-hidden">
      <Header />

      <div className="flex-1 w-full bg-gray-100 dark:bg-gray-800">
        <div className="bg-white dark:bg-gray-700 h-auto mx-40 p-10">
          <div className="w-full h-16 items-center flex justify-between border-b border-gray-300 dark:border-gray-600">
            <h1 className="text-3xl dark:text-gray-100">Shopping Cart</h1>
            <h1 className="mt-10 text-gray-700 dark:text-gray-100">Price</h1>
          </div>
          <div className="">
            {cartItems?.map((item) => {
              return <CartProduct item={item} key={item.id} />;
            })}
          </div>
          <div className="w-full h-20 items-center flex justify-end">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl dark:text-gray-100">
                {`Subtotal (${cart.getTotalQuantity()}): `}
                <span className="text-lg font-medium">{`$${totalCost}`}</span>
              </h1>
              <button className="bg-amber-300 dark:bg-blue-500 dark:text-gray-100 rounded-2xl py-1 text-sm hover:cursor-pointer hover:bg-amber-400 dark:hover:bg-blue-700 transition duration-300">
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
