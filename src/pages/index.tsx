import Carousel from "../components/Carousel";
import Products from '@/components/Products';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAllProducts } from "@/Redux-Toolkit/slices/cartSlice";
import { productsProps } from "../../type";

interface Props {
  productData: productsProps;
}

export default function Home({ productData }: Props) {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAllProducts({ allProducts: productData }));
  }, [productData]);

  return (
    <>
      <main>
        <div className='max-w-screen-2xl mx-auto'>
          <Carousel />
          <div className='relative md:-mt-20 mdl:-mt-32 xl:-mt-60 z-20 mb-10'>
            <Products productData={productData} />
          </div>
        </div> 
      </main>
    </>
  )
}


// SSR for data fetching
export const getServerSideProps = async () => {
  const res = await fetch("https://fakestoreapiserver.reactbd.com/tech");
  const productData = await res.json();
  return { props: { productData } };
};