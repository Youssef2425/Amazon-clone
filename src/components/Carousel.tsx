import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import slid_1 from '../images/slider/sliderImg_1.jpg';
import slid_2 from '../images/slider/sliderImg_2.jpg';
import slid_3 from '../images/slider/sliderImg_3.jpg';
import slid_4 from '../images/slider/sliderImg_4.jpg';
import slid_5 from '../images/slider/sliderImg_5.jpg';
import slid_6 from '../images/slider/sliderImg_6.jpg';
import slid_7 from '../images/slider/sliderImg_7.jpg';
import slid_8 from '../images/slider/sliderImg_8.jpg';
import Image from "next/image";

export default function carousel() {
  return (
    <>
    <div className="relative">
      <Carousel 
        autoPlay 
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false} interval={3000}>
        <div>
          <Image priority src={slid_1} alt='slideImg' />
        </div>
        <div>
          <Image src={slid_2} alt='slideImg' />
        </div>
        <div>
          <Image src={slid_3} alt='slideImg' />
        </div>
        <div>
          <Image src={slid_4} alt='slideImg' />
        </div>
        <div>
          <Image src={slid_5} alt='slideImg' />
        </div>
        <div>
          <Image src={slid_6} alt='slideImg' />
        </div>
        <div>
          <Image src={slid_7} alt='slideImg' />
        </div>
        <div>
          <Image src={slid_8} alt='slideImg' />
        </div>
      </Carousel>
      <div className="absolute w-full h-40 bg-gradient-to-t from-gray-100 to-transparent
        bottom-0 z-20"></div>
    </div>
    </>
  )
}
