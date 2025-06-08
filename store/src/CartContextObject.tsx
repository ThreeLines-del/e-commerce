import { createContext, useEffect, useState } from "react";
import { ProductType } from "./ProductContextObject";

interface Children {
  children: React.ReactNode;
}

export interface CartProductType {
  id: number;
  quantity: number;
}

export interface CartItemType {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextObjectType {
  items: CartProductType[] | null;
  getProductQuantity: (id: number) => number;
  addOneToCart: (cartItem: CartItemType) => void;
  removeOneFromCart: (id: number) => void;
  deleteFromCart: (id: number) => void;
  getTotalCost: () => Promise<string>;
  getTotalQuantity: () => number;
}

export const CartContextObject = createContext<CartContextObjectType>({
  items: [],
  getProductQuantity: () => 0,
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => Promise.resolve(""),
  getTotalQuantity: () => 0,
});

export async function getProductDataById(id: number): Promise<ProductType> {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!response.ok) {
    throw new Error("Error response");
  }

  const productData: ProductType = await response.json();

  return productData;
}

export function CartProvider({ children }: Children) {
  const [cartProducts, setCartProducts] = useState<CartProductType[]>(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartProducts));
  }, [cartProducts]);

  function getProductQuantity(id: number): number {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;

    if (quantity == undefined) {
      return 0;
    }

    return quantity;
  }

  async function addOneToCart(cartItem: CartItemType) {
    // const quantity = getProductQuantity(id);

    // if (quantity === 0) {
    //   setCartProducts([
    //     {
    //       id: id,
    //       quantity: 1,
    //     },
    //     ...cartProducts,
    //   ]);
    // } else {
    //   setCartProducts(
    //     cartProducts.map((product) => {
    //       return product.id == id
    //         ? { ...product, quantity: product.quantity + 1 }
    //         : product;
    //     })
    //   );
    // }

    const token = localStorage.getItem("auth-token");
    console.log(cartItem);

    if (!token) {
      alert("No token found");
    } else {
      try {
        const response = await fetch("http://localhost:3000/api/cart/add", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product: cartItem }),
        });

        const data = await response.json();

        if (data.success) {
          alert("Added to cart");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("Unkwon error occurred");
        }
      }
    }
  }

  function removeOneFromCart(id: number) {
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  function deleteFromCart(id: number) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((product) => product.id !== id)
    );
  }

  async function getTotalCost(): Promise<string> {
    let totalCost = 0;

    for (const cartItem of cartProducts) {
      const productData = await getProductDataById(cartItem.id);
      totalCost += productData.price * cartItem.quantity;
    }

    return totalCost.toFixed(2);
  }

  function getTotalQuantity(): number {
    return cartProducts.reduce((sum, product) => sum + product.quantity, 0);
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
    getTotalQuantity,
  };
  return (
    <CartContextObject.Provider value={contextValue}>
      {children}
    </CartContextObject.Provider>
  );
}

export default CartProvider;
