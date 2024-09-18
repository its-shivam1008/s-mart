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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import SlideShow from '@/components/SlideShow'

import React, { useEffect, useState } from 'react'
import { searchProduct } from '@/schemas/productSchema'
import { Loader2 } from 'lucide-react'

const page = () => {

  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
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
    const response = await searchProducts(value.search)
    if(response.success){
      const productsOBJS = JSON.parse(response.product as string)
      setProducts(productsOBJS)
    }
    setIsFormSubmitting(false)
  }

  useEffect(() =>{
    window.addEventListener('scroll', handleInfiniteScroll)
    return () => { window.removeEventListener('scroll', handleInfiniteScroll) }
  }, [])
  
  const images = ['/categoryImages/imageSlider1.jpg', '/categoryImages/imageSlider2.jpg', '/categoryImages/imageSlider3.jpg',  '/categoryImages/imageSlider4.jpg', '/categoryImages/imageSlider5.jpg', '/categoryImages/imageSlider6.jpg']
  return (
    <div className='mt-20'> 
      {/* <SlideShow arrayOfImages={images} imageHeight='h-[80vh]'/>         */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
      <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem className='md:flex md:gap-3 md:items-center'>
                    <FormControl>
                      <Input
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
      <ProductComponent productData={products}/>
      { loading && <div className='mb-10'><Loading /></div>}
    </div>
  )
}

export default page