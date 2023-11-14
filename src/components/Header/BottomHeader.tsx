import { LuMenu } from "react-icons/lu";
import { signOut } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "@/Redux-Toolkit/slices/cartSlice";
import { StateProps } from "../../../type";

const BottomHeader = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: StateProps) => state.cart);
  const handleSignOut = () => {
    signOut();
    dispatch(removeUser());
  };
  return (
    <div className="w-full h-10 bg-amazon_light text-sm text-white px-4 flex items-center">
      <p className="flex items-center gap-1 h-8 px-2 border border-transparent
      hover:border-white cursor-pointer duration-300">
        <LuMenu className="text-xl" /> All
      </p>
      <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent
      hover:border-white cursor-pointer duration-300">
        Today's Deals
      </p>
      <p className="hidden lg:inline-flex items-center h-8 px-2 border border-transparent
      hover:border-white cursor-pointer duration-300">
        Mobile Phones
      </p>
      <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent
      hover:border-white cursor-pointer duration-300">
        Electronics
      </p>
      <p className="hidden lg:inline-flex items-center h-8 px-2 border border-transparent
      hover:border-white cursor-pointer duration-300">
        Video Games
      </p>
      <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent
      hover:border-white cursor-pointer duration-300">
        Fashion 
      </p>
      <p className="hidden mdl:inline-flex items-center h-8 px-2 border border-transparent
      hover:border-white cursor-pointer duration-300">
        Toys &amp; Games
      </p>
      <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent
      hover:border-white cursor-pointer duration-300">
        Perfumes
      </p>
      <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent
      hover:border-white cursor-pointer duration-300">
        Watches
      </p>
      <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent
      hover:border-white cursor-pointer duration-300">
        Shoes
      </p>
      {userInfo && (
        <button
          onClick={handleSignOut}
          className="inline-flex items-center h-8 px-2 border border-transparent
          hover:border-red-600 hover:text-red-400 text-amazon_yellow cursor-pointer duration-300"
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default BottomHeader;