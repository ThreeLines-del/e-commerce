import { useContext } from "react";
import "./App.css";
import ProductProvider from "./ProductContextObject";
import Header from "./components/Header";

import ProductComponent from "./components/ProductComponent";
import SideCart from "./components/SideCart";
import { SideCartContextObject } from "./SideCartContext";

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

        <div className="grid grid-cols-4 gap-2 m-2">
          <ProductComponent />
        </div>

        <div className="h-[500px] bg-amber-200">bottom</div>
      </div>
      <SideCart isSideCartOpen={isSideCartOpen} />
    </div>
  );
}

export default App;
