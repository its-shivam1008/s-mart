import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
    <div>
      <div className='p-10'>
        <div className='flex justify-evenly mb-3 items-center'>
          <div className='text-2xl font-bold'>Follow us on :</div>
          <div className='flex space-x-4'>
            <Link href="https://www.google.com"><img className='rounded-[8px] w-[30px] hover:bg-purple-500 transition-colors hover:duration-1000' src="./google.svg" alt="google.com " title='Google'/></Link>
            <Link href="https://www.x.com"><img className='rounded-[8px] w-[30px] hover:bg-purple-400 transition-colors hover:duration-1000' src="./twitter.svg" alt="twitter.com " title='X (Twitter)'/></Link>
            <Link href="https://www.instagram.com"><img src="./insta.svg" alt="instagram.com " title='Instagram' className='rounded-[8px] w-[30px] hover:bg-pink-700 transition-colors hover:duration-1000'/></Link>
          </div>
        </div>
        <hr />
        <div className='mt-5 md:flex md:justify-evenly min-[0px]:max-md:flex-col min-[0px]:max-md:text-center'>
          <div>
            <div className='text-purple-500 font-bold text-xl'>Product</div>
            <Link className='font-[200] hover:text-purple-500' href='/categories'>Category</Link><br />
            <Link  className='font-[200] hover:text-purple-500' href='/product'>Product</Link>
          </div>
          <div>
            <div className='text-purple-500 font-bold text-xl'>Company</div>
            <Link className='font-[200] hover:text-purple-500' href='/'>Terms</Link><br />
            <Link className='font-[200] hover:text-purple-500' href='/'>Conditions</Link><br />
            <Link className='font-[200] hover:text-purple-500' href='/'>Privacy Policy</Link>
          </div>
          <div>
            <div className='text-purple-500 font-bold text-xl'>Contact us</div>
            <Link className='font-[200] hover:text-purple-500' href="mailto:s.mart.pvt.app@gmail.com">s.mart.pvt.app@gmail.com</Link>
          </div>
        </div>
      </div>
        <div className='bg-purple-600 p-3 flex justify-center items-center mt-4'>
        <div className="text-white font-medium text-xs"> Copyright&copy; 2024. All rights reserved by <Link href="#home" className="text-yellow-600">S-mart</Link> </div>
        </div>
    </div>
  )
}

export default Footer
