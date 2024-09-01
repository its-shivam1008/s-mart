'use client'
import { fetchOneProduct } from '@/actions/fetchProducts'
import SlideShow from '@/components/SlideShow'
import axios from 'axios'
import { ShoppingBag } from 'lucide-react'
import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'

const page = ({ params }: any) => {
  // const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [productData, setProductData] = useState({ name: '', images: [''], description: '', specification: '', price: 0, discount: 0 })

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const res: any = await fetchOneProduct(params.productId)
      const productsJSONObjects = JSON.parse(res.product as string)
      if (res.success) {
        setProductData(productsJSONObjects)
        setIsLoading(false)
      }
    })()
  }, [])



  const images = ['/categoryImages/imageSlider1.jpg', '/categoryImages/imageSlider2.jpg', '/categoryImages/imageSlider3.jpg', '/categoryImages/imageSlider4.jpg', '/categoryImages/imageSlider5.jpg', '/categoryImages/imageSlider6.jpg']
  return (<>
    {!isLoading && <div className="min-h-screen bg-green-500 flex items-start">
      <div className="mt-20 bg-blue-300 w-full container md:grid md:grid-cols-[4fr,5fr] ">
        <div className="bg-[#f2f2f2] shadow-emerald-500 h-fit flex items-center py-4 rounded-[20px]">
          <div className='w-[90%] mx-auto rounded-[12px] h-fit'>
            <SlideShow arrayOfImages={productData.images} imageHeight='h-80' />
          </div>
        </div>
        <div className="bg-green-800 p-5 flex flex-col justify-between">
          <div className="text-2xl font-bold">{productData.name}</div>
          <div className="text-lg">{productData.description}</div>
          <div className="price and button flex justify-between items-center">
            <div className="text-xl">{productData.price}</div>
            <button type='button' className="relative inline-flex items-center justify-start px-6 py-1.5 overflow-hidden font-medium transition-all bg-purple-500 rounded-xl group">
              <span className="absolute top-0 right-0 inline-block w-5 h-5 transition-all duration-500 ease-in-out bg-purple-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-purple-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"><div className='flex gap-2 items-center text-3xl'><ShoppingBag /> Buy</div></span>
            </button>
          </div>
        </div>
        <div className='my-4 space-y-8'>
          <div className="space-y-4">
            <div className="text-xl font-bold">Specification</div>
            <div className='text-lg'>{productData.specification}</div>
          </div>
          <div className="addReview">
            <div className="Rating">
              
            </div>
          </div>
        </div>
        <div className='my-4 space-y-4'>
          <div className="text-xl font-bold">Lol</div>
          <div className='text-lg'>{productData.specification}</div>
        </div>
      </div>
    </div>}
  </>
  )
}

export default page