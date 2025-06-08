import { NavLink } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegListAlt } from "react-icons/fa";
import { useState } from "react";

const SideBar = () => {
  const [itemState, setItemState] = useState<String>("Add Product");

  const sideBarLabels = [
    {
      icon: (
        <MdOutlineShoppingCart
          className={`scale-150 group-hover:text-[#4f39f6] ${
            itemState === "Add Product" ? "text-[#4f39f6]" : "text-gray-500"
          }`}
        />
      ),
      label: "Add Product",
      route: "/addProduct",
    },
    {
      icon: (
        <FaRegListAlt
          className={`scale-150 group-hover:text-[#4f39f6] ${
            itemState === "Product List" ? "text-[#4f39f6]" : "text-gray-500"
          }`}
        />
      ),
      label: "Product List",
      route: "/productList",
    },
  ];

  return (
    <div className="h-full w-1/4 bg-white flex flex-col border-r border-gray-200">
      <div className="h-15 px-5 pt-4 flex gap-2">
        <img className="h-10" src="/icons/admin.png" alt="" />
      </div>
      <ul className="flex flex-col gap-2 px-4 mt-5">
        {sideBarLabels.map((item, index) => {
          return (
            <li key={index}>
              <NavLink onClick={() => setItemState(item.label)} to={item.route}>
                <div
                  className={`group rounded-md flex items-center py-3 px-3 gap-4 hover:bg-gray-50 hover:text-[#4f39f6]
                    ${
                      itemState === item.label
                        ? "text-[#4f39f6] bg-gray-50"
                        : ""
                    }
                    `}
                >
                  <span className="text-red-500">{item.icon}</span>
                  <h1
                    className={`font-semibold text-sm group-hover:text-[#4f39f6] 
                      ${
                        itemState === item.label
                          ? "text-[#4f39f6]"
                          : "text-gray-800"
                      } `}
                  >
                    {item.label}
                  </h1>
                </div>
              </NavLink>
            </li>
          );
        })}
      </ul>
      <div></div>
    </div>
  );
};

export default SideBar;
