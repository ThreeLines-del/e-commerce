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
      </div>
    </div>
  );
};

export default Categories;
