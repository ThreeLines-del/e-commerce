import { createContext, useEffect, useState } from "react";

interface Children {
  children: React.ReactNode;
}

export interface ProductType {
  name: string;
  image: string;
  category: string;
  new_price: number;
  old_price: number;
}

interface ProductContextObjectType {
  allProducts: ProductType[] | undefined;
  addProduct: (productDetails: ProductType, image: File | undefined) => void;
}

export const ProductContextObject = createContext<ProductContextObjectType>({
  allProducts: [],
  addProduct: () => {},
});

function ProductProvider({ children }: Children) {
  const [allProducts, setAllProducts] = useState<ProductType[]>();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/allproducts");

        if (!response) {
          console.log("Error response");
        }

        const data: ProductType[] = await response.json();

        setAllProducts(data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("Unknown error occured");
        }
      }
    };

    getAllProducts();
  }, []);

  async function addProduct(
    productDetails: ProductType,
    image: File | undefined
  ) {
    let formData = new FormData();

    if (image) {
      formData.append("product", image);
    }

    try {
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        productDetails.image = data.image_url;

        try {
          const response = await fetch("http://localhost:3000/api/addproduct", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productDetails),
          });

          const data = await response.json();

          if (data.success) {
            alert("Product Added");
          } else {
            alert("Failed");
          }
        } catch (error) {
          if (error instanceof Error) {
            console.log(error.message);
          } else {
            console.log("Unknown error occured");
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Unknown error occured");
      }
    }
  }

  const contextObj = {
    allProducts: allProducts,
    addProduct: addProduct,
  };

  return (
    <ProductContextObject.Provider value={contextObj}>
      {children}
    </ProductContextObject.Provider>
  );
}

export default ProductProvider;
