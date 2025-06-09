import Header from "../components/Header";
import { IoMdCheckmark } from "react-icons/io";

const ProductPage = () => {
  return (
    <div className="h-screen">
      <Header />

      <div className="h-[520px] flex">
        <div className="w-full px-10 py-5">
          <div className="bg-white flex flex-col gap-4 p-2">
            <h1 className="text-3xl font-bold text-gray-800">
              Everyday Ruck Snack
            </h1>

            <div className="flex gap-5 items-center">
              <h1 className="text-2xl pr-1">$220</h1>
              <div className="flex space-x-1 text-gray-300 cursor-pointer scale-125 border-l pl-2">
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="text-yellow-400">★</span>
                <span className="hover:text-yellow-400">★</span>
                <span className="hover:text-yellow-400">★</span>
              </div>
            </div>

            <div className="">
              <p className="text-lg leading-6 text-gray-600">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis est expedita ea molestias quaerat libero at molestiae
                perspiciatis rerum inventore veniam corporis maxime architecto
                debitis quae aliquam, impedit ut excepturi.
              </p>
            </div>

            <div className="mt-5 flex gap-2 items-center">
              <IoMdCheckmark className="scale-110 text-green-500" />
              <h1 className="text-gray-600">In stock and ready to ship</h1>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <h1 className="font-semibold text-gray-800">Size</h1>
              <div className="flex gap-5">
                <div className="h-10 w-15 border border-gray-300 flex justify-center items-center rounded-sm">
                  <p>S</p>
                </div>
                <div className="h-10 bg-[#4f39f6] text-white w-15 border border-gray-300 flex justify-center items-center rounded-sm">
                  <p>M</p>
                </div>
                <div className="h-10 w-15 border border-gray-300 flex justify-center items-center rounded-sm">
                  <p>L</p>
                </div>
                <div className="h-10 w-15 border border-gray-300 flex justify-center items-center rounded-sm">
                  <p>XL</p>
                </div>
                <div className="h-10 w-15 border border-gray-300 flex justify-center items-center rounded-sm">
                  <p>XXL</p>
                </div>
              </div>
            </div>

            <button className="bg-[#4f39f6] text-white py-3 font-bold rounded-md mt-10">
              Add to cart
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center items-center pr-5">
          <div className="h-[500px] w-[540px] rounded-md overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src="/images/bag.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
