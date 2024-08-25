'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Loader2, Pencil, Trash2, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Modal from '@/components/Modal';
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
import { updateProduct } from '@/schemas/productSchema';

const page = () => {

  const { data: session, status } = useSession()
  const [flag, setFlag] = useState(false)
  const [productArray, setProductArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const [isFormSubmitting, setIsFormSubmitting] = useState(false)

  const [clickEdit, setClickEdit] = useState(false)

  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false)

  const [previousFormData, setPreviousFormData] = useState({name:'', description:'', specification:'', images:[''], quantity:0, price:0, shippingCharge:0, discount:0})

  useEffect(() => {
    if(session && !flag){
      (async () =>{
        setIsLoading(true)
        console.log(session,'session')
        const response = await axios.get(`/api/store/product?userEmail=${session?.user.email}&allProducts=true`);
        if(response.data.success){
          console.log(response.data)
          setProductArray(response.data.products)
        }
        setIsLoading(false)
      }
      )()
      setFlag(true)
      console.log(previousFormData)
    }
  }, [session, flag, previousFormData])


  const form = useForm<z.infer<typeof updateProduct>>({
    resolver:zodResolver(updateProduct),
    defaultValues:{
      name:previousFormData.name,
      description:previousFormData.description,
      specification:previousFormData.specification,
      images:previousFormData.images,
      quantity:previousFormData.quantity,
      price:previousFormData.price,
      shippingCharge:previousFormData.shippingCharge,
      discount:previousFormData.discount
    }
  })

  const fileRef = form.register("images")

  const handleEditButton = async (productId:any) =>{
    setClickEdit(true);
    setIsEditButtonClicked(true);
    const response = await axios.get(`/api/store/product?productId=${productId}&userEmail=${session?.user.email}`)
    if(response.data.success){
      console.log('prv data',response.data.product)
      setPreviousFormData(response.data.product)
    }
    setIsEditButtonClicked(false);
  }

  const onSubmitEditProduct = () => {
    

  }
  

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <div className='flex gap-5 flex-col'>
      <div className="title text-2xl text-black font-bold pt-5">Your Products</div>
      <div className='md:mx-10 mx-auto my-10 md:p-10 p-3  bg-purple-500 bg-opacity-50 rounded-[16px] w-auto outline-2 outline-offset-4 hover:outline-[rebeccapurple] outline-transparent outline'>
        {clickEdit && 
          <Modal>
            <div className="w-auto flex justify-end"><button type="button" onClick={() => setClickEdit(false)} title='close'><X className='text-white size-8'/></button></div>
            { isEditButtonClicked ? <div className='flex justify-center items-center'><div className='flex flex-col gap-2 items-center'><Loader2 className='size-8 animate-spin text-purple-400'/><div className='font-semibold text-purple-400'>Please wait</div></div></div>
               : 
               <div className='bg-purple-300 p-4 rounded-[16px] w-auto'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitEditProduct)} className='space-y-8'>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className='md:flex md:gap-3 md:items-center'>
                    <FormLabel className='md:font-bold md:text-lg md:px-3'>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className='md:flex md:gap-3 md:items-center'>
                    <FormLabel className='md:font-bold md:text-lg md:px-3'>Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specification"
                render={({ field }) => (
                  <FormItem className='md:flex md:gap-3 md:items-center'>
                    <FormLabel className='md:font-bold md:text-lg md:px-3'>Specification</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem className='md:flex md:gap-3 md:items-center'>
                    <FormLabel className='md:font-bold md:text-lg md:px-3'>Images</FormLabel>
                    <FormControl>
                      <Input type='file' multiple accept='image/*'
                        {...fileRef}
                      // onChange={e => field.onChange(e.target.files)}
                      // ref={field.ref}
                      // onBlur={field.onBlur}
                      // name={field.name}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='md:grid md:grid-cols-2 md:gap-5'>              
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className='md:flex md:gap-3 md:items-center'>
                    <FormLabel className='md:font-bold md:text-lg md:px-3'>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number"
                        {...field}
                        onChange={event => field.onChange(+event.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className='md:flex md:gap-3 md:items-center'>
                    <FormLabel className='md:font-bold md:text-lg md:px-3'>Price</FormLabel>
                    <FormControl>
                      <Input type="number"
                        {...field}
                        onChange={event => field.onChange(+event.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem className='md:flex md:gap-3 md:items-center'>
                    <FormLabel className='md:font-bold md:text-lg md:px-3'>Discount</FormLabel>
                    <FormControl>
                      <Input type="number"
                        {...field}
                        onChange={event => field.onChange(+event.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shippingCharge"
                render={({ field }) => (
                  <FormItem className='md:flex md:gap-3 md:items-center'>
                    <FormLabel className='md:font-bold md:text-lg md:px-3'>Shipping Charge</FormLabel>
                    <FormControl>
                      <Input type="number"
                        {...field}
                        onChange={event => field.onChange(+event.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              <Button type='submit' className='bg-[rebeccapurple] w-fit text-white font-bold hover:bg-purple-400 outline-1 outline-offset-1 hover:outline outline-purple-700' disabled={isFormSubmitting}>
                        {
                          isFormSubmitting? <div className='flex gap-2 items-center'>
                            <Loader2 className='mx-2 w-4 h-4 animate-spin'/>Please wait
                          </div> : 'Save !'
                        }
            </Button>
            </form>
          </Form>
            </div> 
            }
          </Modal>
        }
        {productArray.length > 0 && !isLoading && productArray.map((ele:any) => {
          return <div key={ele._id} className='product flex gap-4 md:gap-0 md:items-center justify-around md:justify-around bg-[#f2f2f2] p-3 rounded-[16px] my-2 '>
          <div className='image w-30 h-20 shadow-xl rounded-[12px]'>
          <Image className="rounded-[12px]" src={ele?.images[0]} alt='noImg found' width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit:'cover'}}/>
          </div>
          <div className='flex md:flex-row flex-col justify-between md:space-x-40 w-auto'>
            <div className="title font-bold text-xl">{ele?.name}</div>
            <div className="buttons flex justify-around md:space-x-40 w-auto space-x-5">
              <button type="button" onClick={() => handleEditButton(ele._id)} className='edit text-white hover:text-green-500 hover:bg-[#f2f2f2] flex gap-2 items-center bg-purple-400 rounded-[10px] px-3 md:py-2 py-1 outline-1 outline-offset-4 hover:outline-green-500 transition-colors duration-500 outline-transparent outline' title='edit'><Pencil className='size-5'/>Edit</button>
              <button type="button" className='delete text-white hover:text-red-500 hover:bg-[#f2f2f2] flex gap-2 items-center bg-purple-400 rounded-[10px] px-3 md:py-2 py-1 outline-1 outline-offset-4 hover:outline-red-500 transition-colors duration-500 outline-transparent outline' title='delete'><Trash2  className='size-5 text-red-500'/>Delete</button>
            </div>
          </div>
        </div>
        })}
      </div>
        {productArray.length === 0 && !isLoading && <div className='font-bold text-xl text-purple-400 text-center'>No products are listed by you. Add some products to show here</div>}
        {isLoading && <div className='flex justify-center items-center'><div className='flex flex-col gap-2 items-center'><Loader2 className='size-8 animate-spin text-purple-400'/><div className='font-semibold text-purple-400'>Please wait</div></div></div>}
      </div>
    </div>
  )
}

export default page