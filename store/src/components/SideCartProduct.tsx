import { useContext, useEffect, useState } from "react";
import { CartContextObject, CartItemType } from "../CartContextObject";
import { ProductContextObject, ProductType } from "../ProductContextObject";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { FadeLoader, MoonLoader } from "react-spinners";

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
  const isLoading =
    !cartProductData ||
    cartProductData === null ||
    cartProductData === undefined ||
    cartProductData.id === 0;

  const cart = useContext(CartContextObject);

  useEffect(() => {
    productContext
      .getProductById(item.productId)
      .then((product) => setCartProductData(product));
  }, [item]);

  return (
    <div className="border-b border-gray-400 dark:border-gray-600 h-56 flex flex-col justify-center items-center py-5 px-2">
      {isLoading ? (
        <div className="h-28 w-24 flex justify-center items-center">
          <FadeLoader color="#99a1af" className="ml-3" />
        </div>
      ) : (
        <img
          className="h-28 w-24 dark:brightness-90 dark:rounded-md"
          src={cartProductData.image}
          alt=""
        />
      )}

      <h1 className="text-sm font-medium dark:text-gray-100">{`$${cartProductData.new_price}`}</h1>

      <div className="border-2 mt-2 border-amber-200 flex justify-between items-center w-24 rounded-2xl overflow-hidden">
        <div
          onClick={() => cart.addOneToQuantity(item.productId)}
          className="p-[5px] text-gray-500 hover:bg-gray-100 hover:cursor-pointer"
        >
          <FaPlus />
        </div>

        {cart.loadingItems[item.productId] ? (
          <MoonLoader size={15} />
        ) : (
          <h1 className="leading-0 font-bold">{item.quantity}</h1>
        )}

        <div
          onClick={() => cart.subtractOneFromQuantity(item.productId)}
          className="p-[5px] text-gray-500 hover:bg-gray-100 hover:cursor-pointer"
        >
          <FaMinus />
        </div>
      </div>
    </div>
  );
};

export default SideCartProduct;
