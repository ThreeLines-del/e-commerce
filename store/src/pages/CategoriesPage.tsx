import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { ProductContextObject, ProductType } from "../ProductContextObject";
import Product from "../components/Product";
import CategoryProduct from "../components/CategoryProduct";

const Categories = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const categories = ["men", "women", "jewelry"];
  const productContext = useContext(ProductContextObject);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    productContext
      .getProductsByCategory(selectedCategories)
      .then((product) => setProducts(product));
  }, [selectedCategories]);

  const handleCheckboxChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex-1 flex flex-col sticky top-0">
        <div className="py-5 mx-5 border-b border-gray-300">
          <h1 className="text-3xl font-bold text-gray-800">New Arrivals</h1>
          <p className="mt-2 text-gray-500">
            Checkout out the latest release of stuff!
          </p>
        </div>

        <div className="flex-1 flex">
          <div className="w-[450px] flex flex-col px-8 py-5 text-sm">
            <div className="flex flex-col gap-4 pt-5 pb-10 border-b border-gray-300">
              <h1 className="font-semibold text-gray-800">Category</h1>
              <ul className="flex flex-col gap-1 text-gray-600">
                {categories.map((cat, index) => (
                  <li key={index} className="flex gap-3">
                    <input
                      value={cat}
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCheckboxChange(cat)}
                      className="scale-125"
                      type="checkbox"
                    />
                    <p>{cat[0].toLocaleUpperCase() + cat.slice(1)}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 pt-8">
              <h1 className="font-semibold text-gray-800">Sizes</h1>
              <ul className="flex flex-col gap-1 text-gray-700">
                <li className="flex gap-3">
                  <input className="scale-125" type="checkbox" />
                  <p>S</p>
                </li>
                <li className="flex gap-3">
                  <input className="scale-125" type="checkbox" />
                  <p>M</p>
                </li>
                <li className="flex gap-3">
                  <input className="scale-125" type="checkbox" />
                  <p>L</p>
                </li>
                <li className="flex gap-3">
                  <input className="scale-125" type="checkbox" />
                  <p>XL</p>
                </li>
                <li className="flex gap-3">
                  <input className="scale-125" type="checkbox" />
                  <p>XXL</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-1">
            <div
              id="custom-scrollbar"
              className="grid grid-cols-3 h-[520px] overflow-y-auto"
            >
              {products.map((product) => {
                return <CategoryProduct product={product} key={product._id} />;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex-1 flex">
        <div className="w-1/3 md:w-1/5 pt-2 border bg-blue-50 dark:bg-gray-800 border-gray-50 dark:border-0 sticky top-0 h-screen overflow-y-auto">
          <h1 className="px-4 text-2xl text-gray-500">Categories</h1>
          <ul className="mt-2 dark:text-gray-100">
            {[
              { label: "Electronics", value: "electronics" },
              { label: "Jewelery", value: "jewelery" },
              { label: "Men's Fashion", value: "men's clothing" },
              { label: "Women's Fashion", value: "women's clothing" },
            ].map((category) => (
              <li
                key={category.value}
                onClick={() => handleCategoryClick(category.value)}
                className={`py-3 px-6 border-t border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900 hover:cursor-pointer transition duration-300 ${
                  categoryStringState === category.value
                    ? "bg-blue-300 dark:bg-gray-500"
                    : ""
                }`}
              >
                {category.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 dark:bg-gray-700">
          <CategoryComponent categoryStringState={categoryStringState} />
        </div>
      </div> */}
    </div>
  );
};

export default Categories;
