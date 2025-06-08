import { useContext } from "react";
import "./App.css";
import Header from "./components/Header";
import ProductComponent from "./components/ProductComponent";
import SideCart from "./components/SideCart";
import { SideCartContextObject } from "./SideCartContext";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

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

        <div className="my-5">
          <div className="flex justify-between items-center py-5 px-8">
            <h1 className="text-2xl font-semibold">Shop By Cotegory</h1>
            <h1>Browse all Categories</h1>
          </div>
          <div className="h-[500px] grid grid-cols-2 grid-rows-2 px-10 gap-8 relative">
            <div className="row-span-2 rounded-md overflow-hidden">
              <img
                className="object-cover h-full w-full brightness-90 hover:brightness-100"
                src="/images/1.jpg"
                alt=""
              />
              <div className="absolute bottom-0 m-5 text-gray-200">
                <h1 className="text-xl font-semibold">Men</h1>
                <h1>Shop now</h1>
              </div>
            </div>
            <div className="rounded-md overflow-hidden relative">
              <img
                className="h-full w-full object-cover brightness-90 hover:brightness-100"
                src="images/2.jpg"
                alt=""
              />
              <div className="absolute bottom-0 m-5 text-gray-200">
                <h1 className="text-xl font-semibold">Electronics</h1>
                <h1>Shop now</h1>
              </div>
            </div>
            <div className="bg-blue-400 rounded-md overflow-hidden relative">
              <img
                className="h-full w-full object-cover brightness-90 hover:brightness-100"
                src="images/3.jpg"
                alt=""
              />
              <div className="absolute bottom-0 m-5 text-gray-200">
                <h1 className="text-xl font-semibold">Jewellery</h1>
                <h1>Shop now</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 bg-white dark:bg-gray-700">
          <ProductComponent />
        </div>

        <Footer />
      </div>
      <SideCart />
    </div>
  );
}

export default App;
