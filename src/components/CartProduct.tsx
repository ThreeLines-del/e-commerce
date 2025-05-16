import { useContext, useEffect, useState } from "react";
import {
  CartContextObject,
  CartProductType,
  getProductDataById,
} from "../CartContextObject";
import { ProductType } from "../ProductContextObject";

interface CartProduct {
  item: CartProductType;
}

const CartProduct: React.FC<CartProduct> = ({ item }) => {
  const [products, setProducts] = useState<ProductType>();
  const cart = useContext(CartContextObject);

  useEffect(() => {
    getProductDataById(item.id).then((product) => setProducts(product));
  }, [item.id]);
  return (
    <div className="h-48 grid grid-cols-5 border-b border-gray-300 dark:border-gray-600">
      <div className="flex items-center justify-center">
        <div className="bg-gray-100 h-40 w-40 flex justify-center items-center rounded-md">
          <img
            className="h-28 w-28 brightness-95"
            src={products?.image}
            alt=""
          />
        </div>
      </div>
      <div className="col-span-3 py-5 flex flex-col pl-5">
        <h1 className="line-clamp-2 text-lg dark:text-gray-100">
          {products?.title}
        </h1>

        <div className="flex justify-between w-24 border-2 border-amber-300 dark:border-0 dark:bg-gray-600 dark:text-gray-100 rounded-2xl text-xs py-[5px] px-2 mt-6 font-bold">
          <h1
            className="hover:cursor-pointer pr-2"
            onClick={() => cart.addOneToCart(item.id)}
          >
            +
          </h1>
          <h1>{item.quantity}</h1>
          <h1
            className="hover:cursor-pointer pl-2"
            onClick={() => cart.removeOneFromCart(item.id)}
          >
            -
          </h1>
        </div>

        <div className="w-14 flex items-center justify-center">
          <h1
            className="mt-2 text-blue-500 hover:cursor-pointer hover:text-red-500 transition duration-300"
            onClick={() => cart.deleteFromCart(item.id)}
          >
            remove
          </h1>
        </div>
      </div>
      <div className="flex justify-end py-5">
        <h1 className="text-lg font-medium dark:text-gray-100">
          ${products?.price}
        </h1>
      </div>
    </div>
  );
};

export default CartProduct;
