const Incentives = () => {
  return (
    <div className="m-8 rounded-md bg-gray-50">
      <div className="flex flex-col pt-10 pb-8">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-bold p-5">
            We built our business on customer service
          </h1>
        </div>

        <div className="grid grid-cols-3 h-60">
          <div className="flex flex-col items-center gap-2 pt-5">
            <img className="h-16" src="/svgs/freeshipping.png" alt="" />

            <div className="px-15 flex flex-col items-center gap-2">
              <h1 className="font-semibold text-gray-800">Free shipping</h1>
              <p className="text-center text-gray-500">
                It's not actually free we just price it into the products.
                Someone's paying for it, and it's not us.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 pt-5">
            <img className="h-16" src="/svgs/warranty.png" alt="" />

            <div className="px-15 flex flex-col items-center gap-2">
              <h1 className="font-semibold text-gray-800">10-year warranty</h1>
              <p className="text-center text-gray-500">
                If it breaks in the first 10 years we'll replace it. After that
                you're on your own though.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 pt-7">
            <img className="h-14" src="/svgs/24.png" alt="" />

            <div className="px-15 flex flex-col items-center gap-2">
              <h1 className="font-semibold text-gray-800">24 hour support</h1>
              <p className="text-center text-gray-500">
                We offer 24 hour service to customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Incentives;
