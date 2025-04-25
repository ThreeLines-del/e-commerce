import { useContext } from "react";
import { ProductContextObject } from "../ProductContextObject";
import Product from "./Product";
import ProductSkeleton from "./ProductSkeleton";

interface ProductComponentType {
  setIsSideCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductComponent: React.FC<ProductComponentType> = ({
  setIsSideCartOpen,
}) => {
  const productItems = useContext(ProductContextObject);
  const products = productItems.productItems;
  const isLoading = !products || products.length === 0;

  return (
    <>
      {isLoading
        ? Array.from({ length: 8 }).map((_, i) => {
            return <ProductSkeleton key={i} />;
          })
        : products.map((product) => {
            return (
              <Product
                key={product.id}
                product={product}
                setIsSideCartOpen={setIsSideCartOpen}
              />
            );
          })}
    </>
  );
};

export default ProductComponent;
