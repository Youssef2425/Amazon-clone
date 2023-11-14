import Image from "next/image"
import FormattedPrice from "./FormattedPrice"
import { LuMinus, LuPlus } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { decreaseQuantity, deleteProduct, increaseQuantity } from "../Redux-Toolkit/slices/cartSlice";

interface Product {
  brand: string,
  category: string,
  description: string,
  image: string,
  isNew: boolean,
  oldPrice: number,
  price: number,
  title: string,
  _id: number,
  quantity: number,
}

interface productCartProps {
  product: Product
}

export default function ProductCart( {product}: productCartProps ) {

  const dispatch = useDispatch();

  return (
    <div className="bg-gray-100 rounded-lg flex flex-col md:flex-row py-2 items-center gap-4">
      <Image className="object-cover" src={product.image} alt={product.title} width={200} height={200} />
      <div className="flex items-center px-2 gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-amazon_blue"> { product.title } </h3>
          <p className="text-sm text-gray-600"> { product.description } </p>
          <p className="text-sm text-gray-600"> Unit Price 
            <span className="font-semibold text-amazon_blue"><FormattedPrice amount={product.price}/></span>
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center justify-between mt-1 py-1 px-4 border border-gray-300
            rounded-full w-28 shadow-lg shadow-gray-300">
              <span onClick={() => dispatch(increaseQuantity({
                _id: product._id,
                  title: product.title,
                  category: product.category,
                  description: product.description,
                  image: product.image,
                  isNew: product.isNew,
                  oldPrice: product.oldPrice,
                  price: product.price,
                  brand: product.brand,
                  quantity: 1,
              }))}
              className="w-6 h-6 flex items-center justify-center rounded-full text-base
              bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300">
                <LuPlus />
                </span>
              <span> { product.quantity } </span>
              <span onClick={() => dispatch(decreaseQuantity({
                _id: product._id,
                  title: product.title,
                  category: product.category,
                  description: product.description,
                  image: product.image,
                  isNew: product.isNew,
                  oldPrice: product.oldPrice,
                  price: product.price,
                  brand: product.brand,
                  quantity: 1,
              }))}
              className="w-6 h-6 flex items-center justify-center rounded-full text-base
              bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300">
                <LuMinus />
                </span>
            </div>
            <div onClick={() => dispatch(deleteProduct({
                _id: product._id,
                  title: product.title,
                  category: product.category,
                  description: product.description,
                  image: product.image,
                  isNew: product.isNew,
                  oldPrice: product.oldPrice,
                  price: product.price,
                  brand: product.brand,
                  quantity: 1,
              }))}
              className="flex items-center text-sm font-medium text-gray-400 hover:text-red-600
            cursor-pointer duration-300">
              <IoMdClose className="mt-[2px]" /> <p> Remove </p>
            </div>
          </div>
        </div>
        <div className="text-lg font-semibold text-amazon_blue">
          <FormattedPrice amount={ product.price * product.quantity } />
        </div>
      </div>
    </div>
  )
}
