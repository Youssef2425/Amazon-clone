import FormattedPrice from "./FormattedPrice";

interface Props {
  brand: string;
  category: string;
  description: string;
  image: string;
  isNew: boolean;
  oldPrice: number;
  price: number;
  title: string;
  _id: number;
}
type Product = {
  product: Props;
};


export default function SearchProducts( {product}: Product ) {
  return (
    <>
      <div className="flex products-center gap-4">
        <img className="w-24" src={product.image} alt="productImage" />
        <div>
          <p className="text-xs -mb-1">
            {product.brand}_{product.category}
          </p>
          <p className="text-lg font-medium">{product.title}</p>
          <p className="text-xs">{product.description.substring(0, 100)}</p>
          <p className="text-sm flex products-center gap-1">
            price:{" "}
            <span className="font-semibold">
              <FormattedPrice amount={product.price} />
            </span>
            <span className="text-gray-600 line-through">
              <FormattedPrice amount={product.oldPrice} />
            </span>
          </p>
        </div>
        <div className="flex-1 text-right px-4">
          <p className="text-base font-semibold animate-bounce text-amazon_blue">
          Save <FormattedPrice amount={product.oldPrice - product.price} />
          </p>
        </div>
      </div>
    </>
  )
}
