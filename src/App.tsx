import { useState } from "react";
import "./App.css";
import ProductProvider from "./ProductContextObject";
import Header from "./components/Header";

import ProductComponent from "./components/ProductComponent";
import SideCart from "./components/SideCart";

function App() {
  const [isSideCartOpen, setIsSideCartOpen] = useState<boolean>(false);

  return (
    <ProductProvider>
      <div className="flex">
        <div
          className={`h-auto w-full transition-all duration-300 ease-in-out ${
            isSideCartOpen ? "mr-32" : ""
          }`}
        >
          <Header />

          <div className="grid grid-cols-4 gap-2 m-2">
            <ProductComponent setIsSideCartOpen={setIsSideCartOpen} />
          </div>

          <div className="h-[500px] bg-amber-200">bottom</div>
        </div>
        <SideCart isSideCartOpen={isSideCartOpen} />
      </div>
    </ProductProvider>
  );
}

export default App;
