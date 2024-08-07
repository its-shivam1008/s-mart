"use client";
import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
// import { getSession } from "next-auth/client"
import { z } from "zod"
import { useTimer } from 'react-timer-hook';
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
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useToast } from "@/components/ui/use-toast"
import { verifySchema } from '@/schemas/verifySchema';
import { Loader2 } from 'lucide-react';
import { Session } from 'next-auth';

const page = () => {
  const [textValue, setTextValue] = useState('');
  const { data: session, status } = useSession()
  const [toggleDisable, setToggleDisable] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [disableSubmit, setDisableSubmit] = useState(false);
  const time = new Date();
  time.setSeconds(time.getSeconds() + 120);
  const [expiryTimestamp, setExpiryTimestamp] = useState(time);
  const [sessionObject, setSessionObject] = useState({user:{email:'abc@example.com', username:'abcd'}});
  const [isFetched, setIsFetched] = useState(false);
  const { toast } = useToast()
  const [flag, setFlag] = useState(false)

  // TODO: I have to extract session from the useSession 
  const sess = {
    user:{
      email:'shivamshukla.email@gmail.com',
      username:'lebhen kabhai'
    }
  }

  const {start, restart, minutes, seconds} = useTimer({expiryTimestamp})

  // setTimeout(() => {
  //   setToggleDisable(false);
  // }, 35000);

  // const enableCount = () =>{
  //   setTimeout(() => {
  //     setToggleDisable(false);
  //   }, 35000);
  // }
  useEffect(() => {
    start();
    setTimeout(() => {
      setToggleDisable(false);
    }, 120000);
  }, [])

  const enableCount = () =>{
    const resetTime = new Date();
    resetTime.setSeconds(resetTime.getSeconds() + 120);
    restart(resetTime)
    setTimeout(() => {
          setToggleDisable(false);
        }, 120000);
    
  }
  
  const handleClick = async() =>{
    setToggleDisable(true);
    enableCount();
    const res = await fetch('http://localhost:3000/api/generateOtp',{
      method:'PUT',
      headers:{
        'Content-type': 'application/json'
      },
      body:JSON.stringify({sessionObject})
    })
    // console.log(session);
    const data = await res.json();
    toast({
      variant: "default",
      description:data.message
    })
    // enableCount();
  }

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void =>{
    //handlng the verify code field changes
    setTextValue(e.target.value);
  }

  // type SessionType = {user:{email:string; username?:string; name?:string}}

  useEffect(() => {
      if(!session && !flag){
        const sessionEmail = localStorage.getItem('sessionEmail')
        const sessionUsername = localStorage.getItem('sessionUsername')
        // console.log(sessionObj);
        if(sessionEmail && sessionUsername){
          
          setSessionObject({user:{email:sessionEmail, username:sessionUsername}});
          
        }
        setFlag(true);
        setIsFetched(true);
      }
      if(session && !flag){
        if(session.user.email && session.user.username){
          setSessionObject({user:{email:session.user.email, username:session.user.username}})
          setFlag(true);
          setIsFetched(true);
        }
      }
  }, [session, flag, sessionObject])
  

  const submitTheVerifyCode = async(data: z.infer<typeof verifySchema>) =>{
    // verifying the verification code through fetch
    setDisableSubmit(true);
    setIsSubmitting(true);
    // const sess = await getSession();
    const res = await fetch('http://localhost:3000/api/verifyingCode', {
      method:'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body:JSON.stringify({session:sessionObject, verifyCode:data.code})
    })
    // console.log(sess)
    const dataResponse = await res.json();
    // redirecting the user to home page if it is a user or pushing it to store for more store information if it is a store owner
    if(dataResponse.success && !dataResponse.isStoreOwner){
    toast({
      title:"Account creation successful 🎊",
      description:dataResponse.message+". You can login now"
    })
      router.push('/login');
    }else if(dataResponse.isStoreOwner){
      toast({
        title:"Account creation successful 🎊",
        description:dataResponse.message+". You can login now"
    })
     
      router.push('/login');
    }else{
      toast({
        variant: "destructive",
        title:'Verification failed',
        description:dataResponse.message
    })
    }
    setIsSubmitting(false);
    setDisableSubmit(false);
  }

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver:zodResolver(verifySchema),
    defaultValues:{
      code:''
    }
  })

  

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='w-full max-w-md px-4 py-8 space-y-4 bg-white rounded-lg shadow-lg'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitTheVerifyCode)}>
          <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className='space-y-4'>
              <FormLabel className='flex justify-center items-center text-2xl font-bold'>One-Time Password</FormLabel>
              <FormControl>
                <div  className='flex justify-center items-center'>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                </div>
              </FormControl>
              <FormDescription  className='flex justify-center items-center'>
               <span className='text-center'>Please verify your email, otp sent to {isFetched ? sessionObject.user.email : " "}</span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit"  className='my-4 flex justify-center items-center' disabled={disableSubmit}>{
            isSubmitting ? <><Loader2 className='animate-spin font-extrabold mr-2 h-4 w-4'/> Verifying...</> : "Submit"
          }</Button>
          </form>
        </Form>
        <hr />
        <Button type='button' onClick={handleClick} className='w-[95px] h-[40px]' disabled={toggleDisable}>
          { toggleDisable ? <><span>{minutes}</span>:<span>{seconds}</span></> : 'Resend otp'}
        </Button>
        {/* <button type="button" onClick={handleClick} className='bg-blue-500 text-white rounded-full px-3 py-2 cursor-pointer m-5 disabled:bg-gray-500' disabled={toggleDisable}>Resend new otp</button> */}
    </div>
  </div>
  )
}
export default page