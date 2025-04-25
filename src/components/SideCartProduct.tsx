import { useContext, useEffect, useState } from "react";
import {
  CartContextObject,
  CartProductType,
  getProductDataById,
} from "../CartContextObject";
import { ProductType } from "../ProductContextObject";

interface SideCartProductType {
  item: CartProductType;
}

const SideCartProduct: React.FC<SideCartProductType> = ({ item }) => {
  const [cartProductData, setCartProductData] = useState<ProductType>();
  const cart = useContext(CartContextObject);

  useEffect(() => {
    getProductDataById(item.id).then((data) => {
      if (data) {
        return setCartProductData(data);
      }
    });
  }, []);

  return (
    <div className="border-b border-gray-400 h-56 flex flex-col justify-center items-center py-5 px-2">
      <img className="h-28 w-24" src={cartProductData?.image} alt="" />
      <h1 className="text-sm font-medium">{`$${cartProductData?.price}`}</h1>
      <div className="flex justify-between w-24 border-2 border-amber-300 rounded-2xl text-xs py-[5px] px-2 mt-2 font-bold">
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
    </div>
  );
};

export default SideCartProduct;
