'use client'
import { Loader2 } from 'lucide-react'
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
import { propertySchema, saveParentCategory, saveSubCategory } from '@/schemas/category';
import { fetchCategories } from '@/actions/categories';

const page = () => {

  const [isParentFormSubmitting, setIsParentFormSubmitting] = useState(false)
  const [isSubFormSubmitting, setIsSubFormSubmitting] = useState(false)

  const [parentCategoriesList, setParentCategoriesList] = useState<any>([])

  const fetchParentCategories = async ()=>{
    const parentCat = await fetchCategories()
    if(parentCat && parentCat.success){
      const parentCatObj = JSON.parse(parentCat?.categoriesArray as string)
      setParentCategoriesList(parentCatObj)
    }
  }

  useEffect(() => {
    fetchParentCategories()
  }, [])
  

  const parentCategory = useForm<z.infer<typeof saveParentCategory>>({
    resolver: zodResolver(saveParentCategory)
  })
  const subCategory = useForm<z.infer<typeof saveSubCategory>>({
    resolver: zodResolver(saveSubCategory)
  })

  const onSubmitParentCategory = async (data: z.infer<typeof saveParentCategory>) => {

  }
  const onSubmitSubCategory = async (data: z.infer<typeof saveParentCategory>) => {

  }

  return (
    <div className='flex flex-col gap-16'>
      <div className='flex flex-col gap-8'>
        <h1 className='text-3xl font-bold'>Add Category</h1>
        <div className='flex flex-col gap-4'>
          <h1>Parent category</h1>
          <div className='md:mx-10 mx-auto my-10 md:p-10 p-3 bg-purple-400 bg-opacity-50 rounded-[16px] w-auto outline-2 outline-offset-4 hover:outline-[rebeccapurple] outline-transparent outline'>
            <Form {...parentCategory}>
              <form onSubmit={parentCategory.handleSubmit(onSubmitParentCategory)} className='space-y-8'>
                <FormField
                  control={parentCategory.control}
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
                  control={parentCategory.control}
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
                <Button type='submit' className='bg-[rebeccapurple] w-fit text-white font-bold hover:bg-purple-400 outline-1 outline-offset-1 hover:outline outline-purple-700' disabled={isParentFormSubmitting}>
                  {
                    isParentFormSubmitting ? <div className='flex gap-2 items-center'>
                      <Loader2 className='mx-2 w-4 h-4 animate-spin' />Please wait
                    </div> : 'Save !'
                  }
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <h1>Sub category</h1>
          <div className='md:mx-10 mx-auto my-10 md:p-10 p-3 bg-purple-400 bg-opacity-50 rounded-[16px] w-auto outline-2 outline-offset-4 hover:outline-[rebeccapurple] outline-transparent outline'>
            <Form {...subCategory}>
              <form onSubmit={subCategory.handleSubmit(onSubmitSubCategory)} className='space-y-8'>
                <FormField
                  control={subCategory.control}
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
                  control={subCategory.control}
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
                        control={subCategory.control}
                        name="parentCategoryName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Parent Category</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a category for your products" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {
                                    parentCategoriesList.map((element:any, index:number) => {
                                      <SelectItem key={index} value={element}>{element}</SelectItem>             
                                    })
                                  }           
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                  />
                <Button type='submit' className='bg-[rebeccapurple] w-fit text-white font-bold hover:bg-purple-400 outline-1 outline-offset-1 hover:outline outline-purple-700' disabled={isSubFormSubmitting}>
                  {
                    isSubFormSubmitting ? <div className='flex gap-2 items-center'>
                      <Loader2 className='mx-2 w-4 h-4 animate-spin' />Please wait
                    </div> : 'Save !'
                  }
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div>Update Category</div>
    </div>
  )
}

export default page