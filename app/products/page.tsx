'use client'
import { fetchProductsFromDB, searchProducts } from '@/actions/fetchProducts'
import Loading from '@/components/Loading'
import ProductComponent from '@/components/ProductComponent'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import SlideShow from '@/components/SlideShow'

import React, { useEffect, useState } from 'react'
import { searchProduct } from '@/schemas/productSchema'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

const page = () => {

  const [products, setProducts] = useState<any[]>([])
  const [searchProductsValue, setSearchProductsValue] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingResults, setLoadingResults] = useState(false)
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const {toast} = useToast();
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

  const form = useForm<z.infer<typeof searchProduct>>({
    resolver:zodResolver(searchProduct)
  })

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

  const onSubmit  = async (value:z.infer<typeof searchProduct>) =>{
    setIsFormSubmitting(true)
    setLoadingResults(true)
    const response = await searchProducts(value.search)
    // console.log(value.search)
    // console.log(response)

    if(response.success){
      const productsOBJS = JSON.parse(response.product as string)
      setSearchProductsValue(productsOBJS)
      console.log(productsOBJS,'prodobjs')
    }else{
      toast({
        title:'No products found'
      })
    }
    setIsFormSubmitting(false)
    setLoadingResults(false)
  }

  useEffect(() =>{
    window.addEventListener('scroll', handleInfiniteScroll)
    return () => { window.removeEventListener('scroll', handleInfiniteScroll) }
  }, [])
  
  const images = ['https://res.cloudinary.com/di8z1aufv/image/upload/v1727020975/cat1_swy3s2.jpg', 'https://res.cloudinary.com/di8z1aufv/image/upload/v1727020976/cat2_k6zjzo.jpg', 'https://res.cloudinary.com/di8z1aufv/image/upload/v1727020985/cat3_ujovrz.jpg',  'https://res.cloudinary.com/di8z1aufv/image/upload/v1727020975/cat4_urofnx.jpg', 'https://res.cloudinary.com/di8z1aufv/image/upload/v1727020975/cat5_ydavq0.jpg']
  return (
    <div> 
      <SlideShow arrayOfImages={images} imageHeight='h-[80vh]'/>        
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex items-center gap-5 justify-center my-10'>
      <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem className='md:flex md:gap-3 md:items-center'>
                    <FormControl>
                      <Input className='w-[280px] border-2 border-[rebeccapurple] border-solid'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <Button type='submit' className='bg-[rebeccapurple] w-fit text-white font-bold hover:bg-purple-400 outline-1 outline-offset-1 hover:outline outline-purple-700' disabled={isFormSubmitting}>
                        {
                          isFormSubmitting? <div className='flex gap-2 items-center'>
                            <Loader2 className='mx-2 w-4 h-4 animate-spin'/>Please wait
                          </div> : 'Search'
                        }
            </Button>
            </form>
          </Form>
      { loadingResults? <Loading/>  : <ProductComponent productData={searchProductsValue}/>}
      <ProductComponent productData={products} />
      { loading && <div className='mb-10'><Loading /></div>}
    </div>
  )
}

export default page