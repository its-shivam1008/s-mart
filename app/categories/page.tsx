import SlideShow from '@/components/SlideShow'
import React from 'react'

const page = () => {
    const images = ['/categoryImages/imageSlider1.jpg', '/categoryImages/imageSlider2.jpg', '/categoryImages/imageSlider3.jpg',  '/categoryImages/imageSlider4.jpg', '/categoryImages/imageSlider5.jpg', '/categoryImages/imageSlider6.jpg']
  return (
    <div>
        <SlideShow arrayOfImages={images} imageHeight='h-[80vh]'/>        
        <div className='container mx-auto'>
            <div className='flex flex-col gap-4 my-8'>
                <div className='text-xl '>Electronics </div>
                <div>
                    {
                        
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default page