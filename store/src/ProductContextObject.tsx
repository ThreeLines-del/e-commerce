import { createContext, useEffect, useState } from "react";

export interface ProductType {
  id: number;
  _id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  new_price: number;
  old_price: number;
}

interface Children {
  children: React.ReactNode;
}

interface ProductContextObjectType {
  productItems: ProductType[];
  getProductById: (id: string) => Promise<ProductType>;
  getProductsByCategory: (selectedCats: string[]) => Promise<ProductType[]>;
}

export const ProductContextObject = createContext<ProductContextObjectType>({
  productItems: [],
  getProductById: async () => {
    return Promise.reject(new Error("No default implementation"));
  },
  getProductsByCategory: async () => {
    return Promise.reject(new Error("No default implementation"));
  },
});

export function ProductProvider({ children }: Children) {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    function getAllProducts() {
      fetch("http://localhost:3000/api/allproducts")
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => {
          console.error(error);
        });
    }

    getAllProducts();
  }, []);

  async function getProductById(id: String): Promise<ProductType> {
    const response = await fetch(`http://localhost:3000/api/product/${id}`);

    if (!response.ok) {
      console.log("Error response");
    }

    const data: ProductType = await response.json();

    return data;
  }

  async function getProductsByCategory(
    selectedCats: string[]
  ): Promise<ProductType[]> {
    const categoryParam = selectedCats.join(",");

    const response = await fetch(
      `http://localhost:3000/api/products?categories=${categoryParam}`
    );

    const data: ProductType[] = await response.json();

    return data;
  }

  const contextValue = {
    productItems: products,
    getProductById: getProductById,
    getProductsByCategory,
  };
  return (
    <ProductContextObject.Provider value={contextValue}>
      {children}
    </ProductContextObject.Provider>
  );
}

export default ProductProvider;
