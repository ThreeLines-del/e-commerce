import { useContext } from "react";
import "./App.css";
import Header from "./components/Header";
import ProductComponent from "./components/ProductComponent";
import SideCart from "./components/SideCart";
import { SideCartContextObject } from "./SideCartContext";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ShopByCategory from "./components/ShopByCategory";

function App() {
  const sideCartState = useContext(SideCartContextObject);
  const isSideCartOpen = sideCartState.isSideCartOpen;

  return (
    <div className="flex bg-white dark:bg-gray-800 transition-colors duration-300">
      <div
        className={`h-auto w-full transition-all duration-300 ease-in-out ${
          isSideCartOpen ? "mr-32" : ""
        }`}
      >
        <Header />
        <Hero />
        <ShopByCategory />

        <div className="h-auto mt-5">
          <div className="flex items-center py-4 px-8">
            <h1 className="text-2xl font-semibold text-gray-800">
              New Arrivals
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 bg-white dark:bg-gray-700">
            <ProductComponent />
          </div>
        </div>

        <Footer />
      </div>
      <SideCart />
    </div>
  );
}

export default App;
