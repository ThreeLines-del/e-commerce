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
    <div className="h-screen w-full flex flex-col overflow-x-hidden bg-gray-100">
      <Header />

      <div className="flex-1 w-full">
        <div className="bg-white h-auto mx-4 sm:mx-20 my-5 p-5">
          <div className="w-full h-20 items-center flex justify-between border-b border-gray-300">
            <h1 className="text-3xl">Shopping Cart</h1>
            <h1 className="mt-12 text-gray-700">Price</h1>
          </div>
          <div className="">
            {cartItems?.map((item) => {
              return <CartProduct item={item} key={item.id} />;
            })}
          </div>
          <div className="w-full h-20 items-center flex justify-end">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl">
                {`Subtotal (${cart.getTotalQuantity()}): `}
                <span className="text-lg font-medium">{`$${totalCost}`}</span>
              </h1>
              <button className="bg-amber-300 rounded-2xl py-1 text-sm hover:cursor-pointer hover:bg-amber-400">
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
