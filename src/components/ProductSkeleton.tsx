const ProductSkeleton = () => {
  return (
    <div className="animate-pulse py-5 border-gray-100 dark:border-gray-600 shadow-sm h-96 flex flex-col gap-2 justify-center items-center">
      <div className="h-64 w-64 object-fill bg-gray-200 rounded-md"></div>
      <div className="w-full px-5">
        <div className="bg-gray-200 h-7"></div>
      </div>
      <div className="h-8 w-28 rounded-4xl py-1 px-3 bg-gray-200"></div>
    </div>
  );
};

export default ProductSkeleton;
