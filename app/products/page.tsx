'use client'
import { fetchProductsFromDB } from '@/actions/fetchProducts'
import ProductComponent from '@/components/ProductComponent'
import SlideShow from '@/components/SlideShow'

import React, { useEffect, useState } from 'react'

const page = () => {

  const [products, setProducts] = useState<any[]>([])
  const getProducts = async ()=>{
    const response = await fetchProductsFromDB(8);
    if(response.success){
      const productsJSONObjects = JSON.parse(response.products as string)
      // console.log(productsJSONObjects)
      return productsJSONObjects
    }
  }

  useEffect(() => {
    (async ()=>{
      const res:any = await getProducts()
      setProducts(res)
    })()
    // return () => {
      
    // }
  }, [])
  
  return (
    <div> 
      {/* <SlideShow/>         */}
      <ProductComponent productData={products}/>
    </div>
  )
}

export default page