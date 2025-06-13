import { ProductType } from "../ProductContextObject";
import { NavLink } from "react-router-dom";

interface CategoryProductType {
  product: ProductType;
}
const CategoryProduct: React.FC<CategoryProductType> = ({ product }) => {
  return (
    <div className="border border-gray-100 dark:border-gray-600 h-auto flex flex-col gap-3 justify-center items-center pt-2 pb-2">
      <NavLink to={`/product/${product._id}`}>
        <div className="bg-gray-100 dark:bg-gray-200 h-60 w-64 flex justify-center items-center rounded-md hover:cursor-pointer hover:brightness-95 relative">
          <img
            className="h-36 w-36 object-fill brightness-95 dark:brightness-90"
            src={product.image}
            alt=""
          />

          <div className="bg-white absolute top-0 left-0 m-2 py-1 px-2 rounded-sm font-semibold">
            <h1 className="text-sm dark:text-gray-100">
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
      </NavLink>

      <div className="flex w-full justify-center items-center">
        <div className="w-full flex justify-center items-center px-10 dark:text-gray-100">
          <h1 className="truncate">{product.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
