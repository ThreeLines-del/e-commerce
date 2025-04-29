const Footer = () => {
  return (
    <div className="h-[500px] bg-blue-50 grid grid-cols-10 gap-4 p-16">
      <div className="h-full w-full flex flex-col gap-10 col-span-3">
        <div>
          <h1 className="text-[20px] font-bold my-5">lines.store</h1>
          <h1>
            This is the space to introduce visitors to the business or brand.
            Briefly explain who's behind it, what it does and what makes it
            unique. Share its core values and what this site has to offer.
          </h1>
        </div>
        <div className="flex gap-2">
          <img className="h-8" src="/svgs/facebook.png" alt="" />
          <img className="h-8" src="/svgs/insta.png" alt="" />
          <img className="h-8" src="/svgs/x.png" alt="" />
        </div>
        <div>
          <input
            className="border bg-white border-blue-500 w-full h-10 rounded-sm p-2"
            type="text"
            placeholder="Enter search term"
          />
        </div>
      </div>
      <div className="h-full w-full flex flex-col col-span-2">
        <div>
          <h1 className="text-[20px] font-bold my-5">Categories</h1>
        </div>
        <div>
          <h1 className="hover:underline hover:cursor-pointer">Electronics</h1>
          <h1 className="hover:underline hover:cursor-pointer">Jewelery</h1>
          <h1 className="hover:underline hover:cursor-pointer">
            Men's Fashion
          </h1>
          <h1 className="hover:underline hover:cursor-pointer">
            Women's Fashion
          </h1>
        </div>
      </div>
      <div className="h-full w-full col-span-2">
        <div>
          <h1 className="text-[20px] font-bold my-5">Contact</h1>
          <h1>
            500 Terry Francine Street San Francisco, CA 94158 info@mysite.com
            Tel: 123-456-7890
          </h1>
        </div>
        <div>
          <h1 className="text-[20px] font-bold my-5">Shop Policies</h1>
          <h1>Refund policy</h1>
          <h1>Shipping policy</h1>
        </div>
      </div>
      <div className="h-full w-full flex flex-col gap-5 col-span-3">
        <div>
          <h1 className="text-[20px] font-bold my-5">Newsletter</h1>
          <h1>Subscribe to our newsletter and get 10% off your first order</h1>
        </div>
        <div>
          <input
            className="border bg-white border-blue-500 w-60 h-10 rounded-sm p-2"
            type="text"
            placeholder="Enter your email address"
          />

          <button className="bg-amber-300 py-2 px-6 rounded-sm my-5 hover:cursor-pointer hover:bg-amber-400">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
