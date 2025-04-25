import { useEffect, useState } from "react";
import { CartProductType, getProductDataById } from "../CartContextObject";
import { ProductType } from "../ProductContextObject";

interface CartProduct {
  item: CartProductType;
}

const CartProduct: React.FC<CartProduct> = ({ item }) => {
  const [products, setProducts] = useState<ProductType>();

  useEffect(() => {
    getProductDataById(item.id).then((product) => setProducts(product));
  }, [item.id]);
  return (
    <div className="h-48 grid grid-cols-5 border-b border-gray-300 gap-5">
      <div className="flex items-center justify-center">
        <img className="h-40 w-40" src={products?.image} alt="" />
      </div>
      <div className="col-span-3 py-5 flex flex-col pl-2">
        <h1 className="line-clamp-2 text-lg">{products?.title}</h1>

        <div className="flex justify-between w-24 border-2 border-amber-300 rounded-2xl text-xs py-[5px] px-2 mt-6 font-bold">
          <h1 className="hover:cursor-pointer pr-2">+</h1>
          <h1>{item.quantity}</h1>
          <h1 className="hover:cursor-pointer pl-2">-</h1>
        </div>

        <div className="w-32">
          <h1 className="mt-2 text-blue-500 hover:cursor-pointer hover:text-red-500">
            remove from cart
          </h1>
        </div>
      </div>
      <div className="flex justify-end py-5">
        <h1 className="text-lg font-medium">${products?.price}</h1>
      </div>
    </div>
  );
};

export default CartProduct;
