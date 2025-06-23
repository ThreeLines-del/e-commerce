const Footer = () => {
  return (
    <div className="h-auto grid grid-cols-4 my-10 text-sm px-15">
      <div className="flex flex-col gap-5 px-5 py-10 font-bold text-gray-400">
        <h1 className="text-gray-800">Products</h1>
        <p>Men's Clothing</p>
        <p>Women's Clothing</p>
        <p>Jewelry</p>
      </div>
      <div className="flex flex-col gap-5 px-5 py-10 font-bold text-gray-400">
        <h1 className="text-gray-800">Customer Service</h1>
        <p>Contact</p>
        <p>Shipping</p>
        <p>Returns</p>
        <p>Warranty</p>
        <p>FAQ</p>
      </div>
      <div className="flex flex-col gap-5 px-5 py-10 font-bold text-gray-400">
        <h1 className="text-gray-800">Company</h1>
        <p>Who we are</p>
        <p>Sustainability</p>
        <p>Press</p>
        <p>Careers</p>
        <p>Terms and Conditions</p>
      </div>
      <div className="flex flex-col gap-5 px-5 py-10 font-bold text-gray-400">
        <h1 className="text-gray-800">Legal</h1>
        <p>Terms of Service</p>
        <p>Return Policy</p>
        <p>Privacy Policy</p>
        <p>Shipping Policy</p>
        <p>FAQ</p>
      </div>
    </div>
  );
};

export default Footer;
