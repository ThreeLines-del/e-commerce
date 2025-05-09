import { useContext } from "react";
import "./App.css";
import Header from "./components/Header";

import ProductComponent from "./components/ProductComponent";
import SideCart from "./components/SideCart";
import { SideCartContextObject } from "./SideCartContext";
import Footer from "./components/Footer";

function App() {
  const sideCartState = useContext(SideCartContextObject);
  const isSideCartOpen = sideCartState.isSideCartOpen;

  return (
    <div className="flex">
      <div
        className={`h-auto w-full transition-all duration-300 ease-in-out ${
          isSideCartOpen ? "mr-32" : ""
        }`}
      >
        <Header />

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2 m-2">
          <ProductComponent />
        </div>

        <Footer />
      </div>
      <SideCart />
    </div>
  );
}

export default App;
