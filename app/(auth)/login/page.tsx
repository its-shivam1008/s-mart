"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
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
import { useForm } from 'react-hook-form';
import { signInSchema } from '@/schemas/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast"
import { checkUserType, checkUserTypeWithStoreFormFilled } from '@/actions/checkUserType';




const LoginPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [flag, setFlag] = useState(false);

    const loginAndRedirecting = (method:string) : void=> {
        signIn(method);
    }

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver:zodResolver(signInSchema),
        defaultValues:{
            identifier:'',
            password:'',
        }
    })

    const { toast } = useToast()
    
    const onSubmit = async (data: z.infer<typeof signInSchema>) =>{
        const result = await signIn('credentials', {
            identifier:data.identifier,
            password:data.password,
            redirect:false
        })
        // console.log(result);
        if(result?.error){
            toast({
                variant: "destructive",
                title:'Login failed',
                description:"wrong password or username/email"
            })
        }
        if(result?.url){
            toast({            
                description:'Login successful'
            })
            router.replace('/')
        }
    }

    const fetchUserType = async (userEmail:string) =>{
        const response = await checkUserTypeWithStoreFormFilled(userEmail)
        // console.log(response)
        if(response?.userRole == 'User'){
            router.push('/')
        }else if(response?.userRole == 'StoreOwner'){
            if(response?.success){
                router.push('/store')
            }else{
                router.push('/store-getting-started')
            }
        }else if(response?.userRole == 'Admin'){
            // console.log('ye chala hi nhi')
            router.push('/admin')
        }
    }

    useEffect(() => {
        if(session && !flag){
            // console.log(session);
            fetchUserType(session.user.email as string);
            setFlag(true);
        }
      
    }, [session, flag])
    



    // if(session){
    //     console.log(session);

        
    //     // const isNextRoutePathStore = localStorage.getItem('isNextRoutePathStore')
    //     // console.log('this is ',Boolean(isNextRoutePathStore))
    //     // if(Boolean(isNextRoutePathStore)){
    //     //     router.push('/store-getting-started')
    //     // }else{
    //     //     router.push('/');
    //     // }
    // }
  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
        <div className='w-full max-w-md px-8 py-3 space-y-4 bg-white rounded-lg shadow-md'>
        <div className='text-center'>
                <h1 className='text-3xl text-blue-500 font-extrabold tracking-tight lg:text-3xl mb-2'>
                    Login to continue!!
                </h1>
            </div>
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="identifier"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Username or Email</FormLabel>
                        <FormControl>
                            <Input placeholder="Username or Email" 
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
                    <Button type='submit' className='bg-blue-500 hover:bg-blue-400 disabled:bg-blue-300' disabled={isSubmitting}>
                        {
                            isSubmitting?(
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait
                                </>
                            ):('Login')
                        }
                    </Button>
                </form>
            </Form>
        <hr />
        <div className='flex justify-center items-center flex-col space-y-2'>
            <button onClick={() => { loginAndRedirecting("github") }} type="button" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
                            <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
                            </svg>
                            Continue with Github
            </button>
            <button onClick={() => { loginAndRedirecting("google") }} type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                    <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                </svg>
                Continue with Google
            </button>
        </div>
        <div className='text-center mt-4'>
                <p>
                    Create new account{' '}
                    <Link href='/sign-up' className='text-blue-600 hover:text-blue-800'>Sign-up</Link>
                </p>
            </div>
        </div>
    </div>
  )
}

export default LoginPage
