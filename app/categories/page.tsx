import CardSkeletonLoading from '@/components/CardSkeletonLoading'
import SlideShow from '@/components/SlideShow'
import Link from 'next/link'
import React from 'react'

const page = () => {
    const images = ['/categoryImages/imageSlider1.jpg', '/categoryImages/imageSlider2.jpg', '/categoryImages/imageSlider3.jpg',  '/categoryImages/imageSlider4.jpg', '/categoryImages/imageSlider5.jpg', '/categoryImages/imageSlider6.jpg']
  return (
    <div>
        <SlideShow arrayOfImages={images} imageHeight='h-[80vh]'/>        
        <div className='container mx-auto'>
            <div className='flex flex-col gap-4 my-8'>
                <Link href='/categories/Electronics' className='text-2xl font-bold transition-colors duration-300 hover:text-purple-500'>Electronics</Link>
                <div className='flex justify-around items-center'>
                    {
                        [...Array(4)].map((element, index) =>{ 
                            return (
                                <div key={index}>
                                    <CardSkeletonLoading />
                                </div>
                            )
                        })
                    }
                    <div className='w-48 h-80 flex justify-center items-center bg-gray-500 rounded-[12px]'>
                        <div className='text-gray-700 font-bold font-serif'>See all</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page