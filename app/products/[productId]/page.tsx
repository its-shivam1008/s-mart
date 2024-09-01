'use client'
import { fetchOneProduct } from '@/actions/fetchProducts'
import SlideShow from '@/components/SlideShow'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'

const page = ({ params }: any) => {
  // const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [productData, setProductData] = useState({name:'', images:[''], description:'', specification:'', price:0, discount:0})

  useEffect(() => {
    (async () =>{
      setIsLoading(true)
      const res:any = await fetchOneProduct(params.productId)
      if(res.success){
        setProductData(res.product)
        setIsLoading(false)
      }
    })()
  }, [])
  
  

  const images = ['/categoryImages/imageSlider1.jpg', '/categoryImages/imageSlider2.jpg', '/categoryImages/imageSlider3.jpg',  '/categoryImages/imageSlider4.jpg', '/categoryImages/imageSlider5.jpg', '/categoryImages/imageSlider6.jpg']
  return (<>
    {!isLoading &&  <div className="text-3xl min-h-screen bg-green-500 flex items-start">
      <div className="mt-20 bg-blue-300 w-full container md:grid md:grid-cols-[4fr,5fr] ">
        <div className="bg-blue-800 h-fit flex items-center">
          <div className='w-[90%] mx-auto rounded-[12px] h-fit'>
            <SlideShow arrayOfImages={productData.images} imageHeight='full'/>
          </div>
        </div>
        <div className="bg-green-800">l</div>
      </div>
    </div>}
    </>
  )
}

export default page