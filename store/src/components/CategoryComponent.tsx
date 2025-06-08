import React, { useContext } from "react";
import { ProductContextObject } from "../ProductContextObject";
import Product from "./Product";

interface CategoryComponentType {
  categoryStringState: string;
}

const CategoryComponent: React.FC<CategoryComponentType> = ({
  categoryStringState,
}) => {
  const productsByCategory = useContext(ProductContextObject);
  const products =
    productsByCategory.getProductsByCategory(categoryStringState);

  return (
    <>
      {products.map((product, index) => {
        return <Product key={index} product={product} />;
      })}
    </>
  );
};

export default CategoryComponent;
