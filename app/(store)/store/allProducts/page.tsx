'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Loader2, Pencil, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const page = () => {

  const { data: session, status } = useSession()
  const [flag, setFlag] = useState(false)
  const [productArray, setProductArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

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
  

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <div className='flex gap-5 flex-col'>
      <div className="title text-2xl text-black font-bold pt-5">Your Products</div>
      <div className='md:mx-10 mx-auto my-10 md:p-10 p-3  bg-purple-500 bg-opacity-50 rounded-[16px] w-auto outline-2 outline-offset-4 hover:outline-[rebeccapurple] outline-transparent outline'>
        {productArray.length > 0 && !isLoading && productArray.map((ele:any) => {
          return <div key={ele._id} className='product flex gap-4 md:gap-0 md:items-center justify-around md:justify-around bg-[#f2f2f2] p-3 rounded-[16px] my-2 '>
          <div className='image w-30 h-20 shadow-xl rounded-[12px]'>
          <Image className="rounded-[12px]" src={ele?.images[0]} alt='noImg found' width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit:'cover'}}/>
          </div>
          <div className='flex md:flex-row flex-col justify-between md:space-x-60 w-auto'>
            <div className="title font-bold text-xl">{ele?.name}</div>
            <div className="buttons flex justify-around md:space-x-60 w-auto space-x-5">
              <button type="button" className='edit text-white hover:text-green-500 hover:bg-[#f2f2f2] flex gap-2 items-center bg-purple-400 rounded-[10px] px-3 md:py-2 py-1 outline-1 outline-offset-4 hover:outline-green-500 transition-colors duration-500 outline-transparent outline' title='edit'><Pencil className='size-5'/>Edit</button>
              <button type="button" className='delete text-white hover:text-red-500 hover:bg-[#f2f2f2] flex gap-2 items-center bg-purple-400 rounded-[10px] px-3 md:py-2 py-1 outline-1 outline-offset-4 hover:outline-red-500 transition-colors duration-500 outline-transparent outline' title='delete'><Trash2  className='size-5 text-red-500'/>Delete</button>
            </div>
          </div>
        </div>
        })}
      </div>
        {productArray.length === 0 && !isLoading && <div className='font-bold text-xl text-purple-400 text-center'>No products are listed by you. Add some products to show here</div>}
        {isLoading && <div className='flex justify-center items-center'><div className='flex flex-col gap-2'><Loader2 className='size-8 animate-spin text-purple-400'/><div className='font-semibold text-purple-400'>Please wait</div></div></div>}
      </div>
    </div>
  )
}

export default page