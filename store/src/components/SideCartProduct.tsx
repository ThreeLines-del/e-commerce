import { useContext, useEffect, useState } from "react";
import { CartContextObject, CartProductType } from "../CartContextObject";
import { ProductType } from "../ProductContextObject";

interface SideCartProductType {
  item: CartProductType;
}

const SideCartProduct: React.FC<SideCartProductType> = ({ item }) => {
  const [cartProductData, setCartProductData] = useState<ProductType>({
    id: 0,
    _id: "",
    name: "",
    new_price: 0,
    description: "",
    category: "",
    image: "",
    old_price: 0,
  });

  const cart = useContext(CartContextObject);

  useEffect(() => {}, [item.id]);

  return (
    <div className="border-b border-gray-400 dark:border-gray-600 h-56 flex flex-col justify-center items-center py-5 px-2">
      <img
        className="h-28 w-24 dark:brightness-90 dark:rounded-md"
        src={cartProductData.image}
        alt=""
      />
      <h1 className="text-sm font-medium dark:text-gray-100">{`$price`}</h1>
      <div className="flex justify-between w-24 border-2 border-amber-300 dark:border-0 rounded-2xl text-xs dark:text-gray-100 py-[5px] px-2 mt-2 font-bold dark:bg-gray-600">
        <h1 className="hover:cursor-pointer pr-2">+</h1>
        <h1>{item.quantity}</h1>
        <h1
          className="hover:cursor-pointer pl-2"
          onClick={() => cart.removeOneFromCart(item.id)}
        >
          -
        </h1>
      </div>
    </div>
  );
};

export default SideCartProduct;
