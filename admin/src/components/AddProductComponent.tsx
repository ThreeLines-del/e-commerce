import { useContext, useState } from "react";
import {
  ProductContextObject,
  ProductType,
} from "../contexts/ProductContextObject";

const AddProductComponent = () => {
  const [productDetails, setProductDetails] = useState<ProductType>({
    name: "",
    category: "Kids",
    image: "",
    new_price: 0,
    old_price: 0,
  });
  const productContext = useContext(ProductContextObject);

  const [preview, setPreview] = useState<File>();

  const handleImageDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setPreview(file);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0] && files[0].type.startsWith("image/")) {
      setPreview(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  return (
    <div className="h-full pl-10 pr-20 pt-10 flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-sm">Product Title</h1>
        <input
          name="name"
          value={productDetails.name}
          onChange={changeHandler}
          className="border h-9 px-2 w-90 rounded-md border-gray-400 focus:outline-none focus:ring-1 focus:ring-[#4f39f6]"
          type="text"
        />
      </div>

      <div className="flex gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-sm">Price</h1>
          <input
            name="old_price"
            value={productDetails.old_price}
            onChange={changeHandler}
            className="border h-9 px-2 w-80 rounded-md  border-gray-400 focus:outline-none focus:ring-1 focus:ring-[#4f39f6]"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-sm">Offer Price</h1>
          <input
            name="new_price"
            value={productDetails.new_price}
            onChange={changeHandler}
            className="border h-9 px-2 w-80 rounded-md  border-gray-400 focus:outline-none focus:ring-1 focus:ring-[#4f39f6]"
            type="text"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="font-semibold text-sm">Product Category</h1>
        <select
          className="border h-9 w-90 rounded-md  border-gray-400 focus:outline-none focus:ring-1 focus:ring-[#4f39f6]"
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
        >
          <option value="kid">Kids</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="file-upload"
          onDrop={handleImageDrop}
          onDragOver={handleDragOver}
          className="w-full cursor-pointer flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#4f39f6] hover:bg-gray-50 text-gray-500 transition"
        >
          {preview ? (
            <img
              src={URL.createObjectURL(preview)}
              alt="Preview"
              className="w-40 h-40 object-cover rounded"
            />
          ) : (
            <>
              <svg
                className="w-12 h-12 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16V4m0 0L3 8m4-4l4 4M17 16v-4m0 0l4 4m-4-4l-4 4"
                />
              </svg>
              <p>Click or drag an image here to upload</p>
            </>
          )}
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>

      <div className="flex gap-2 mt-5">
        <button
          onClick={() => productContext.addProduct(productDetails, preview)}
          className="bg-[#4f39f6] text-white py-2 px-10 rounded-md font-semibold hover:cursor-pointer hover:brightness-110"
        >
          Add
        </button>

        <button
          onClick={() => {
            setProductDetails({
              name: "",
              category: "Kids",
              image: "",
              new_price: 0,
              old_price: 0,
            });
            setPreview(undefined);
          }}
          className="text-gray-800 px-10 font-semibold hover:cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddProductComponent;
