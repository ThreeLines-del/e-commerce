const ProductSkeleton = () => {
  return (
    <div className="animate-pulse py-5 border-gray-100 shadow-sm rounded-sm h-96 flex flex-col gap-2 justify-center items-center">
      <div className="h-48 w-48 object-fill bg-gray-200"></div>
      <div className="w-full px-5">
        <div className="bg-gray-200 h-7 w-32 mb-2"></div>
        <div className="bg-gray-200 h-10 w-16"></div>
      </div>
      <div className="h-12 w-28 rounded-4xl py-2 px-3 bg-gray-200"></div>
    </div>
  );
};

export default ProductSkeleton;
