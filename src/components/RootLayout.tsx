import { ReactElement } from "react";
import TopHeader from "./Header/TopHeader";
import BottomHeader from "./Header/BottomHeader";
import Footer from "./Footer/Footer";


interface Props {
  children: ReactElement;
}

const RootLayout = ({ children }: Props) => {
  return (
    <>
      <TopHeader />
      <BottomHeader />
      {children}
      <Footer />
    </>
  );
};

export default RootLayout;
