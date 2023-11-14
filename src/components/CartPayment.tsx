import { SiMediamarkt } from 'react-icons/si';
import FormattedPrice from './FormattedPrice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSession, signIn } from "next-auth/react";
import { StateProps, StoreProduct } from '../../type';


export default function CartPayment() {

  const { products, userInfo } = useSelector((state: StateProps) => state.cart);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let amount = 0;
    products.map((product: StoreProduct) => {
      amount += product.price * product.quantity;
      return;
    });
    setTotalAmount(amount);
  }, [products])

  // Striep payment
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  const { data: session } = useSession();

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: products, email: session?.user?.email }),
    });
    const checkoutSession = await response.json();

    // Redirecting user/customer to Stripe Checkout
    const result: any = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
    if (result.error) {
      alert(result?.error.message);
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-2'>
        <span className='w-6 h-6 bg-green-600 rounded-full p-1 text-sm text-white flex items-center
        justify-center mt-1'>
          <SiMediamarkt />
        </span>
        <p className='text-sm'> Your order qualifies for Free shipping
          by Choosing this option at checkout. see detailes... </p>
      </div>
      <p className='flex items-center justify-between font-semibold px-2'>
        Total:
        <span className='font-bold text-xl'>
          <FormattedPrice amount={totalAmount} />
        </span>
      </p>
      {
        userInfo ? (
          <div className="flex flex-col items-center">
            <button onClick={handleCheckout} className="w-full h-10 text-sm font-semibold
            bg-amazon_blue text-white rounded-lg hover:bg-amazon_yellow
            hover:text-black duration-300">
              Proceed to Buy
            </button>
          </div>
        ) : (
        <div className="flex flex-col items-center">
          <button className="w-full h-10 text-sm font-semibold bg-amazon_blue bg-opacity-50 text-white rounded-lg cursor-not-allowed">
            Proceed to Buy
          </button>
          <p onClick={() => signIn()} className="text-xs mdl:text-sm mt-2 text-red-500
          font-semibold animate-bounce cursor-pointer">
            Please login to continue
          </p>
        </div>
      )}
    </div>
  )
}
