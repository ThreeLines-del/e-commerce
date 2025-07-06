import { NavLink, useLocation } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegListAlt } from "react-icons/fa";
import uploadImage from "../assets/upload_image.png";

const SideBar = () => {
  const pathname = useLocation().pathname;

  const sideBarLabels = [
    {
      icon: (
        <MdOutlineShoppingCart
          className={`scale-150 group-hover:text-[#4f39f6] ${
            pathname === "/addProduct" ? "text-[#4f39f6]" : "text-gray-500"
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
            pathname === "/productList" ? "text-[#4f39f6]" : "text-gray-500"
          }`}
        />
      ),
      label: "Product List",
      route: "/productList",
    },
  ];

  return (
    <div className="h-full w-1/4 bg-white flex flex-col border-r border-gray-200">
      <div className="h-15 px-5 pt-4 flex gap-2 items-center">
        <img className="h-10" src="/icons/admin.png" alt="" />
        <h1 className="font-bold">Admin</h1>
      </div>
      <ul className="flex flex-col gap-2 px-4 mt-5">
        {sideBarLabels.map((item, index) => {
          return (
            <li key={index}>
              <NavLink to={item.route}>
                <div
                  className={`group rounded-md flex items-center py-3 px-3 gap-4 hover:bg-gray-50 hover:text-[#4f39f6]
                    ${
                      pathname === item.route ? "text-[#4f39f6] bg-gray-50" : ""
                    }
                    `}
                >
                  <span className="">{item.icon}</span>
                  <h1
                    className={`font-semibold text-sm group-hover:text-[#4f39f6] 
                      ${
                        pathname === item.route
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
      <div className="flex-1 flex flex-col justify-end pb-5 px-5">
        <div className="flex px-5 gap-5 items-center bg-gray-100 py-2 rounded-md">
          <img className="h-12 w-12 rounded-full" src={uploadImage} alt="" />
          <h1 className="text-gray-800 font-semibold">admin name</h1>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
