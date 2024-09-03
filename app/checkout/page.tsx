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

const page = () => {
    const [flag, setFlag] = useState(false)
    const [isAddressFillFlag, setIsAddressFillFlag] = useState(false)
    const { data: session, status } = useSession()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    const [previousFormData, setPreviousFormData] = useState({ address: '', pincode: 0, state: '', street: '', city: '' })

    const isAddressFilled = async (userEmail: string) => {
        const res = await checkUserAddressFormFilled(userEmail)
        if (res.success) {
            const addressObject = JSON.parse(res.address as string)
            setIsAddressFillFlag(true)
            setPreviousFormData({
                address: addressObject.address as string,
                street: addressObject.street as string,
                state: addressObject.state as string,
                city: addressObject.city as string,
                pincode: addressObject.pincode as number,
            })
        } else {
            toast({
                title: 'Fill the Delivery address',
                // description: "A"
            })
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

    useEffect(() => {
        if (session && !flag) {
            console.log(session);
            isAddressFilled(session.user.email as string)
            setFlag(true)
        }
    }, [session, flag])

    const onSubmitUserAddress = async (userAddressData: z.infer<typeof userAddress>) => {
        setIsSubmitting(true)
        const addressData = {
            address: { ...userAddressData }
        }
        const response = await axios.put(`/api/user/profile?userEmail=${session?.user.email}`, addressData)
        if (response.data.success) {
            toast({
                title: 'Success 🥳',
                description: "Address updated successfully"
            })
            setPreviousFormData({
                address: response.data.user.address.address as string,
                street: response.data.user.address.street as string,
                state: response.data.user.address.state as string,
                city: response.data.user.address.city as string,
                pincode: response.data.user.address.pincode as number,
            })
            setIsSubmitting(false)
        }else{
            toast({
                variant: "destructive",
                title: 'Some error occured',
                description: response.data.message
            })
            setIsSubmitting(false)
        }


    }
    return (
        <div className='mt-14 md:grid md:grid-cols-2 flex flex-col gap-4 min-h-screen bg-blue-400'>
            <div className='cartItems bg-green-400'>lol</div>
            <div className='addForm bg-green-600 flex justify-center items-center'>
                {
                    isSubmitting ? <Loading /> : <div className='flex flex-col justify-center items-center h-fit py-8 px-2 bg-gray-100'>
                    <div className='w-full max-w-md px-8 py-3 space-y-4 bg-white rounded-lg shadow-md '>
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
                                                    onChange={event => field.onChange(+event.target.value)}
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
                                                    onChange={event => field.onChange(+event.target.value)}
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
                                                    onChange={event => field.onChange(+event.target.value)}
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
                                                    onChange={event => field.onChange(+event.target.value)}
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