import { useContext } from "react";
import { SearchContextObject } from "../SearchContextObject";

const Footer = () => {
  const searchContext = useContext(SearchContextObject);
  const setIsSearchClicked = searchContext.setIsSearchClicked;

  return (
    <div className="h-auto grid grid-cols-4 md:grid-cols-10 gap-4 p-16">
      <div className="h-full w-full flex flex-col gap-10 col-span-3">
        <div>
          <h1 className="text-[20px] font-bold my-5 dark:text-gray-100">
            lines.store
          </h1>
          <h1 className="text-gray-700 dark:text-gray-300">
            This is the space to introduce visitors to the business or brand.
            Briefly explain who's behind it, what it does and what makes it
            unique. Share its core values and what this site has to offer.
          </h1>
        </div>
        <div className="flex gap-2">
          <img
            className="h-8 dark:bg-gray-700"
            src="/svgs/facebook.png"
            alt=""
          />
          <img className="h-8 dark:bg-gray-700" src="/svgs/insta.png" alt="" />
          <img className="h-8 dark:bg-gray-700" src="/svgs/x.png" alt="" />
        </div>
        <div>
          <input
            className="bg-gray-100 w-full h-10 rounded-sm p-2 border border-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-800"
            type="text"
            placeholder="Enter search term"
          />
        </div>
      </div>
      <div className="h-full w-full flex flex-col col-span-2">
        <div>
          <h1 className="text-[20px] font-bold my-5 dark:text-gray-100">
            Categories
          </h1>
        </div>
        <div className="text-gray-700 dark:text-gray-300">
          <h1
            onClick={() => {
              searchContext.setSearchQuery("Jewelery");
              setIsSearchClicked(true);
            }}
            className="hover:underline hover:cursor-pointer"
          >
            Jewelery
          </h1>
          <h1
            onClick={() => {
              searchContext.setSearchQuery("Men's Clothing");
              setIsSearchClicked(true);
            }}
            className="hover:underline hover:cursor-pointer"
          >
            Men's Clothing
          </h1>
          <h1
            onClick={() => {
              searchContext.setSearchQuery("Women's Clothing");
              setIsSearchClicked(true);
            }}
            className="hover:underline hover:cursor-pointer"
          >
            Women's Clothing
          </h1>
        </div>
      </div>
      <div className="h-full w-full col-span-2">
        <div>
          <h1 className="text-[20px] font-bold my-5 dark:text-gray-100">
            Contact
          </h1>
          <h1 className="text-gray-700 dark:text-gray-300">
            500 Terry Francine Street San Francisco, CA 94158 info@mysite.com
            Tel: 123-456-7890
          </h1>
        </div>
        <div>
          <h1 className="text-[20px] font-bold my-5 dark:text-gray-100">
            Shop Policies
          </h1>
          <h1 className="text-gray-700 dark:text-gray-300">Refund policy</h1>
          <h1 className="text-gray-700 dark:text-gray-300">Shipping policy</h1>
        </div>
      </div>
      <div className="h-full w-full flex flex-col gap-5 col-span-3">
        <div>
          <h1 className="text-[20px] font-bold my-5 dark:text-gray-100">
            Newsletter
          </h1>
          <h1 className="text-gray-700 dark:text-gray-300">
            Subscribe to our newsletter and get 10% off your first order
          </h1>
        </div>
        <div>
          <input
            className="border bg-gray-100 border-gray-300 w-full h-10 rounded-sm p-2 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-800"
            type="text"
            placeholder="Enter your email address"
          />

          <button className="bg-amber-300 py-2 px-6 rounded-sm my-5 hover:cursor-pointer hover:bg-amber-400 transition duration-300">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
