import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { ProductContextObject } from "../ProductContextObject";
import Product from "../components/Product";
import Footer from "../components/Footer";
import { SideCartContextObject } from "../SideCartContext";
import SideCart from "../components/SideCart";

const AllProductsPage = () => {
  const productsContext = useContext(ProductContextObject);
  const products = productsContext.productItems;
  const isSideCartOpen = useContext(SideCartContextObject).isSideCartOpen;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // Calculate the range
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="flex dark:bg-gray-800 transition-colors duration-300">
      <div
        className={`h-auto w-screen flex flex-col transition-all duration-300 ease-in-out ${
          isSideCartOpen ? "mr-32" : ""
        }`}
      >
        <Header />

        <div className="flex-1">
          <div className="py-5 px-5 border-b border-gray-300 bg-gradient-to-r from-gray-100 via-pink-100 to-blue-50">
            <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
            <p className="mt-2 text-gray-500">Shop all products!</p>
          </div>

          <div className="">
            <div className="grid grid-cols-4">
              {currentProducts.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="my-4 flex gap-2 justify-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border border-gray-300 rounded ${
                  currentPage === i + 1 ? "bg-[#4f39f6] text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <Footer />
        </div>
      </div>
      <SideCart />
    </div>
  );
};

export default AllProductsPage;
