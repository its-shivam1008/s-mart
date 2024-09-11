'use client'
import { fetchAllCategoryProduct } from '@/actions/categories'
import Loading from '@/components/Loading'
import ProductCards from '@/components/ProductCards'
import SlideShow from '@/components/SlideShow'
import React, { useEffect, useState } from 'react'

const page = ({ params }: any) => {
  const images = ['/categoryImages/cat1.jpg', '/categoryImages/cat2.jpg', '/categoryImages/cat3.jpg', '/categoryImages/cat4.jpg', '/categoryImages/cat5.jpg']

  const [products, setProducts] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const decodedUri = decodeURIComponent(params.categoryName)
      console.log(decodedUri)
      const categoryProduct = await fetchAllCategoryProduct(decodedUri)
      if(categoryProduct?.success){
        const arrayOfObjs = JSON.parse(categoryProduct?.categoryProducts as string)
        console.log('le pothe ki',arrayOfObjs)
        setProducts(arrayOfObjs)
      }
      setIsLoading(false)
    })()
  }, [])
  

  return (
    <div>
      <SlideShow arrayOfImages={images} imageHeight='h-[80vh]'/>
      <div className='container mx-auto'>
        {
          isLoading ? <div className='mx-auto'> <Loading /></div>: <><div className="text-2xl font-bold text-center my-5">{products[0]?.category?.parentCategory?.name}</div>
          <div className='flex flex-col md:flex-row md:flex-wrap gap-6 w-full mx-auto'>
            {
              products.map((element:any,index:number) => {
                return (
                  <div key={index}><ProductCards cardInfo={element}/></div>
                )
              })
            }
          </div>
        </>
        }
      </div>
    </div>
  )
}

export default page