const Hero = () => {
  return (
    <div className="h-[530px] relative p-8 rounded-md">
      <img
        className="h-full w-full object-cover rounded-md"
        src="/images/4.jpg"
        alt=""
      />

      <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col gap-10 justify-center items-center">
        <div className="w-full flex justify-center items-center">
          <h1 className="text-7xl font-semibold text-white">
            New Arrivals are here!
          </h1>
        </div>
        <button className="bg-[#4f39f6] font-semibold px-5 py-2 text-white rounded-sm">
          Show Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
