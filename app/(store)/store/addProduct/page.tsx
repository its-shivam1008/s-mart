'use client'
import React, { useEffect, useState } from 'react';
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
import { saveProduct } from '@/schemas/productSchema';
import { useSession } from 'next-auth/react';
import { productSubCategory } from '@/actions/ProductCat';

function page() {

  const [subCatArray, setSubCatArray] = useState<string[] | undefined>([]);
  const { data: session, status } = useSession()
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    if(session && !flag){
      (async () =>{
        console.log(session);
        
        const arrayOfSubCat = await productSubCategory(session.user.email as string)
        console.log(arrayOfSubCat)
        if(arrayOfSubCat?.success){
          setSubCatArray(arrayOfSubCat.subCat)
        }
        setFlag(true)
      })()
      
    }
  }, [session, flag])
  

  //zod implementaion for adding the product
  const form = useForm<z.infer<typeof saveProduct>>({
    resolver:zodResolver(saveProduct),
    defaultValues:{
      name:'',
      description:'',
      specification:'',
      category:{
        subCategory:{
          name:''
        },
      }
    }
  })

  const onSubmit = () =>{

  }
  
  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <div className='flex gap-5 flex-col'>
        <div className="title text-2xl text-black font-bold">Add a new product</div>
        <div className='mx-auto bg-blue-400 '>
        <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
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
                          <FormItem>
                            <FormLabel>Description</FormLabel>
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
                          <FormItem>
                            <FormLabel>Specification</FormLabel>
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
                        name="category.subCategory.name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sub Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a sub category for your products" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {flag && subCatArray?.map((ele)=><SelectItem value={ele}>{ele}</SelectItem>)}
                                </SelectContent>
                              </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                              <Input type="number"
                                {...field}
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
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input type="number"
                                {...field}
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
                          <FormItem>
                            <FormLabel>Discount</FormLabel>
                            <FormControl>
                              <Input type="number"
                                {...field}
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
                          <FormItem>
                            <FormLabel>Shipping Charge</FormLabel>
                            <FormControl>
                              <Input type="number"
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
                          <FormItem>
                            <FormLabel>Images</FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type='submit' className='bg-[rebeccapurple] w-fit text-white font-bold hover:bg-purple-400 outline-1 outline-offset-1 hover:outline outline-purple-700' >
                        Save
                    </Button>
                    </form>
                  </Form>
        </div>
      </div>
    </div>
  );
}

export default page;
