'use client'
import SlideShow from '@/components/SlideShow'
import React from 'react'
// import { useRouter } from 'next/navigation'

const page = ({ params }: any) => {
  // const router = useRouter()
  const images = ['/categoryImages/imageSlider1.jpg', '/categoryImages/imageSlider2.jpg', '/categoryImages/imageSlider3.jpg',  '/categoryImages/imageSlider4.jpg', '/categoryImages/imageSlider5.jpg', '/categoryImages/imageSlider6.jpg']
  return (
    <div className="text-3xl min-h-screen flex items-start">
      <div className="mt-20  w-full container md:grid md:grid-cols-[4fr,5fr] ">
        <div className="h-fit flex items-center">
          <div className='w-[90%] mx-auto rounded-[12px] h-fit'>
            <SlideShow arrayOfImages={images} imageHeight='full'/>
          </div>
        </div>
        <div className="">l</div>
      </div>
    </div>
  )
}

export default page