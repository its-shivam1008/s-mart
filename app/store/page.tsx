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
import { basicStoreInfo, businessAddress, paymentIntegration } from '@/schemas/StoreInfo'
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

  const businessAddressForm = useForm<z.infer<typeof businessAddress>>({
    resolver:zodResolver(businessAddress),
    defaultValues:{
      address:'',
      street:'',
      pincode:0,
      city:'',
      state:'',
      country:'',
    }
  })

  const paymentIntegrationForm = useForm<z.infer<typeof paymentIntegration>>({
    resolver:zodResolver(paymentIntegration),
    defaultValues:{
      id:'',
      secret:''
    }
  })

  const onSubmitBasicInfo = () => {

  }
  const onSubmitBusinessAddress = () => {

  }
  const onSubmitPaymentIntergration = () => {

  }
  return (
    <div className='w-full min-h-screen h-auto bg-[#f2f2f2] flex justify-center items-center'>
      <div className="w-[80%] h-[50%]  py-28 my-auto mx-auto">
        <div className=' w-fit mx-auto space-y-8 px-6 py-3'>
          <h1 className='text-[rebeccapurple] font-extrabold text-center text-4xl'>Getting started with your store</h1>
          <div className='text-gray-400 text-center text-normal'>Please fill these sections to publish your first product</div>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger><div className='px-2 py-4 rounded-xl text-[#f2f2f2] mx-auto w-full bg-[rebeccapurple]/50 '>Basic Information</div></AccordionTrigger>
            <AccordionContent>
              <div className='flex flex-col justify-center items-center h-fit py-8 px-2 bg-gray-100'>
                <div className='w-full max-w-md px-8 py-3 space-y-4 bg-white rounded-lg shadow-md '>
                  <Form {...basicInfoForm}>
                    <form onSubmit={basicInfoForm.handleSubmit(onSubmitBasicInfo)} className='space-y-4'>
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
            <AccordionTrigger><div className='px-2 py-4 rounded-xl text-[#f2f2f2] mx-auto w-full bg-[rebeccapurple]/50 '>Business Address</div></AccordionTrigger>
            <AccordionContent>
            <div className='flex flex-col justify-center items-center h-fit py-8 px-2 bg-gray-100'>
                <div className='w-full max-w-md px-8 py-3 space-y-4 bg-white rounded-lg shadow-md '>
                  <Form {...businessAddressForm}>
                    <form onSubmit={businessAddressForm.handleSubmit(onSubmitBusinessAddress)} className='space-y-4'>
                      <FormField
                        control={businessAddressForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
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
                        control={businessAddressForm.control}
                        name="street"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street</FormLabel>
                            <FormControl>
                              <Input placeholder="Avenue park street"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={businessAddressForm.control}
                        name="pincode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pincode</FormLabel>
                            <FormControl>
                              <Input type='number' placeholder="308001"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={businessAddressForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Jaipur"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={businessAddressForm.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="Rajasthan"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={businessAddressForm.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input placeholder="India"
                                {...field}
                              />
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
            <AccordionTrigger><div className='px-2 py-4 rounded-xl text-[#f2f2f2] mx-auto w-full bg-[rebeccapurple]/50 '>Payment Integration</div></AccordionTrigger>
            <AccordionContent>
            <div className='flex flex-col justify-center items-center h-fit py-8 px-2 bg-gray-100'>
                <div className='w-full max-w-md px-8 py-3 space-y-4 bg-white rounded-lg shadow-md '>
                  <Form {...paymentIntegrationForm}>
                    <form onSubmit={paymentIntegrationForm.handleSubmit(onSubmitPaymentIntergration)} className='space-y-4'>
                      <FormField
                        control={paymentIntegrationForm.control}
                        name="id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Razorpay Id</FormLabel>
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
                        control={paymentIntegrationForm.control}
                        name="secret"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Razorpay secret</FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                              />
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
      </div>
    </div>
  )
}

export default page
