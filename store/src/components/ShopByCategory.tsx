import { useContext } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { ProductContextObject } from "../ProductContextObject";
import { useNavigate } from "react-router-dom";

const ShopByCategory = () => {
  const productContext = useContext(ProductContextObject);
  const setSelectedCategories = productContext.setSelectedCategories;
  const navigate = useNavigate();

  const handleNavigateToCategories = (category: string) => {
    setSelectedCategories([category]);
    navigate("/categories");
  };

  return (
    <div className="pt-10 pb-15 bg-gray-50">
      <div className="flex justify-between items-center py-5 px-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Shop By Cotegory
        </h1>
        <div className="flex justify-center items-center gap-2 scale-95">
          <NavLink to={"/categories"}>
            <h1 className="font-semibold text-[#4f39f6]">
              Browse all categories
            </h1>
          </NavLink>

          <FaArrowRight className="text-[#4f39f6]" />
        </div>
      </div>
      <div className="h-[500px] grid grid-cols-2 grid-rows-2 px-10 gap-8 relative">
        <div
          onClick={() => handleNavigateToCategories("men")}
          className="row-span-2 rounded-md overflow-hidden"
        >
          <img
            className="object-cover h-full w-full hover:brightness-95 hover:cursor-pointer"
            src="/images/6.jpg"
            alt=""
          />

          <div className="absolute bottom-0 m-5 text-white">
            <h1 className="text-xl font-semibold">Men</h1>
            <h1>Shop now</h1>
          </div>
        </div>

        <div
          onClick={() => handleNavigateToCategories("women")}
          className="rounded-md overflow-hidden relative"
        >
          <img
            className="h-full w-full object-cover hover:brightness-95 hover:cursor-pointer"
            src="images/8.jpg"
            alt=""
          />

          <div className="absolute bottom-0 m-5 text-white">
            <h1 className="text-xl font-semibold">Women</h1>
            <h1>Shop now</h1>
          </div>
        </div>

        <div
          onClick={() => handleNavigateToCategories("jewelry")}
          className="rounded-md overflow-hidden relative"
        >
          <img
            className="h-full w-full object-cover hover:brightness-95 hover:cursor-pointer"
            src="images/7.jpg"
            alt=""
          />
          <div className="absolute bottom-0 m-5 text-white">
            <h1 className="text-xl font-semibold">Jewelry</h1>
            <h1>Shop now</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;
