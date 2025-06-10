import { useContext } from "react";
import {
  ProductContextObject,
  ProductType,
} from "../contexts/ProductContextObject";
import { IoClose } from "react-icons/io5";

interface TableItemType {
  product: ProductType;
}

const TableItem: React.FC<TableItemType> = ({ product }) => {
  const productContext = useContext(ProductContextObject);

  return (
    <div className="w-full grid grid-cols-10 text-gray-800 text-sm odd:bg-gray-50">
      <div className="flex items-center p-2">
        <div>
          <img className="w-20 h-16" src={product.image} alt="" />
        </div>
      </div>
      <div className="col-span-2 flex items-center px-2">
        <p>{product.name}</p>
      </div>
      <div className="col-span-3 flex py-2">
        <p>{product.description}</p>
      </div>
      <div className="flex items-center px-2">
        <p>{product.old_price}</p>
      </div>
      <div className="flex items-center px-2">
        <p>{product.new_price}</p>
      </div>
      <div className="flex items-center px-2">
        <p>{product.category}</p>
      </div>
      <div className="flex items-center px-2">
        <IoClose
          onClick={() => productContext.deleteProduct(product.id)}
          className="scale-125 text-red-400 hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default TableItem;
