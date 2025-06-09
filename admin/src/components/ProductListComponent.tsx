import { useContext } from "react";
import { ProductContextObject } from "../contexts/ProductContextObject";
import TableItem from "./TableItem";

const ProductListComponent = () => {
  const productContext = useContext(ProductContextObject);
  const allProducts = productContext.allProducts;
  return (
    <div className="h-full px-5 overflow-y-auto">
      <div className="grid grid-cols-8 h-20 items-center text-gray-800 font-semibold text-sm border-b border-gray-200">
        <p className="px-2">Product</p>
        <p className="px-2 col-span-3">Title</p>
        <p className="px-2">Old Price</p>
        <p className="px-2">New Price</p>
        <p className="px-2">Category</p>
        <p className="px-2">Remove</p>
      </div>

      <div className="h-auto mb-10">
        {allProducts?.map((product, index) => {
          return <TableItem key={index} product={product} />;
        })}
      </div>
    </div>
  );
};

export default ProductListComponent;
