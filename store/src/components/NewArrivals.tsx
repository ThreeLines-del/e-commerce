import { useEffect, useState } from "react";
import { ProductType } from "../ProductContextObject";
import Product from "./Product";
import ProductSkeleton from "./ProductSkeleton";

const NewArrivals = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const isLoading = !products || products.length === 0;

  useEffect(() => {
    fetch("http://localhost:3000/api/new")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, [products]);

  return (
    <div className="h-auto mt-5">
      <div className="flex items-center py-4 px-8">
        <h1 className="text-2xl font-semibold text-gray-800">New Arrivals</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 bg-white dark:bg-gray-700">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => {
              return <ProductSkeleton key={i} />;
            })
          : products.map((product) => {
              return <Product product={product} key={product._id} />;
            })}
      </div>
    </div>
  );
};

export default NewArrivals;
