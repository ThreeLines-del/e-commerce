import React, { useContext } from "react";
import { ProductType } from "../ProductContextObject";
import { CartContextObject } from "../CartContextObject";
import { SideCartContextObject } from "../SideCartContext";
import { NavLink } from "react-router-dom";

interface ProductProp {
  product: ProductType;
}

const Product: React.FC<ProductProp> = ({ product }) => {
  const cart = useContext(CartContextObject);
  const sideCartState = useContext(SideCartContextObject);

  return (
    <div className="border border-gray-100 dark:border-gray-600 h-auto flex flex-col gap-5 justify-center items-center pt-7 pb-8 ">
      <NavLink to={`/product/${product._id}`}>
        <div className="bg-gray-100 dark:bg-gray-200 h-60 w-64 flex justify-center items-center rounded-md hover:cursor-pointer hover:brightness-95">
          <img
            className="h-36 w-36 object-fill brightness-95 dark:brightness-90"
            src={product.image}
            alt=""
          />
        </div>
      </NavLink>

      <div className="flex flex-col gap-3 w-full justify-center items-center">
        <div className="w-full flex justify-center items-center px-10 dark:text-gray-100">
          <h1 className="truncate">{product.name}</h1>
        </div>

        <button
          onClick={() => {
            cart.addOneToCart({
              productId: product._id,
              name: product.name,
              new_price: product.new_price,
              quantity: 1,
            });
            sideCartState.setIsSideCartOpen(true);
          }}
          className="bg-[#4f39f6] dark:bg-gray-800 text-white text-sm hover:bg-blue-900 hover:cursor-pointer rounded-full py-1 px-5 shadow transition duration-300"
        >
          Add to Cart
        </button>

        <h1 className="text-xl dark:text-gray-100">
          {`$${product.new_price.toString()}`.includes(".") ? (
            <>
              ${product.new_price.toString().split(".")[0]}
              <span className="align-super text-xs ml-[1px]">
                {product.new_price.toString().split(".")[1]}
              </span>
            </>
          ) : (
            `$${product.new_price}`
          )}
        </h1>
      </div>
    </div>
  );
};

export default Product;
