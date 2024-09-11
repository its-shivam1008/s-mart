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
      const categoryProduct = await fetchAllCategoryProduct(params.categoryName)
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
          isLoading ? <div className='mx-auto'> <Loading /></div>: <><div className="text-2xl font-bold text-center">lol</div>
          <div className='flex flex-wrap gap-4'>
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