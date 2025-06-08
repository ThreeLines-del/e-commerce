import { useContext } from "react";
import { ProductContextObject } from "../contexts/ProductContextObject";

const ProductListComponent = () => {
  const productContext = useContext(ProductContextObject);
  const allProducts = productContext.allProducts;
  return (
    <div>
      hi
      {allProducts?.map((product, index) => {
        return <h1 key={index}>{product.name}</h1>;
      })}
    </div>
  );
};

export default ProductListComponent;
