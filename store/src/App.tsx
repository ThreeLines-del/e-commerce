import { useContext } from "react";
import "./App.css";
import Header from "./components/Header";
import ProductComponent from "./components/ProductComponent";
import SideCart from "./components/SideCart";
import { SideCartContextObject } from "./SideCartContext";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ShopByCategory from "./components/ShopByCategory";
import NewArrivals from "./components/NewArrivals";
import Incentives from "./components/Incentives";

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
        <NewArrivals />
        <Incentives />
        <Footer />
      </div>
      <SideCart />
    </div>
  );
}

export default App;
