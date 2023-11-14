import { useSelector } from "react-redux"
import ClearCart from "../components/ClearCart";
import Link from "next/link";
import CartPayment from "../components/CartPayment";
import { StateProps, StoreProduct } from "../../type";
import ProductCart from "../components/ProductCart";

const CartPage = () => {
  const { products } = useSelector((state: StateProps) => state.cart);
  return (
    <>
      <div className="max-w-screen-2xl mx-auto px-6 py-4 grid xl:grid-cols-5 gap-10">
        {
          products.length > 0 ? (
            <>
              <div className="bg-white col-span-4 p-4 rounded-lg">
                <div className="flex items-center justify-between border-b-[1px]
                border-b-gray-400 pb-1">
                  <p className="text-2xl font-semibold text-amazon_blue">
                  Shopping Cart </p>
                  <p className="text-lg text-amazon_blue font-semibold"> Subtotal </p>
                </div>
                <div className="pt-2 flex flex-col gap-2">
                  {
                    products.map((product: StoreProduct) => (
                      <div key={product._id}>
                        <ProductCart product={product} />
                      </div>
                    ))
                  }
                  <ClearCart />
                </div>
              </div>
              <div className="bg-white h-64 col-span-1 p-4 rounded-lg flex items-center justify-center">
                <CartPayment />
              </div>
            </>
          ) : (
          <div className="bg-white h-64 col-span-5 flex flex-col items-center justify-center
          py-5 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium"> Your cart is empty ! </h2>
            <Link href={"/"}>  <button className="w-52 h-10 bg-amazon_yellow hover:bg-[#f3a847]
            text-black text-sm font-semibold rounded-lg"> Go to shopping </button>  </Link>
          </div>)
        }
      </div>
    </>
  )
}

export default CartPage;
