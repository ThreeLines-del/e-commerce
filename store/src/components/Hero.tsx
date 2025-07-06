import { useRef } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Hero = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const banners = [
    "/images/4.jpg",
    "/images/5.jpg",
    "/images/6.jpg",
    "/images/7.jpg",
  ];

  const scroll = (direction: string) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full">
      {/* Scroll Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white shadow rounded-full p-2"
      >
        <FaArrowLeft />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white shadow rounded-full p-2"
      >
        <FaArrowRight />
      </button>

      {/* Scrollable container */}
      <div
        id="custom-scrollbar"
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-2"
      >
        {banners.map((src, index) => (
          <div
            key={index}
            className="h-[530px] min-w-full sm:min-w-full snap-start relative p-3 sm:p-5 rounded-md bg-gradient-to-r from-gray-100 via-pink-100 to-blue-50"
          >
            <img
              className="h-full w-full object-cover rounded-md"
              src={src}
              alt={`Banner ${index}`}
            />

            <div className="absolute inset-0 flex flex-col gap-10 justify-center items-center">
              <div className="w-full flex justify-center items-center">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold text-white text-center drop-shadow-md">
                  New Arrivals are here!
                </h1>
              </div>
              <NavLink to={"/categories"}>
                <button className="bg-[#4f39f6] font-semibold px-5 py-2 text-white rounded-sm hover:cursor-pointer hover:bg-blue-800">
                  Show Now
                </button>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
