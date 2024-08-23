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
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { checkUserType } from '@/actions/checkUserType';
import { useRouter } from 'next/navigation';

function page() {

  const [subCatArray, setSubCatArray] = useState<string[] | undefined>([]);
  const [parentCateg, setParentCateg] = useState<string | undefined>('')
  const { data: session, status } = useSession()
  const [flag, setFlag] = useState(false)
  const { toast } = useToast()
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const router = useRouter();

  useEffect(() => {
    if (session && !flag) {
      (async () => {
        console.log(session);
        const userType = await checkUserType(session.user.email as string)
        if(userType?.userRole !== 'StoreOwner'){
          router.push('/')
        }
        const arrayOfSubCat = await productSubCategory(session.user.email as string)
        console.log(arrayOfSubCat)
        if (arrayOfSubCat?.success){
          setParentCateg(arrayOfSubCat.parentCat)
          setSubCatArray(arrayOfSubCat.subCat)
        }
        setFlag(true)
      })()
    }
  }, [session, flag])


  //zod implementaion for adding the product
  const form = useForm<z.infer<typeof saveProduct>>({
    resolver: zodResolver(saveProduct),
    defaultValues: {
      name: '',
      description: '',
      specification: '',
      category: {
        parentCategory: {
          name: `${parentCateg}` // this results the empty string fIX needed TODO:
        },
      }
    }
  })

  const fileRef = form.register("images")

  const onSubmit = async (addProdData: z.infer<typeof saveProduct>) => {
    setIsFormSubmitting(true)

    console.log(addProdData)

    const files = addProdData.images; // `addProdData.images` contains the list of files

    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append('file', (file as any));
      formData.append('upload_preset', 'product_image_upload'); // Cloudinary upload preset
      formData.append('cloud_name', `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`); // Cloudinary cloud name

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, // Replace YOUR_CLOUD_NAME with your actual cloud name
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

    console.log('Uploaded image URLs:', uploadedImageUrls);

    const data = {
      payload: {
        name: addProdData.name,
        description:  addProdData.description,
        specification:  addProdData.specification,
        quantity:  addProdData.quantity,
        category: {
          parentCategory: {
            name: parentCateg,
          },
          subCategory: {
            name:  addProdData.category.subCategory.name,
          },
        },
        price:  addProdData.price,
        discount:  addProdData.discount,
        shippingCharge:  addProdData.shippingCharge,
        images:  uploadedImageUrls,
      },
      session
    }
    const response = await axios.post('/api/store/product',data);
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
                        {flag && subCatArray?.map((ele) => <SelectItem value={ele}>{ele}</SelectItem>)}
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
                  <FormItem>
                    <FormLabel>Price</FormLabel>
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
                  <FormItem>
                    <FormLabel>Discount</FormLabel>
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
                  <FormItem>
                    <FormLabel>Shipping Charge</FormLabel>
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
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
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
      </div>
    </div>
  );
}

export default page;
