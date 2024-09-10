'use client'
import { fetchCategories } from '@/actions/categories'
import CardSkeletonLoading from '@/components/CardSkeletonLoading'
import Loading from '@/components/Loading'
import SlideShow from '@/components/SlideShow'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const page = () => {
    const images = ['/categoryImages/imageSlider1.jpg', '/categoryImages/imageSlider2.jpg', '/categoryImages/imageSlider3.jpg',  '/categoryImages/imageSlider4.jpg', '/categoryImages/imageSlider5.jpg', '/categoryImages/imageSlider6.jpg']

    const [categoryNameArrayObj, setCategoryNameArrayObj] = useState<any>([])

    const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);



    useEffect(() => {
        (async () => {
            setIsCategoriesLoading(true)
            const categories = await fetchCategories();
            if(categories && categories.success){
                const categoryNameArrayObj = JSON.parse(categories.categoriesArray as string)
                setCategoryNameArrayObj(categoryNameArrayObj)
            }
            setIsCategoriesLoading(false)
        })()
    }, [])
    

  return (
    <div>
        <SlideShow arrayOfImages={images} imageHeight='h-[80vh]'/>        
        <div className='container mx-auto'>
            {
                isCategoriesLoading ? 
                <div className='mx-auto'><Loading /></div> 
                    : 
                    categoryNameArrayObj.map((element:any, index:number) =>{
                        return (<div key={index} className='flex flex-col gap-4 my-10 font-mono'>
                            <Link href={`/categories/${element.id}`} className='text-2xl font-bold transition-colors duration-300 hover:text-purple-500'>{element.name}</Link>
                            <div className='flex md:flex-row  flex-col justify-around items-center'>
                                {
                                    [...Array(4)].map((element, index) =>{ 
                                        return (
                                            <div key={index}>
                                                <CardSkeletonLoading />
                                            </div>
                                        )
                                    })
                                }
                                <Link href={`/categories/${element.id}`} className='w-48 h-60 flex justify-center items-center bg-gray-300 rounded-[12px] shadow-xl shadow-purple-500'>
                                    <div className='text-gray-800 font-mono text-xl font-bold transition-colors duration-500 hover:text-purple-800 cursor-pointer'>See all</div>
                                </Link>
                            </div>
                        </div>)
                    })
            }
        </div>
    </div>
  )
}

export default page