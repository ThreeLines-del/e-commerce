import { useContext } from "react";
import Header from "../components/Header";
import { CartContextObject } from "../CartContextObject";
import CartProduct from "../components/CartProduct";

const CartPage = () => {
  const cart = useContext(CartContextObject);
  const cartItems = cart.items;

  return (
    <div className="h-screen w-full flex flex-col overflow-x-hidden">
      <Header />

      <div className="flex-1 w-full dark:bg-gray-800 sm:px-20 md:px-30 lg:px-40">
        <div className="bg-white dark:bg-gray-700 h-auto p-10">
          <div className="w-full h-16 items-center flex justify-between border-b border-gray-300 dark:border-gray-600">
            <h1 className="text-3xl dark:text-gray-100">Shopping Cart</h1>
            <h1 className="mt-10 text-gray-700 dark:text-gray-100">Price</h1>
          </div>
          <div className="">
            {cartItems?.map((item) => {
              return <CartProduct item={item} key={item.productId} />;
            })}
          </div>

          <div className="w-full flex flex-col bg-gray-50 rounded-lg px-10 py-5 mt-5 text-gray-800 ">
            <div className="flex w-full justify-between border-b border-gray-300 py-4">
              <h1 className="dark:text-gray-100">Subtotal</h1>
              <h1 className="font-semibold">{`$${cart.getTotalCost()}`}</h1>
            </div>
            <div className="flex w-full justify-between border-b border-gray-300 py-4">
              <h1 className="dark:text-gray-100">Shipping</h1>
              <h1 className="font-semibold">$5.00</h1>
            </div>
            <div className="flex w-full justify-between border-b border-gray-300 py-4">
              <h1 className="dark:text-gray-100">Tax</h1>
              <h1 className="font-semibold">$15.00</h1>
            </div>
            <div className="flex w-full justify-between py-4 font-semibold text-lg">
              <h1 className="dark:text-gray-100">Order total</h1>
              <h1 className="">{`$${5 + 15 + cart.getTotalCost()}`}</h1>
            </div>
          </div>

          <div className="w-full flex justify-end">
            <button className="bg-[#4f39f6] mt-5 py-2 px-5 text-white font-semibold dark:bg-blue-500 dark:text-gray-100 rounded-md hover:cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-700 transition duration-300">
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
