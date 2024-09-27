'use client'
import { fetchCategories, fetchCategoryProduct } from '@/actions/categories'
import CardSkeletonLoading from '@/components/CardSkeletonLoading'
import Loading from '@/components/Loading'
import ProductCards from '@/components/ProductCards'
import SlideShow from '@/components/SlideShow'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const page = () => {
    const images = ['https://res.cloudinary.com/di8z1aufv/image/upload/v1727020995/imageslider1_xpp5h7.jpg', 'https://res.cloudinary.com/di8z1aufv/image/upload/v1727020997/imageSlider2_nyxdlf.jpg', 'https://res.cloudinary.com/di8z1aufv/image/upload/v1727020994/imageSlider3_kk12sz.jpg', 'https://res.cloudinary.com/di8z1aufv/image/upload/v1727021002/imageSlider4_riajyf.jpg', 'https://res.cloudinary.com/di8z1aufv/image/upload/v1727020997/imageSlider5_hyk7zm.jpg', 'https://res.cloudinary.com/di8z1aufv/image/upload/v1727021013/imageSlider6_oyr1lj.jpg']

    const [categoryNameArrayObj, setCategoryNameArrayObj] = useState<any>([])

    const [categoryProducts, setCategoryProducts] = useState<any>({})

    const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
    const [isProductLoading, setIsProductLoading] = useState(false)
    const [flag, setFlag] = useState(false)


    useEffect(() => {
        (async () => {
            setIsCategoriesLoading(true)
            const categories = await fetchCategories();
            if (categories && categories.success) {
                const categoryNameArrayObj = JSON.parse(categories.categoriesArray as string)
                setCategoryNameArrayObj(categoryNameArrayObj)
            }
            setIsCategoriesLoading(false)
        })()
    }, [])

    const fetchProductsFromCategory = async (categoryNameArrayObj:any) => {
        setIsProductLoading(true)
        for (let a of categoryNameArrayObj) {
            const arrayOfProducts = await fetchCategoryProduct(a.name)
            if (arrayOfProducts?.success) {
                const aId = a.id
                const productObj = {
                    [aId]: JSON.parse(arrayOfProducts?.categoryProducts as string)
                }
                setCategoryProducts((prevState: any) => ({ ...prevState, ...productObj }))
                // console.log(categoryProducts)
            }
        }
        setIsProductLoading(false)
    }

    useEffect(() => {
        if (categoryNameArrayObj.length > 0 && !flag) {
            // console.log('le pothe ki nhi chala')
            if (categoryNameArrayObj.length > 0) {
                fetchProductsFromCategory(categoryNameArrayObj)
            }
            setFlag(true)
        }
    }, [flag, categoryNameArrayObj])


    return (
        <div>
            <SlideShow arrayOfImages={images} imageHeight='h-[80vh]' />
            <div className='container mx-auto'>
                {
                    isCategoriesLoading ?
                        <div className='mx-auto'><Loading /></div>
                        :
                        categoryNameArrayObj.map((element: any, index: number) => {
                            return (<div key={index} className='flex flex-col gap-4 my-10 font-mono'>
                                <Link href={`/categories/${element.name}`} className='text-2xl font-bold transition-colors duration-300 hover:text-purple-500'>{element.name}</Link>
                                <div className='flex md:flex-row  flex-col justify-around items-center'>
                                    {
                                        categoryProducts[element.id]?.map((elem: any, index: number) => {
                                            return (
                                                <div key={index}>
                                                    {
                                                        isProductLoading ? <CardSkeletonLoading /> : <ProductCards cardInfo={elem} />
                                                    }
                                                </div>
                                            )
                                        }) || <p>No products found</p>
                                    }
                                    <Link href={`/categories/${element.name}`} className='w-48 h-60 flex justify-center items-center bg-gray-300 rounded-[12px] shadow-xl shadow-purple-500'>
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
  