import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { IoMdCheckmark } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { CartContextObject } from "../CartContextObject";
import { ProductContextObject, ProductType } from "../ProductContextObject";
import { FadeLoader } from "react-spinners";
import Product from "../components/Product";
import Footer from "../components/Footer";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType>({
    id: 0,
    _id: "",
    category: "",
    description: "",
    image: "",
    new_price: 0,
    name: "",
    old_price: 0,
  });
  const [moreStuffByCategories, setMoreStuffByCategories] = useState<
    ProductType[]
  >([]);
  const [quantity, setQuantity] = useState(1);
  const cart = useContext(CartContextObject);
  const productContext = useContext(ProductContextObject);
  const isLoading = product.id === 0;

  useEffect(() => {
    productContext
      .getProductById(id || "")
      .then((product) => setProduct(product));
  }, [id]);

  useEffect(() => {
    if (product.category) {
      productContext
        .getProductsByCategory([product.category])
        .then((products) => setMoreStuffByCategories(products));
    }
  }, [product.category]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [product]);

  return (
    <div className="flex flex-col relative">
      <Header />

      {isLoading ? (
        <>
          <div className="h-90 flex justify-center items-center">
            <FadeLoader color="#99a1af" />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row">
            <div className="w-full px-10 py-5">
              <div className="bg-white flex flex-col gap-4 p-2">
                <h1 className="text-3xl font-bold text-gray-800">
                  {product?.name}
                </h1>

                <div className="flex gap-5 items-center">
                  <h1 className="text-2xl pr-1">${product?.new_price}</h1>
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
                    {product?.description}
                  </p>
                </div>

                <div className="mt-2 flex gap-2 items-center">
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

                <div className="flex gap-5 items-center">
                  <h1 className="font-semibold">Quantity</h1>
                  <select
                    className="border w-20 py-1 rounded-sm border-gray-300 focus:ring-1 focus:ring-[#4f39f6]"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() =>
                    cart.addOneToCart({
                      name: product.name,
                      new_price: product.new_price,
                      productId: product._id,
                      quantity: quantity,
                    })
                  }
                  className="bg-[#4f39f6] text-white py-3 font-bold rounded-md hover:cursor-pointer hover:brightness-110"
                >
                  Add to cart
                </button>
              </div>
            </div>
            <div className="w-full flex justify-center pt-3 pl-5 pr-5">
              <div className="h-[500px] w-[540px] rounded-md overflow-hidden bg-gray-100 flex justify-center items-center">
                <img
                  className="h-90 lg:h-[400px] w-80 lg:w-[500px] object-contain brightness-95"
                  src={product?.image}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="">
            <div className="px-10 py-5">
              <h1 className="text-xl font-semibold">
                More Stuff from "{product.category}"
              </h1>
            </div>
            <div className="">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {moreStuffByCategories.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default ProductPage;
