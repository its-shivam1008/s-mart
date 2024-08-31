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
  
  return (
    <div> 
      {/* <SlideShow/>         */}
      <ProductComponent productData={products}/>
      { loading && <Loading />}
    </div>
  )
}

export default page