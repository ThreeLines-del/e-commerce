import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddProductComponent from "./components/AddProductComponent.tsx";
import ProductListComponent from "./components/ProductListComponent.tsx";
import ProductProvider from "./contexts/ProductContextObject.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Error</h1>,
    children: [
      {
        path: "/addProduct",
        element: <AddProductComponent />,
      },
      {
        path: "/productList",
        element: <ProductListComponent />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
  </StrictMode>
);
