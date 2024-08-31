'use client'
import { fetchProductsFromDB } from '@/actions/fetchProducts'
import Loading from '@/components/Loading'
import ProductComponent from '@/components/ProductComponent'
import SlideShow from '@/components/SlideShow'

import React, { useEffect, useState } from 'react'

const page = () => {

  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const getProducts = async ()=>{
    const response = await fetchProductsFromDB(8);
    if(response.success){
      const productsJSONObjects = JSON.parse(response.products as string)
      // console.log(productsJSONObjects)
      setProducts((prev) => [...prev, ...productsJSONObjects])
      // return productsJSONObjects
    }
    setLoading(false)
  }

  useEffect(() => {
    // (async ()=>{
    //   const res:any = await getProducts()
    //   setProducts((prev) => [...prev, ...res])
    // })()
    getProducts()
    // return () => {
      
    // }
  }, [])

  const handleInfiniteScroll = () =>{
    if(window.innerHeight + document.documentElement.scrollTop>= document.documentElement.scrollHeight ){
      setLoading(true)
      getProducts()      
    }
  }

  useEffect(() =>{
    window.addEventListener('scroll', handleInfiniteScroll)
    return () => { window.removeEventListener('scroll', handleInfiniteScroll) }
  }, [])
  
  const images = ['/categoryImages/imageSlider1.jpg', '/categoryImages/imageSlider2.jpg', '/categoryImages/imageSlider3.jpg',  '/categoryImages/imageSlider4.jpg', '/categoryImages/imageSlider5.jpg', '/categoryImages/imageSlider6.jpg']
  return (
    <div> 
      <SlideShow arrayOfImages={images} imageHeight='[80vh]'/>        
      <ProductComponent productData={products}/>
      { loading && <Loading />}
    </div>
  )
}

export default page