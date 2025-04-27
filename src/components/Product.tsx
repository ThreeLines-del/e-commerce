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

  return (
    <div className=" border-[1px] py-5 hover:border-gray-300 border-gray-200 hover:cursor-pointer hover:shadow-lg rounded-sm h-auto flex flex-col gap-2 justify-center items-center">
      <img className="h-48 w-48 object-fill " src={product.image} alt="" />
      <div className="w-full px-5">
        <h1 className="">{product.title}</h1>
        {/* <p className="text-2xl font-semibold">{`$${product.price}`}</p> */}
        <h1 className="text-2xl font-medium text-red-900">
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
      {quantity > 0 ? (
        <div className="w-full flex justify-between p-5">
          <h1>In Cart {`(${quantity})`}</h1>
          <div className="flex gap-2 text-white">
            <button
              onClick={() => cart.addOneToCart(product.id)}
              className="bg-blue-500  hover:bg-blue-600 hover:cursor-pointer w-8 rounded-sm"
            >
              +
            </button>
            <button
              onClick={() => cart.removeOneFromCart(product.id)}
              className=" bg-blue-500  hover:bg-blue-600 hover:cursor-pointer w-8 rounded-sm"
            >
              -
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            cart.addOneToCart(product.id);
            sideCartState.setIsSideCartOpen(true);
          }}
          className="bg-blue-500 text-white hover:bg-blue-600 hover:cursor-pointer rounded-4xl py-2 px-3"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default Product;
