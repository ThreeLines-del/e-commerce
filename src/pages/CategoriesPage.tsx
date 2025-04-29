import { useState } from "react";
import Header from "../components/Header";
import CategoryComponent from "../components/CategoryComponent";

const Categories = () => {
  const [categoryStringState, setCategoryStringState] =
    useState<string>("electronics");

  const handleCategoryClick = (category: string) => {
    setCategoryStringState(category);
  };

  return (
    <div className="flex flex-col">
      <Header />

      <div className="flex-1 flex">
        <div className="backdrop-blur-sm w-1/5 pt-2 border-r border-gray-50 sticky top-0 h-screen overflow-y-auto">
          <h1 className="px-4 text-2xl text-gray-500">Categories</h1>
          <ul className="mt-2">
            {[
              { label: "Electronics", value: "electronics" },
              { label: "Jewelery", value: "jewelery" },
              { label: "Men's Fashion", value: "men's clothing" },
              { label: "Women's Fashion", value: "women's clothing" },
            ].map((category) => (
              <li
                key={category.value}
                onClick={() => handleCategoryClick(category.value)}
                className={`py-3 px-6 border-b border-gray-200 hover:bg-blue-300 hover:cursor-pointer ${
                  categoryStringState === category.value ? "bg-blue-300" : ""
                }`}
              >
                {category.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 grid grid-cols-3 gap-2 m-2">
          <CategoryComponent categoryStringState={categoryStringState} />
        </div>
      </div>
    </div>
  );
};

export default Categories;
