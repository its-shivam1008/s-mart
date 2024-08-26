'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Loader2, Pencil, Trash, Trash2, X } from 'lucide-react';
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
import { deleteImageFromCloudinary, deleteProductImageFromUiAndDB, uploadImageToCloudinary } from '@/actions/CloudinaryProductImage';
import { useToast } from '@/components/ui/use-toast';

const page = () => {

  const { data: session, status } = useSession()
  const [flag, setFlag] = useState(false)
  const [productArray, setProductArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const [isFormSubmitting, setIsFormSubmitting] = useState(false)

  const [clickEdit, setClickEdit] = useState(false)

  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false)
  const [productIdEdit, setProductIdEdit] = useState('');

  const [uploadImgURLS, setUploadImgURLS] = useState<any[]>([])

  const { toast } = useToast()

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
    }
  }, [session, flag])

  
  
  
  const form = useForm<z.infer<typeof updateProduct>>({
    resolver:zodResolver(updateProduct),
    defaultValues:{
      name:previousFormData.name,
      description:previousFormData.description,
      specification:previousFormData.specification,
      quantity:previousFormData.quantity,
      price:previousFormData.price,
      shippingCharge:previousFormData.shippingCharge,
      discount:previousFormData.discount
    }
  })
  useEffect(() => {
    form.setValue('name', previousFormData.name);
    form.setValue('description', previousFormData.description);
    form.setValue('specification', previousFormData.specification);
    form.setValue('quantity', previousFormData.quantity);
    form.setValue('price', previousFormData.price);
    form.setValue('shippingCharge', previousFormData.shippingCharge);
    form.setValue('discount', previousFormData.discount);
  }, [previousFormData])

  const fileRef = form.register("images")

  const handleEditButton = async (productId:any) =>{
    setClickEdit(true);
    setIsEditButtonClicked(true);
    setProductIdEdit(productId)
    const response = await axios.get(`/api/store/product?productId=${productId}&userEmail=${session?.user.email}`)
    if(response.data.success){
      console.log('prv data',response.data.product)
      setPreviousFormData(response.data.product)
      
    }
    setIsEditButtonClicked(false);
  }

  const deleteImage = async (imageUrl:string) =>{
    toast({
      title:'Please wait...',
      description:'Deleting the image'
    })
    setIsEditButtonClicked(true)
    const resOfCloudinary = await deleteImageFromCloudinary(imageUrl)
    const resOfDb = await deleteProductImageFromUiAndDB(productIdEdit,imageUrl)
    if(resOfDb.success && resOfCloudinary.result === 'ok'){
      const product = JSON.parse(resOfDb?.stringifyProduct as string)
      setPreviousFormData({
        name:product?.name as string,
        description:product?.description as string,
        specification:product?.specification as string,
        quantity:product?.quantity as number,
        price:product?.price as number,
        shippingCharge:product?.shippingCharge as number,
        discount:product?.discount as number,
        images:product?.images as string[]
      })
    }
    console.log(resOfCloudinary, resOfDb)
    setIsEditButtonClicked(false)
    toast({
      variant: "destructive",
      title:'Image deleted',
    })
  }

  const onSubmitEditProduct = async (updateData: z.infer<typeof updateProduct>) => {
    setIsFormSubmitting(true)
    if(updateData.images.length > 0){
      // converting the udateData.images to formData as we can only send plain objects to server side so we are making it as form data
      const uploadPromises = Array.from(updateData.images).map(async (file) => {
        const formData = new FormData();
        formData.append('file', (file as any));
        formData.append('upload_preset', 'product_image_upload'); // Cloudinary upload preset
        formData.append('cloud_name', `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`); // Cloudinary cloud name
    
        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, // Replace  cloud name
            formData
          );
          console.log(response.data)
          return response.data.secure_url; // This is the URL of the uploaded image
        } catch (error) {
          console.error('Error uploading to Cloudinary', error);
          return null;
        }
      });
      // Wait for all uploads to finish
      const uploadedImageUrls = await Promise.all(uploadPromises);
      setUploadImgURLS(uploadedImageUrls)
    }
    var data = {}
    if(updateData.name === previousFormData.name){
      data = {
        payload: {
          // name: updateData.name,
          description:  updateData.description,
          specification:  updateData.specification,
          quantity:  updateData.quantity,
          price:  updateData.price,
          discount:  updateData.discount,
          shippingCharge:  updateData.shippingCharge,
          images:  uploadImgURLS.length > 0 ? uploadImgURLS : previousFormData.images,
        },
        session,
        productId:productIdEdit
      }
    }else{
      data={
        payload: {
          name: updateData.name,
          description:  updateData.description,
          specification:  updateData.specification,
          quantity:  updateData.quantity,
          price:  updateData.price,
          discount:  updateData.discount,
          shippingCharge:  updateData.shippingCharge,
          images:  uploadImgURLS.length > 0 ? uploadImgURLS : previousFormData.images,
        },
        session,
        productId:productIdEdit
      }
    }

    const response = await axios.put('/api/store/product',data);
    if(!response.data.success){
      toast({
        variant: "destructive",
        title:'Some error occured',
        description:response.data.message
      })
      setIsFormSubmitting(false)
    }else{
      toast({
        title:'Success 🎉',
        description:response.data.message
      })
      setIsFormSubmitting(false)
    }
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
            <form onSubmit={form.handleSubmit(onSubmitEditProduct)} className='space-y-4'>
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
              <div className='flex justify-around overflow-x-auto py-2'>
                {previousFormData.images.length > 0 &&  previousFormData.images.map((ele)=>{
                  return <div className='relative'><Trash onClick={() => deleteImage(ele)} className='text-red-500 size-5 cursor-pointer absolute -top-2 -right-2'/><div className='image w-30 h-20 shadow-xl rounded-[12px]'>
                  <Image className="rounded-[12px]" src={ele} alt='noImg found' width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit:'cover'}}/>
                  </div></div>
                })}
              </div>
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem className='md:flex md:gap-3 md:items-center'>
                    <FormLabel className='md:font-bold md:text-lg md:px-3'> Add more Images</FormLabel>
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
          return <div key={ele._id} className='product flex gap-4 md:gap-0 md:items-center justify-around md:justify-around bg-[#f2f2f2] p-3 rounded-[16px] my-5 '>
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