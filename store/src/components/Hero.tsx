const Hero = () => {
  return (
    <div className="h-[530px] relative">
      <img className="h-full w-full object-cover" src="/images/1.jpg" alt="" />

      <div className="absolute backdrop-blur-md right-0 bottom-0 my-10 mx-20 p-2 flex flex-col gap-2 rounded-md">
        <h1 className="text-7xl">New Arrivals For Everyone</h1>
        <div className="justify-end flex">
          <button className="bg-white px-5 py-2 rounded-md">Shop</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
