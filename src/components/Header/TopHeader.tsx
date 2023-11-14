import Image from 'next/image';
import logo from '../../images/logo.png';
import cartIcon from '../../images/cartIcon.png';
import { SlLocationPin } from 'react-icons/sl';
import { IoSearchSharp } from 'react-icons/io5';
import { BiCaretDown } from "react-icons/bi";
import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";
import { StateProps, StoreProduct } from "../../../type";
import { useSession, signIn,} from "next-auth/react";
import { useEffect, useState } from "react";
import { addUser } from '@/Redux-Toolkit/slices/cartSlice';
import SearchProducts from "../SearchProducts";

export default function TopHeader() {

  const dispatch = useDispatch();
  const { products, favorites, userInfo, allProducts } = useSelector(
    (state: StateProps) => state.cart
  );

  const [allData, setAllData] = useState([]);
  const { data: session } = useSession();
  
  useEffect(() => {
    setAllData(allProducts.allProducts);
  }, [allProducts]);

  useEffect(() => {
    if (session) {
      dispatch(addUser({
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
      }))
    }
  }, [session])

  // Search area
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = allData.filter((product: StoreProduct) =>
      product.title.toLocaleLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  return (
    <>
      <div className='w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-50'>
        <div className='w-full h-full mx-auto inline-flex
          justify-between items-center px-4 gap-1 mdl:gap-3'>

          {/* Logo */}
            <Link href={'/'} className='px-2 border border-transparent hover:border-white cursor-pointer
              duration-200 flex justify-center items-center h-[70%]'>
              <Image className='w-28 object-cover mt-2' src={logo} alt='logoImg' />
            </Link>

          {/* Deliver To */}
          <div className='px-2 border border-transparent hover:border-white cursor-pointer
            duration-200 justify-center items-center h-[70%] hidden xl:inline-flex gap-x-1'>
            <SlLocationPin className='text-white text-lg' />
            <div className='text-xs'>
              <p> Deliver to </p>
              <p className='font-bold uppercase text-white'> Egypt </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 h-10 hidden md:inline-flex items-center justify-between relative">
          <input
            onChange={handleSearch}
            value={searchQuery}
            type="text"
            placeholder="Search Amazon"
            className="w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black
            border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow"
          />
          <span className="w-12 h-full bg-amazon_yellow text-black text-2xl flex items-center
          justify-center absolute right-0 rounded-tr-md rounded-br-md">
            <IoSearchSharp />
          </span>
          {/* ========== Searchfield ========== */}
          {searchQuery && (
            <div className="absolute left-0 top-12 w-full mx-auto max-h-96 bg-gray-200 rounded-lg
            overflow-y-scroll cursor-pointer text-black">
              {filteredProducts.length > 0 ? (
                <>
                  {searchQuery &&
                    filteredProducts.map((product: StoreProduct) => (
                      <Link
                        key={product._id}
                        className="w-full border-b-[1px] border-b-gray-400 flex items-center gap-4"
                        href={{
                          pathname: `${product._id}`,
                          query: {
                            _id: product._id,
                            brand: product.brand,
                            category: product.category,
                            description: product.description,
                            image: product.image,
                            isNew: product.isNew,
                            oldPrice: product.oldPrice,
                            price: product.price,
                            title: product.title,
                          },
                        }}
                        onClick={() => setSearchQuery("")}
                      >
                        <SearchProducts product={product} />
                      </Link>
                    ))}
                </>
              ) : (
                <div className="bg-gray-50 flex items-center justify-center py-10 rounded-lg shadow-lg">
                  <p className="text-xl font-semibold animate-bounce">
                    Nothing is matches with your search keywords. Please try
                    again!
                  </p>
                </div>
              )}
            </div>
          )}
          {/* ========== Searchfield ========== */}
        </div>

          {/* Sign In */}
          {
            userInfo ? (
            <div className="flex items-center px-2 border border-transparent hover:border-white
            cursor-pointer duration-300 h-[70%] gap-1">
              <img src={userInfo.image} alt="userImage"
              className="w-8 h-8 rounded-full object-cover"
              />
              <div className="text-xs text-gray-100 flex flex-col justify-between">
                <p className="text-white font-bold">{userInfo.name}</p>
                <p className='hidden xl:inline-flex'>{userInfo.email}</p>
              </div>
            </div>
          ) : (
            <div
              onClick={() => signIn()}
              className="text-xs text-gray-100 flex flex-col justify-center px-2 border
              border-transparent hover:border-white cursor-pointer duration-300 h-[70%]"
            >
              <p>Hello, sign in</p>
              <p className="text-white font-bold flex items-center">
                Account & Lists{" "}
                <span>
                  <BiCaretDown />
                </span>
              </p>
            </div>
          )
        }

          {/* Favorite */}
          <Link href={"/favorite"} className='h-[70%] flex flex-col justify-center px-2 text-xs cursor-pointer
            border border-transparent hover:border-white duration-300 text-white relative'>
            <p> Marked </p>
            <p className='font-bold'> &amp; Favorite </p>
            {
              favorites.length > 0 && <span className='absolute top-1 right-0 w-5
              h-5 border-[1px] border-gray-400 flex items-center justify-center text-xs
              text-amazon_yellow'> { favorites.length } </span>
            }
          </Link>

          {/* Cart */}
            <Link href={'/cart'} className='h-[70%] flex items-center px-2 border border-transparent
              hover:border-white duration-300 cursor-pointer relative'>
              <Image className='w-auto h-8 object-cover' src={cartIcon} alt='cartImg' />
              <p className='text-sm text-white font-bold mt-3'> Cart </p>
              <span className='absolute top-[3px] left-[35%] translate-x-[-35%] text-amazon_yellow 
                font-semibold text-sm self-center'> { products ? products.length : 0} </span>
            </Link>

        </div>
      </div>
    </>
  )
}
