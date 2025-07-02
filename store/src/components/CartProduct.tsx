import { useContext, useEffect, useState } from "react";
import { CartContextObject, CartItemType } from "../CartContextObject";
import { ProductContextObject, ProductType } from "../ProductContextObject";
import { IoMdCheckmark } from "react-icons/io";
import { FadeLoader } from "react-spinners";

interface CartProductType {
  item: CartItemType;
}

const CartProduct: React.FC<CartProductType> = ({ item }) => {
  const [product, setProduct] = useState<ProductType>({
    name: "",
    category: "",
    description: "",
    id: 0,
    _id: "",
    image: "",
    new_price: 0,
    old_price: 0,
  });
  const cart = useContext(CartContextObject);
  const productContext = useContext(ProductContextObject);
  const isLoading = product.id === 0;

  useEffect(() => {
    productContext
      .getProductById(item.productId)
      .then((item) => setProduct(item));
  }, []);

  return (
    <div className="h-48 grid grid-cols-5 border-b border-gray-300 dark:border-gray-600">
      <div className="flex items-center justify-center">
        <div className="bg-gray-100 h-32 sm:h-40 w-52 sm:w-60 flex justify-center items-center rounded-md">
          {isLoading ? (
            <FadeLoader color="#99a1af" className="ml-3" />
          ) : (
            <img
              className="h-20 sm:h-28 w-14 sm:w-28 brightness-95"
              src={product?.image}
              alt=""
            />
          )}
        </div>
      </div>

      <div className="col-span-3 py-5 flex flex-col pl-5 relative">
        <h1 className="line-clamp-2 text-lg dark:text-gray-100 text-gray-800">
          {product?.name}
        </h1>

        <p className="text-gray-500">{`Qty ${item.quantity}`}</p>

        <p
          onClick={() => cart.deleteFromCart(item.productId)}
          className="text-[#4f39f6] font-semibold hover:cursor-pointer hover:brightness-125"
        >
          Remove
        </p>

        <div className="mt-2 flex gap-2 items-center absolute bottom-0 mb-4">
          <IoMdCheckmark className="scale-110 text-green-500" />
          <h1 className="">In stock</h1>
        </div>
      </div>

      <div className="flex justify-end py-5">
        <h1 className="text-lg font-medium dark:text-gray-100">
          ${product.new_price}
        </h1>
      </div>
    </div>
  );
};

export default CartProduct;
