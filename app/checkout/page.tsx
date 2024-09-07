'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { checkUserAddressFormFilled } from '@/actions/checkUserType';
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
import { Input } from "@/components/ui/input"
import { Loader2, CircleCheckBig } from 'lucide-react';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios, { AxiosError } from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { userAddress } from '@/schemas/signUpSchema';
import Loading from '@/components/Loading';
import Image from 'next/image';
import { getCartItemsFromProduct, getItemFromCart } from '@/actions/addToCartAndWishList';

const page = () => {
    const [flag, setFlag] = useState(false)
    const [isAddressFillFlag, setIsAddressFillFlag] = useState(false)
    const { data: session, status } = useSession()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [cartItemsArray, setCartItemsArray] = useState([{name:'', _id:'', images:[''], priceAfterDiscount:0, quantity:0}])
    const { toast } = useToast()

    const [previousFormData, setPreviousFormData] = useState({ address: '', pincode: 0, state: '', street: '', city: '' })

    const isAddressFilled = async (userEmail: string) => {
        setIsSubmitting(true)
        const res = await checkUserAddressFormFilled(userEmail)
        // console.log(res,'res')
        if (res.success) {
            const addressObject = JSON.parse(res.address as string)
            // console.log('addObj',addressObject)
            setIsAddressFillFlag(true)
            setPreviousFormData({
                address: addressObject.address as string,
                street: addressObject.street as string,
                state: addressObject.state as string,
                city: addressObject.city as string,
                pincode: addressObject.pincode as number,
            })
            setIsSubmitting(false)
        } else {
            toast({
                title: 'Fill the Delivery address',
                // description: "A"
            })
            setIsSubmitting(false)
        }
    }

    const userAddressForm = useForm<z.infer<typeof userAddress>>({
        resolver: zodResolver(userAddress),
    })

    useEffect(() => {
        userAddressForm.setValue('address', previousFormData.address);
        userAddressForm.setValue('street', previousFormData.street);
        userAddressForm.setValue('pincode', previousFormData.pincode);
        userAddressForm.setValue('state', previousFormData.state);
        userAddressForm.setValue('city', previousFormData.city);
    }, [previousFormData])

    const fetchProductsFromCart = async (userEmail: string) => {
        const cartItems = await getItemFromCart(userEmail)
        if (cartItems.success) {
            const cartObject = JSON.parse(cartItems.cart as string)
            const productIds = cartObject.map((obj:any) => obj.productId)
            const arrayOfProds = await getCartItemsFromProduct(JSON.stringify(productIds))
            if(arrayOfProds.success){
                setCartItemsArray(JSON.parse(arrayOfProds?.products as string))
            }
        }
    }
    useEffect(() => {
        if (session && !flag) {
            console.log(session);
            isAddressFilled(session.user.email as string)
            fetchProductsFromCart(session.user.email as string)
            setFlag(true)
        }
    }, [session, flag])

    const onSubmitUserAddress = async (userAddressData: z.infer<typeof userAddress>) => {
        setIsSubmitting(true)
        const addressData = {
            payload: {
                address: { ...userAddressData }
            }
        }
        const response = await axios.put(`/api/user/profile?userEmail=${session?.user.email}`, addressData)
        if (response.data.success) {
            toast({
                title: 'Success 🥳',
                description: "Address updated successfully"
            })
            // console.log(response.data)
            setPreviousFormData({
                address: response.data.updatedUser.address.address as string,
                street: response.data.updatedUser.address.street as string,
                state: response.data.updatedUser.address.state as string,
                city: response.data.updatedUser.address.city as string,
                pincode: response.data.updatedUser.address.pincode as number,
            })
            setIsSubmitting(false)
        } else {
            toast({
                variant: "destructive",
                title: 'Some error occured',
                description: response.data.message
            })
            setIsSubmitting(false)
        }


    }
    return (
        <div className='md:grid md:grid-cols-2 flex flex-col gap-4 min-h-screen h-fit bg-blue-400'>
            <div className='cartItems  bg-purple-200 flex justify-center items-center'>
                {
                    cartItemsArray.length > 0 && <div className="bg-[#f2f2f2] p-4 rounded-[12px]">
                        {
                            cartItemsArray.map((element, index) => {
                                return (
                                    <div key={index} className='flex flex-col gap-1 p-2'>
                                        <div className="font-bold text-md">{element.name}</div>
                                        <div className="flex items-center justify-around">
                                            <div className='image w-30 h-20 shadow-md rounded-[12px]'>
                                                <Image className="rounded-[12px]" src={element.images[0]} alt='noImg found' width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex gap-2">
                                                    <button type="button" className='p-2 font-bold rounded-full text-white bg-black text-lg'>+</button>
                                                    <div className="font-bold">{element.quantity}</div>
                                                    <button type="button" className='p-2 font-bold rounded-full text-white bg-black text-lg'>-</button>
                                                </div>
                                                <div className="font-bold">₹ {element.priceAfterDiscount * element.quantity}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
            <div className='addForm bg-purple-200 flex justify-center items-center'>
                {
                    isSubmitting ? <Loading /> : <div className='flex flex-col justify-center items-center h-fit py-8 px-2 mt-8 space-y-4 bg-purple-200'>
                        <div className="text-lg font-bold">Fill your delivery address</div>
                        <div className='w-full max-w-md px-8 py-3 space-y-2 bg-white rounded-lg shadow-2xl '>
                            <Form {...userAddressForm}>
                                <form onSubmit={userAddressForm.handleSubmit(onSubmitUserAddress)} className='space-y-4'>
                                    <FormField
                                        control={userAddressForm.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                    // onChange={event => field.onChange(+event.target.value)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={userAddressForm.control}
                                        name="street"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Street</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Avenue park street"
                                                        {...field}
                                                    // onChange={event => field.onChange(+event.target.value)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={userAddressForm.control}
                                        name="pincode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Pincode</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="308001"
                                                        type="number"
                                                        {...field}
                                                        onChange={event => field.onChange(+event.target.value)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={userAddressForm.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>City</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Jaipur"
                                                        {...field}
                                                    // onChange={event => field.onChange(+event.target.value)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={userAddressForm.control}
                                        name="state"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>State</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Rajasthan"
                                                        {...field}
                                                    // onChange={event => field.onChange(+event.target.value)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type='submit' className='bg-[rebeccapurple] w-fit text-white font-bold hover:bg-purple-400 outline-1 outline-offset-1 hover:outline outline-purple-700' disabled={isSubmitting}>
                                        {
                                            isSubmitting ? <div className='flex gap-2 items-center'>
                                                <Loader2 className='mx-2 w-4 h-4 animate-spin' />Please wait
                                            </div> : 'Save !'
                                        }
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default page