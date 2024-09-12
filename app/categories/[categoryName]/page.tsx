'use client'
import { fetchAllCategoryProduct, fetchCategory } from '@/actions/categories'
import Loading from '@/components/Loading'
import ProductCards from '@/components/ProductCards'
import SlideShow from '@/components/SlideShow'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const page = ({ params }: any) => {
  const images = ['/categoryImages/cat1.jpg', '/categoryImages/cat2.jpg', '/categoryImages/cat3.jpg', '/categoryImages/cat4.jpg', '/categoryImages/cat5.jpg']

  const [products, setProducts] = useState<any>([])
  const [filterCategory, setFilterCategory] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const decodedUri = decodeURIComponent(params.categoryName)
      console.log(decodedUri)
      const categoryProduct = await fetchAllCategoryProduct(decodedUri)
      const category = await fetchCategory(decodedUri)
      if (categoryProduct?.success && category?.success) {
        const arrayOfObjs = JSON.parse(categoryProduct?.categoryProducts as string)
        const categoryObjs = JSON.parse(category?.categoriesObj as string)
        console.log('le pothe ki', categoryObjs)
        setProducts(arrayOfObjs)
        setFilterCategory(categoryObjs)
      }
      setIsLoading(false)
    })()
  }, [])


  return (
    <div>
      <SlideShow arrayOfImages={images} imageHeight='h-[80vh]' />
      <div className='container mx-auto'>
        {
          isLoading ? <div className='mx-auto'> <Loading /></div> : <><div className=' my-5 flex justify-between items-center'>
            <div className="text-2xl font-bold">{products[0]?.category?.parentCategory?.name}</div>
            <div className='flex'>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Sub Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{filterCategory?.name}</SelectLabel>
                    {
                      filterCategory?.subCategory?.map((element:any, index:number) => {
                        return (
                          <SelectItem key={index} value={element.name}>{element.name}</SelectItem>
                        )
                      })
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
            <div className='flex flex-col md:flex-row md:flex-wrap gap-6 w-full mx-auto'>
              {
                products.map((element: any, index: number) => {
                  return (
                    <div key={index}><ProductCards cardInfo={element} /></div>
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