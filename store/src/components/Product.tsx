import React, { useContext } from "react";
import { ProductType } from "../ProductContextObject";
import { CartContextObject } from "../CartContextObject";
import { SideCartContextObject } from "../SideCartContext";

interface ProductProp {
  product: ProductType;
}

const Product: React.FC<ProductProp> = ({ product }) => {
  const cart = useContext(CartContextObject);
  const quantity = cart.getProductQuantity(product.id);
  const sideCartState = useContext(SideCartContextObject);
  console.log(quantity);

  return (
    <div className="border border-gray-100 dark:border-gray-600 h-auto flex flex-col gap-5 justify-center items-center pt-7 pb-8">
      <div className="bg-gray-100 dark:bg-gray-200 h-60 w-64 flex justify-center items-center rounded-md">
        <img
          className="h-36 w-36 object-fill brightness-95 dark:brightness-90"
          src={product.image}
          alt=""
        />
      </div>

      <div className="flex flex-col gap-3 w-full justify-center items-center">
        <div className="w-full flex justify-center items-center px-10 dark:text-gray-100">
          <h1 className="truncate">{product.title}</h1>
        </div>

        {quantity > 0 ? (
          <div className="w-full flex justify-between px-5 dark:text-gray-100">
            <h1>In Cart {`(${quantity})`}</h1>
            <div className="flex gap-2 text-white">
              <button
                onClick={() =>
                  cart.addOneToCart({
                    productId: product.id.toString(),
                    name: product.title,
                    price: product.price,
                    quantity: 1,
                  })
                }
                className="bg-[#22177A] dark:bg-gray-800 hover:bg-blue-900 hover:cursor-pointer w-8 rounded-full transition duration-300"
              >
                +
              </button>
              <button
                onClick={() => cart.removeOneFromCart(product.id)}
                className=" bg-[#22177A] dark:bg-gray-800 hover:bg-blue-900 hover:cursor-pointer w-8 rounded-full transition duration-300"
              >
                -
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              cart.addOneToCart({
                productId: product.id.toString(),
                name: product.title,
                price: product.price,
                quantity: 1,
              });
              sideCartState.setIsSideCartOpen(true);
            }}
            className="bg-[#22177A] dark:bg-gray-800 text-white text-sm hover:bg-blue-900 hover:cursor-pointer rounded-full py-1 px-5 shadow transition duration-300"
          >
            Add to Cart
          </button>
        )}

        <h1 className="text-xl dark:text-gray-100">
          {`$${product.price.toString()}`.includes(".") ? (
            <>
              ${product.price.toString().split(".")[0]}
              <span className="align-super text-xs ml-[1px]">
                {product.price.toString().split(".")[1]}
              </span>
            </>
          ) : (
            `$${product.price}`
          )}
        </h1>
      </div>
    </div>
  );
};

export default Product;
