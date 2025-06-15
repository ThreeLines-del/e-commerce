import { useContext, useEffect, useState } from "react";
import { CartContextObject, CartItemType } from "../CartContextObject";
import { ProductContextObject, ProductType } from "../ProductContextObject";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

interface SideCartProductType {
  item: CartItemType;
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
  const productContext = useContext(ProductContextObject);

  useEffect(() => {
    productContext
      .getProductById(item.productId)
      .then((product) => setCartProductData(product));
  }, [item]);

  const cart = useContext(CartContextObject);

  return (
    <div className="border-b border-gray-400 dark:border-gray-600 h-56 flex flex-col justify-center items-center py-5 px-2">
      <img
        className="h-28 w-24 dark:brightness-90 dark:rounded-md"
        src={cartProductData.image}
        alt=""
      />
      <h1 className="text-sm font-medium dark:text-gray-100">{`$${cartProductData.new_price}`}</h1>

      <div className="border-2 mt-2 border-amber-200 flex justify-between items-center w-24 rounded-2xl overflow-hidden">
        <div className="p-[5px] text-gray-500 hover:bg-gray-100 hover:cursor-pointer">
          <FaPlus />
        </div>
        <h1 className="leading-0 font-bold">{item.quantity}</h1>
        <div className="p-[5px] text-gray-500 hover:bg-gray-100 hover:cursor-pointer">
          <FaMinus />
        </div>
      </div>
    </div>
  );
};

export default SideCartProduct;
