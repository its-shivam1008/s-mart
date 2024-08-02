"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form"
import * as z from "zod";
import Link from 'next/link';
import { useDebounceCallback, useDebounceValue } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { signUpSchema } from '@/schemas/signUpSchema';
import axios , {AxiosError} from "axios"
import { ApiResponse } from '@/types/ApiResponse';

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
import { Loader2, LoaderCircle } from 'lucide-react';



const page = () => {
    const { data: session, status } = useSession()
    const router = useRouter();
    const loginAndRedirecting = (method:string) : void => {
        signIn(method);
    }
    if(session){
        router.push('/setup-password');
    }

    const [username, setUsername] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const debounced = useDebounceCallback(setUsername, 400)

    const { toast } = useToast()

    //zod implementation
    const form = useForm<z.infer<typeof signUpSchema>>({   // many uses const register = userForm()
        resolver:zodResolver(signUpSchema),
        defaultValues:{
            username:'',
            email:'',
            password:''
        }
    }) 

    useEffect(() => {
        // checking the username present in the database or not 
        const checkUsernameUnique = async () =>{
            if(username){
                setIsCheckingUsername(true);
                setUsernameMessage('');
                try{
                    const response = await axios.get(`/api/checkUsername?username=${username}`)
                    // console.log(response)
                    setUsernameMessage(response.data.message);
                }catch(err){
                    const axiosError = err as AxiosError<ApiResponse>;
                    setUsernameMessage(axiosError.response?.data.message ?? "error checking username");

                } finally {
                    setIsCheckingUsername(false);
                }
            }
        }
        checkUsernameUnique();
    }, [username])
    
    const onSubmit = async (data: z.infer<typeof signUpSchema>) =>{
        setIsSubmitting(true);
        try{
            console.log(data);
            const response = await axios.post('/api/signup', data);
            console.log(response)
            if(!response.data.success){
                toast({
                    variant: "destructive",
                    title:'Sign-up failed',
                    description:response.data.message
                })
            }
            toast({
                title:'Success 🎉',
                description:response.data.message
            })
            router.push('/verify');
            setIsSubmitting(false);
        }catch(err){
            const axiosError = err as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message;
            toast({
                variant: "destructive",
                title:'Sign-up failed',
                description:errorMessage
            })
            setIsSubmitting(false)
        }
    }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
            <div className='text-center'>
                <h1 className='text-3xl font-extrabold tracking-tight lg:text-5xl mb-6'>
                    S-Mart is waiting for you!
                </h1>
                <p className='mb-4'>Sign-up to start your journey</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="username"
                            {...field}
                            onChange={(e) =>{ // if we want to write the on change we have to write it after {...field}
                                field.onChange(e);
                                debounced(e.target.value)
                            }}
                            />
                        </FormControl>
                        {isCheckingUsername && <LoaderCircle className='animate-spin'/>}
                        <p className={`text-sm ${usernameMessage === 'Username is available'?'text-green-500':'text-red-500'}`}>{usernameMessage}</p>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="abc@example.com"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type='password' placeholder="Password"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type='submit' disabled={isSubmitting}>
                        {
                            isSubmitting?(
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait
                                </>
                            ):('Sign-up')
                        }
                    </Button>
                </form>
            </Form>
            <div className='text-center mt-4'>
                <p>
                    Already a member?{' '}
                    <Link href='/login' className='text-blue-600 hover:text-blue-800'>Log-in</Link>
                </p>
            </div>
        </div>
    </div>
  )
}

export default page
