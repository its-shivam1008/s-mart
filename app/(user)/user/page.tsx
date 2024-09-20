'use client'
import Modal from '@/components/Modal'
import { CircleUserRound, Loader2, Pencil, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
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
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input"
import { checkPasswordSchema } from '@/schemas/signInSchema';
import { checkUserPassword, checkUserType, updateUserPassword } from '@/actions/checkUserType';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import Loading from '@/components/Loading';

const page = () => {
  const { data: session, status } = useSession()
  const [editPassword, setEditPassword] = useState(false)
  const [updatePassword, setUpdatePassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [flag, setFlag] = useState(false)
  const router = useRouter();

  useEffect(() => {
    if(session && !flag){
      // console.log('hey there');
      (async () => {
        const userType = await checkUserType(session.user.email as string)
        if (userType?.userRole !== 'User') { //User
            router.push('/')
        }
      })()
      setFlag(true)
      console.log(session)
      // console.log((session?.user.image as string).split('//')[0])
    }
  }, [session, flag])
  


    const onCheckPassword = async (password:z.infer<typeof checkPasswordSchema>) => {
    setIsSubmitting(true)
    const response = await checkUserPassword(session?.user?.email as string , password.password as string)
    if(response.success){
      toast({
        title:'Correct Password'
      })
      setIsSubmitting(false)
      setEditPassword(false)
      setUpdatePassword(true)
    }else{
      toast({
        variant: "destructive",
        title: 'Incorrect password',
      })
      setIsSubmitting(false)
      setEditPassword(false)
    }
  }

  const form = useForm<z.infer<typeof checkPasswordSchema>>({
    resolver:zodResolver(checkPasswordSchema),
    defaultValues:{
      password:''
    }
  })

  const onUpdatePassword  = async (password: z.infer<typeof checkPasswordSchema>) => {
    setIsSubmitting(true)
    const response = await updateUserPassword(session?.user?.email as string, password.password as string)
    if(response.success){
      toast({
        title:response.message
      })
      setIsSubmitting(false)
      setUpdatePassword(false)
    }else{
      toast({
        variant: "destructive",
        title: 'Some error occured',
      })
      setIsSubmitting(false)
      setUpdatePassword(false)
    }
  }


  return (
    <div className='flex flex-col gap-16'>
      {
        updatePassword && <Modal>
        <div className="w-auto flex justify-end"><button type="button" onClick={() => setUpdatePassword(false)} title='close'><X className='text-white size-8' /></button></div>
        <div className="p-4 rounded-[16px] w-auto">
          <div className=" p-4 w-full max-w-md h-full md:h-auto">
            <div className=" p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <p className="mb-4 text-gray-500 dark:text-gray-600">Enter new password</p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onUpdatePassword)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type='password' placeholder="Your new password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type='submit' className='bg-purple-500 hover:bg-purple-400 disabled:bg-purple-300' disabled={isSubmitting}>
                    {
                      isSubmitting ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait
                        </>
                      ) : ('Confirm')
                    }
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
      }
      {
        editPassword && <Modal>
          <div className="w-auto flex justify-end"><button type="button" onClick={() => setEditPassword(false)} title='close'><X className='text-white size-8' /></button></div>
          <div className="p-4 rounded-[16px] w-auto">
            <div className=" p-4 w-full max-w-md h-full md:h-auto">
              <div className=" p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <p className="mb-4 text-gray-500 dark:text-gray-600">Enter old password to continue...</p>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onCheckPassword)} className="space-y-4">
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
                    <Button type='submit' className='bg-purple-500 hover:bg-purple-400 disabled:bg-purple-300' disabled={isSubmitting}>
                      {
                        isSubmitting ? (
                          <>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait
                          </>
                        ) : ('Confirm')
                      }
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </Modal>
      }
      {!session ? '' :
        <div className='flex justify-between w-full items-center p-4'>
          <h1 className='text-3xl font-bold p-5'>Profile</h1>
        <div className="rounded-full w-auto border-purple-500 border-2 size-16  overflow-hidden">
          { session?.user.image ? <img alt='noimagefound' className='rounded-full object-cover size-16' width={10} height={10} src={session?.user.image as string} /> :<CircleUserRound className='text-[rebeccapurple] size-16' />}
        </div>
      </div>}
      {
        !session ? <div className='mt-10 mx-auto'><Loading /></div> :
        <div className='md:mx-10 mx-auto my-10 md:p-10 p-3 bg-purple-500 bg-opacity-50 rounded-[16px] w-auto outline-2 outline-offset-4 hover:outline-[rebeccapurple] outline-transparent outline space-y-10'>
          <div className='text-xl font-semibold'>Name : {(session as any)?.user?.name}</div>
          <div className='text-xl font-semibold'>Username: {(session as any)?.user?.username}</div>
          <div className='text-xl font-semibold'>Email : {(session as any)?.user?.email}</div>
          <div className='text-xl font-semibold flex gap-2 items-center'>Password: ********* <div className='cursor-pointer' onClick={() => setEditPassword(true)}><Pencil className='text-white size-5  hover:text-purple-900' /></div></div>
        </div>
      }
    </div>
  )
}

export default page