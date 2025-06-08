import { createContext, useEffect, useState } from "react";

export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface Children {
  children: React.ReactNode;
}

interface ProductContextObjectType {
  productItems: ProductType[];
  getProductsByCategory: (category: string) => ProductType[];
}

export const ProductContextObject = createContext<ProductContextObjectType>({
  productItems: [],
  getProductsByCategory: () => [],
});

export function ProductProvider({ children }: Children) {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    function getAllProducts() {
      fetch("https://fakestoreapi.com/products")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error response");
          }

          return response.json();
        })
        .then((data: ProductType[]) => setProducts(data))
        .catch((error: Error) => {
          console.error(error);
        });
    }

    getAllProducts();
  }, []);

  function getProductsByCategory(category: string): ProductType[] {
    const selectedProducts = products.filter(
      (product) => product.category === category
    );

    return selectedProducts;
  }

  const contextValue = {
    productItems: products,
    getProductsByCategory,
  };
  return (
    <ProductContextObject.Provider value={contextValue}>
      {children}
    </ProductContextObject.Provider>
  );
}

export default ProductProvider;
