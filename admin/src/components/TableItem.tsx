import { ProductType } from "../contexts/ProductContextObject";

interface TableItemType {
  product: ProductType;
}

const TableItem: React.FC<TableItemType> = ({ product }) => {
  return (
    <div className="w-full grid grid-cols-8 text-gray-800 text-sm odd:bg-gray-50">
      <div className="flex items-center p-2">
        <div>
          <img className="w-20 h-16" src={product.image} alt="" />
        </div>
      </div>
      <div className="col-span-3 flex items-center px-2">
        <p>{product.name}</p>
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
      <div className="flex items-center px-2">w</div>
    </div>
  );
};

export default TableItem;
