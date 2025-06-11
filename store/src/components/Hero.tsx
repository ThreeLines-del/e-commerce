const Hero = () => {
  return (
    <div className="h-[530px] relative">
      <img className="h-full w-full object-cover" src="/images/4.jpg" alt="" />

      {/* <div className="absolute backdrop-blur-md right-0 bottom-0 my-10 mx-20 p-2 flex flex-col gap-2 rounded-md">
        <h1 className="text-7xl">New Arrivals For Everyone</h1>
        <div className="justify-end flex">
          <button className="bg-white px-5 py-2 rounded-md">Shop</button>
        </div>
      </div> */}

      <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col gap-10 justify-center items-center">
        <div className="w-full flex justify-center items-center">
          <h1 className="text-7xl font-semibold text-white">New Arrivals</h1>
        </div>
        <button className="bg-[#4f39f6] font-semibold px-5 py-2 text-white rounded-sm">
          Show Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
