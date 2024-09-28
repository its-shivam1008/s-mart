'use client'
import { addReviewOfProduct, deleteReviewOfProduct, fetchOneProduct, showReviewOfProduct } from '@/actions/fetchProducts'
import SlideShow from '@/components/SlideShow'
import axios from 'axios'
import { EllipsisVertical, Loader2, Send, ShoppingBag, Star, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
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
import { Textarea } from "@/components/ui/textarea"
import { addReviewSchema } from '@/schemas/productSchema'
import { useForm } from 'react-hook-form';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { Reviews } from '@/models/Product'
import Image from 'next/image'
import Link from 'next/link'
import Loading from '@/components/Loading'
import { addItemToCart } from '@/actions/addToCartAndWishList'


const ProductPage = ({ params }: any) => {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [rating, setRating] = useState<number>(0)
  const { data: session, status } = useSession()
  const [hover, setHover] = useState<null | number>(null)
  const [productData, setProductData] = useState({ priceAfterDiscount: 0, averageStar: 0, name: '', images: [''], description: '', specification: '', price: 0, discount: 0, quantity: 0, userReviews: [{ userEmail: '', star: 0, review: '' }] })

  const [isLoadingAddReview, setIsLoadingAddReview] = useState(false)

  const [flag, setFlag] = useState(false)
  const [userReview, setUserReview] = useState({ userEmail: '', star: 0, review: '' })
  const [isUserHasReview, setIsUserHasReview] = useState(false)
  const [isUserReviewLoading, setIsUserReviewLoading] = useState(false)
  const [userReviewDeleteBtn, setUserReviewDeleteBtn] = useState(false)

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const res: any = await fetchOneProduct(params.productId)
      console.log(res, 'res')
      const productsJSONObjects = JSON.parse(res.product as string)
      if (res.success) {
        // setProductData(res.product)
        // console.log(res.product)
        console.log(productsJSONObjects)
        setProductData(productsJSONObjects)
        setIsLoading(false)
      }
    })()
  }, [])

  const fetchUserReview = async (productId: string, userEmail: string) => {
    const res2 = await showReviewOfProduct(productId, userEmail)
    console.log(res2)
    if (res2.success) {
      const reviewJSONObjects = JSON.parse(res2.review as string)
      setUserReview(reviewJSONObjects)
      setIsUserHasReview(true)
    }
    setIsUserReviewLoading(false)
  }

  useEffect(() => {
    if (session && !flag) {
      console.log(session);
      fetchUserReview(params.productId, (session?.user.email as string))
      setFlag(true)
    }
  }, [session, flag])


  const form = useForm<z.infer<typeof addReviewSchema>>({
    resolver: zodResolver(addReviewSchema),
    defaultValues: {
      review: '',
      star: rating
    }
  })

  const addReviewOnSubmit = async (data: z.infer<typeof addReviewSchema>) => {
    setIsLoadingAddReview(true)
    const userReviewData = {
      userEmail: session?.user.email,
      review: data.review,
      star: rating
    }
    const response = await addReviewOfProduct(params.productId, userReviewData)
    if (!response.success) {
      setIsLoadingAddReview(false)
      toast({
        variant: "destructive",
        title: 'Some error occured',
        description: response.message
      })
    } else {
      toast({
        title: 'Review added',
        description: response.message
      })
      setIsLoadingAddReview(false)
      setIsUserReviewLoading(true)
      await fetchUserReview(params.productId, (session?.user.email as string))
    }
  }

  const handleDeleteReview = async () => {
    setIsUserHasReview(false);
    setIsUserReviewLoading(true);
    const res3: any = await deleteReviewOfProduct(params.productId, (session?.user.email as string));
    if (res3.success) {
      await fetchUserReview(params.productId, (session?.user.email as string))
      toast({
        title: 'Review deleted',
        description: res3.message
      })
    } else {
      toast({
        variant: "destructive",
        title: 'Some error occured',
        description: res3.message
      })
    }
  }

  const handleBuy = async () => {
    if(session){
      const res = await addItemToCart(session.user.email as string, params.productId, productData.priceAfterDiscount)
      if(res.success || res.isItemPresent){
        toast({
          title: 'Proceeding to checkout 📦',
        })
        router.push('/checkout')
      }
    }else{
      toast({
        title: 'Login / Signup',
        description: "Login or signup to continue shopping."
      })
      router.push('/login')
    }
  }



  const images = ['/categoryImages/imageSlider1.jpg', '/categoryImages/imageSlider2.jpg', '/categoryImages/imageSlider3.jpg', '/categoryImages/imageSlider4.jpg', '/categoryImages/imageSlider5.jpg', '/categoryImages/imageSlider6.jpg']
  return (<>
    {isLoading ? <div className='h-screen flex justify-center items-center'><Loading /></div> : <div className="min-h-screen  flex items-start">
      <div className="mt-20  w-full container md:grid md:grid-cols-[4fr,5fr] gap-4">
        <div className="bg-[#f2f2f2] shadow-purple-500 shadow-2xl h-fit flex items-center py-4 rounded-[20px]">
          <div className='w-[90%] mx-auto rounded-[12px] h-fit'>
            <SlideShow arrayOfImages={productData.images} imageHeight='h-80' />
          </div>
        </div>
        <div className=" p-5 flex flex-col justify-between">
          <div className='flex flex-col gap-3'>
            <div className="text-2xl font-bold">{productData.name}</div>
            <div className="flex flex-col gap-1">
              <div className="ratingsProduct flex gap-2">
                <div className="flex gap-1 items-center">
                  {[...Array(Math.round(productData.averageStar))].map((star, index) => {
                    return (<Star key={index} fill="#ffc107" className='size-4' />)
                  })}
                </div>
                {Math.round(productData.averageStar)}
              </div>
              <div className={`${productData.quantity < 100 ? 'text-red-500': 'hidden'} text-md`}>Only {productData.quantity} are left</div>
            </div>
          </div>
          <div className="text-lg">{productData.description}</div>
          <div className="price and button flex justify-between items-center">
            <div className='flex gap-1 flex-col'>
              <div className='flex gap-2'>
                <div className="text-md line-through">{productData.price}</div>
                <div className="text-md text-green-600">{productData.discount}% off</div>
              </div>
              <div className='text-xl'>{productData.priceAfterDiscount}</div>
            </div>
            <button type='button' onClick={handleBuy} className="relative inline-flex items-center justify-start px-6 py-1.5 overflow-hidden font-medium transition-all bg-purple-500 rounded-xl group">
              <span className="absolute top-0 right-0 inline-block w-5 h-5 transition-all duration-500 ease-in-out bg-purple-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-purple-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"><div className='flex gap-2 items-center text-3xl'><ShoppingBag /> Buy</div></span>
            </button>
          </div>
        </div>
        <div className='mt-10 space-y-10'>
          <div className="space-y-4">
            <div className="text-xl font-bold">Specification</div>
            <div className='text-lg'>{productData.specification}</div>
          </div>
          <div className="Review space-y-5">
            {session ?
              isUserHasReview ?
                <div className='w-full h-fit p-4 flex flex-col gap-2 rounded-[12px] border-2 border-[rebeccapurple] relative'>
                  <div className='absolute top-2 right-2 cursor-pointer' onClick={() => setUserReviewDeleteBtn(!userReviewDeleteBtn)}><EllipsisVertical className='size-5 text-gray-500' />
                    <div onClick={handleDeleteReview} className={`${userReviewDeleteBtn ? '' : 'hidden'} flex cursor-pointer items-center gap-1 bg-[#f2f2f2] px-3 py-2 rounded-[8px] absolute top-5 right-4 shadow-lg`}>Delete <Trash className='text-red-500 size-4' /></div>
                  </div>
                  <div className="flex gap-2">
                    <div className='image size-10 shadow-xl rounded-full'>
                      <Image className="rounded-full" src={session.user.image as string} alt='noImg found' width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="text-xl">{session.user.username}</div>
                  </div>
                  <div className='flex gap-1'>
                    {[...Array(userReview.star)].map((items, idx) => {
                      return (<Star key={idx} fill="#ffc107" className='size-3' />)
                    })}
                  </div>
                  <div className="text-lg">
                    {userReview.review}
                  </div>
                </div>
                : isUserReviewLoading ? <Loading /> : <div className='space-y-8'>
                  <div className="Rating flex gap-2">
                    {[...Array(5)].map((star, index) => {
                      const currentRating = index + 1;
                      return (
                        <label key={index}>
                          <input className='hidden' type="radio" title='Star' name='rating' id='rating' value={currentRating} onClick={() => setRating(currentRating)} />
                          <Star className='cursor-pointer size-10' fill={currentRating <= (hover as number || rating as number) ? "#ffc107" : "transparent"} color={currentRating <= (hover as number || rating as number) ? "#ffc107" : "black"} onMouseEnter={() => setHover(currentRating)} onMouseLeave={() => setHover(null)} />
                        </label>
                      )
                    })
                    }
                  </div>
                  <div className="addReview">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(addReviewOnSubmit)} className="w-2/3 space-y-6">
                        <FormField
                          control={form.control}
                          name="review"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className='text-xl'>Add a Review</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us a little bit about the product"
                                  className="resize-none border-2 border-purple-400"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className='flex gap-2 items-center w-full bg-purple-600' disabled={isLoadingAddReview}>
                          {
                            isLoadingAddReview ? <div className='flex gap-2 items-center'>
                              <Loader2 className='mx-2 w-4 h-4 animate-spin' />Please wait
                            </div> : <>Add <Send /></>
                          }
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>
              : <div className='flex justify-center items-center text-xl font-bold'><Link href='/login' className='text-blue-400 hover:text-blue-600 transition-colors duration-300 mr-2'>Login / Sign-up</Link> to add a review</div>
            }
          </div>
        </div>
        <div className='mt-10 ml-5 space-y-4'>
          <div className="text-xl font-bold">User Reviews</div>
          <hr color='black' />
          <div className={`${productData.userReviews.length === 0 ? 'justify-center items-center' : ''} p-3 flex flex-col gap-5 mt-5`}>{
            productData.userReviews.length > 0 ?

              productData.userReviews.map((ele, index) => {
                return (
                  <div key={index} className='p-4 rounded-[12px] border-2 border-purple-300 flex flex-col gap-2'>
                    <div className="text-lg font-bold">{ele.userEmail}</div>
                    <div className="flex gap-1">
                      {[...Array(ele.star)].map((items, idx) => {
                        return (<Star key={idx} fill="#ffc107" className='size-2' />)
                      })}
                    </div>
                    <div className="text-md">{ele.review}</div>
                  </div>
                )
              })

              : <div className='flex justify-center items-center text-xl font-bold'>No product reviews</div>

          }</div>
        </div>
      </div>
    </div>}
  </>
  )
}

export default ProductPage
