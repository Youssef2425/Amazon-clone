import Image from 'next/image';
import logo from '../../images/logo.png';

export default function footer() {
  return (
    <>
      <div className='w-full h-20 bg-amazon_light text-gray-100 flex 
        justify-center items-center gap-4'>
        <Image className='w-24' src={logo} alt='amazonLogo' />
        <p className='-mt-4 text-sm'> &copy; All Rights Reserved{''} 
        <a className='font-[600] hover:underline decoration[1px]' href="https://github.com/Youssef2425" 
          target='_blank'> Youssef Omar </a> </p>
      </div>
    </>
  )
}
