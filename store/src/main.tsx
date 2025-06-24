import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartProvider } from "./CartContextObject.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartPage from "./pages/CartPage.tsx";
import CategoriesPage from "./pages/CategoriesPage.tsx";
import SideCartContextProvider from "./SideCartContext.tsx";
import ProductProvider from "./ProductContextObject.tsx";
import SearchProvider from "./SearchContextObject.tsx";
import DarkModeProvider from "./DarkModeContextObject.tsx";
import SignupLoginPage from "./pages/SignUpLoginPage.tsx";
import SignUpLoginProvider from "./SignUpLoginContextObject.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import AllProductsPage from "./pages/AllProductsPage.tsx";

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
    path: "/allproducts",
    element: <AllProductsPage />,
  },
  {
    path: "/categories",
    element: <CategoriesPage />,
  },
  {
    path: "/signuplogin",
    element: <SignupLoginPage />,
  },
  {
    path: "/product/:id",
    element: <ProductPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkModeProvider>
      <SignUpLoginProvider>
        <SideCartContextProvider>
          <CartProvider>
            <ProductProvider>
              <SearchProvider>
                <RouterProvider router={router} />
              </SearchProvider>
            </ProductProvider>
          </CartProvider>
        </SideCartContextProvider>
      </SignUpLoginProvider>
    </DarkModeProvider>
  </StrictMode>
);
