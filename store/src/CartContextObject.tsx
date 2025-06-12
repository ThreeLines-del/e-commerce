import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

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
  new_price: number;
  quantity: number;
}

interface CartContextObjectType {
  items: CartItemType[] | null;
  addOneToCart: (cartItem: CartItemType) => void;
  removeOneFromCart: (id: number) => void;
  deleteFromCart: (id: string) => void;
  getTotalQuantity: () => number;
  getTotalCost: () => number;
}

export const CartContextObject = createContext<CartContextObjectType>({
  items: [],
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalQuantity: () => 0,
  getTotalCost: () => 0,
});

export function CartProvider({ children }: Children) {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    async function getAllCartItems() {
      const token = localStorage.getItem("auth-token");

      if (!token) {
        console.log("No token found");
      } else {
        const decoded = jwtDecode<{ user: { id: string } }>(token);

        const userId = decoded.user.id;

        const response = await fetch(
          `http://localhost:3000/api/cart/${userId}`
        );

        if (!response.ok) {
          console.log("Error response");
        }

        const responseData = await response.json();

        setCartItems(responseData.cart.items);
      }
    }

    getAllCartItems();
  }, [cartItems]);

  async function addOneToCart(cartItem: CartItemType) {
    const token = localStorage.getItem("auth-token");

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

        const responseData = await response.json();

        if (responseData.success) {
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

  async function removeOneFromCart(id: number) {}

  async function deleteFromCart(id: string) {
    const token = localStorage.getItem("auth-token");

    if (!token) {
      console.log("No token found");
    } else {
      const decoded = jwtDecode<{ user: { id: string } }>(token);

      const userId = decoded.user.id;

      try {
        const response = await fetch("http://localhost:3000/api/cart/remove", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ userId: userId, productId: id }),
        });

        const responseData = await response.json();

        setCartItems(responseData.cart.items);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("Unkwon error occurred");
        }
      }
    }
  }

  function getTotalCost(): number {
    const subTotalCost = cartItems.reduce((total, item) => {
      return total + item.new_price * item.quantity;
    }, 0);

    return Number(subTotalCost.toFixed(2));
  }

  function getTotalQuantity(): number {
    return cartItems.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
  }

  const contextValue = {
    items: cartItems,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalQuantity,
    getTotalCost,
  };
  return (
    <CartContextObject.Provider value={contextValue}>
      {children}
    </CartContextObject.Provider>
  );
}

export default CartProvider;
