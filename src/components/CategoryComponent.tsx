import React, { useContext } from "react";
import { ProductContextObject } from "../ProductContextObject";
import Product from "./Product";

interface CategoryComponentType {
  categoryState: string;
  setIsSideCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryComponent: React.FC<CategoryComponentType> = ({
  categoryState,
  setIsSideCartOpen,
}) => {
  const productsByCategory = useContext(ProductContextObject);
  const products = productsByCategory.getProductsByCategory(categoryState);

  return (
    <>
      {products.map((product, index) => {
        return (
          <Product
            setIsSideCartOpen={setIsSideCartOpen}
            key={index}
            product={product}
          />
        );
      })}
    </>
  );
};

export default CategoryComponent;
