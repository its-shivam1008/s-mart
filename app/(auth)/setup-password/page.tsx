"use client"
import React, { InputHTMLAttributes } from 'react'
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'


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
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordSchema } from '@/schemas/passwordSchema';
import { z } from 'zod';
import { useToast } from "@/components/ui/use-toast"
import Loading from '@/components/Loading';

const SetupPasswordPage = () => {
    // const [textValue, setTextValue] = useState("");
    // const [userRole, setUserRole] = useState('User');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    const { toast } =  useToast();

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void  =>{
    //     //handle the change in the password field
    //     setTextValue(e.target.value)
    // }

    // if user is present already push it to the homeSetupPasswordPage
    // useEffect(() => {
      
    // }, [])
    

    const submitThePass =async(data: z.infer<typeof passwordSchema>)=>{
        setIsSubmitting(true);
        const roleFromStorage = localStorage.getItem('role');
        // fetch to password saving route to save the password
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/setup-password`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({session, password:data.password, role:roleFromStorage}),
        })
        const response = await res.json();
        // console.log(response);
        // redirecting the user to verify itself if the verification email has been sent to the user
        if(response.success){
            toast({
                title:'Success 🎉',
                description:"Verification OTP sent"
            })
            router.push('/verify');
        }else{
            toast({
                variant: "destructive",
                title:'Failed',
                description:response.message
            })
        }
        setIsSubmitting(false);
    }

    // zod implementation of password
    const form = useForm<z.infer<typeof passwordSchema>>({
        resolver:zodResolver(passwordSchema),
        defaultValues:{
            password:''
        }
    });

    useEffect(() => {
        // Ensure this is only run on the client side
        if (!session) {
            router.push('/login');
        }
    }, [session, router]);

    if(status === 'loading'){
        return <div className='min-h-screen flex justify-center items-center'><Loading/></div>
     }
     

    // const handleClick = ():void =>{
    //     setUserRole('StoreOwner');
    // }
  return (
    <div  className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
        <div className='w-full max-w-md px-8 py-3 space-y-8 bg-white rounded-lg shadow-md'>
            <Form {...form}>
        <form onSubmit={form.handleSubmit(submitThePass)} className="w-2/3 space-y-6">
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Set-up Password</FormLabel>
                <FormControl>
                    <Input type='password' placeholder="Password" {...field} />
                </FormControl>
                {  }
                <FormDescription>
                    Set-up your password 
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit" disabled={isSubmitting}>
                {
                    isSubmitting ? <><Loader2 className='animate-spin mr-2 w-4 h-4'/> Saving... </> : 'Save'
                }
            </Button>
        </form>
        </Form>
        </div>
    </div>
  )
}

export default SetupPasswordPage
