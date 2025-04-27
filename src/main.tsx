import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartProvider } from "./CartContextObject.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartPage from "./pages/CartPage.tsx";
import Categories from "./pages/Categories.tsx";
import SideCartContextProvider from "./SideCartContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error</div>,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SideCartContextProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </SideCartContextProvider>
  </StrictMode>
);
