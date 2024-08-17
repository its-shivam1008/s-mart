'use client'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Loader2, LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { basicStoreInfo } from '@/schemas/basicStoreInfo'
import * as z from 'zod'


const page = () => {

  // zod implementation 
  const basicInfoForm = useForm<z.infer<typeof basicStoreInfo>>({
    resolver: zodResolver(basicStoreInfo),
    defaultValues: {
      owner_name: '',
      contact: '',
      businessName: '',
      storeName: '',
      category: ''
    }
  })

  const onSubmit = () => {

  }
  return (
    <div className='w-full h-screen bg-blue-400 flex justify-center items-center'>
      <div className="w-[50%] h-[50%] bg-orange-400">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Basic Info</AccordionTrigger>
            <AccordionContent>
              <div className='flex flex-col justify-center items-center h-fit py-8 px-2 bg-gray-100'>
                <div className='w-full max-w-md px-8 py-3 space-y-4 bg-white rounded-lg shadow-md '>
                  <Form {...basicInfoForm}>
                    <form onSubmit={basicInfoForm.handleSubmit(onSubmit)} className='space-y-4'>
                      <FormField
                        control={basicInfoForm.control}
                        name="owner_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Store Owner's name</FormLabel>
                            <FormControl>
                              <Input placeholder="John doe"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={basicInfoForm.control}
                        name="contact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact number</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 XXXX XXXXX"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={basicInfoForm.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business name</FormLabel>
                            <FormControl>
                              <Input placeholder="Example Enterprise"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={basicInfoForm.control}
                        name="storeName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Store name</FormLabel>
                            <FormControl>
                              <Input placeholder="ABC"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={basicInfoForm.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a category for your products" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Electronics">Electronics</SelectItem>
                                  <SelectItem value="Fashion">Fashion</SelectItem>
                                  <SelectItem value="Home & Furniture">Home & Furniture</SelectItem>
                                  <SelectItem value="Books">Books</SelectItem>
                                  <SelectItem value="Beauty & Personal Care">Beauty & Personal Care</SelectItem>
                                  <SelectItem value="Sports & Outdoors">Sports & Outdoors</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type='submit'>
                        Save !
                    </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default page
