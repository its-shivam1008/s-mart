'use client'
import React, { useEffect, useState } from 'react'
import { ChartSpline, CirclePlus, Shirt, ShoppingBasket, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FilledLineChart from '@/components/FilledLineChart';
import { useSession } from 'next-auth/react';




const page = () => {
  const { data: session, status } = useSession()
  const [flag, setFlag] = useState(false)

  const router = useRouter();

  useEffect(() => {
    
  }, [])
  

  return (
    <div className='min-h-screen bg-[#f2f2f2]'>
      <div className="orders py-5">
        <h1 className='p-5  text-purple-500 font-extrabold'>Orders</h1>
        <div className='cards flex md:flex-row flex-col md:justify-evenly mx-auto w-fit md:w-auto space-y-8 md:space-y-0'>
          <div className="card1 w-[200px] h-[150px] rounded-[12px] shadow-xl bg-gradient-to-br from-rose-200 to-teal-100 flex flex-col justify-evenly items-center text-[rebeccapurple]">
            <h1 className="title text-xl font-bold">Today</h1>
            <div className="number text-5xl font-extrabold">$$</div>
          </div>
          <div className="card2 w-[200px] h-[150px] rounded-[12px] shadow-xl bg-gradient-to-br from-rose-200 to-teal-100 flex flex-col justify-evenly items-center text-[rebeccapurple]">
            <h1 className="title text-xl font-bold">This week</h1>
            <div className="number text-5xl font-extrabold">$$</div>
          </div>
          <div className="card3 w-[200px] h-[150px] rounded-[12px] shadow-xl bg-gradient-to-br from-rose-200 to-teal-100 flex flex-col justify-evenly items-center text-[rebeccapurple]">
            <h1 className="title text-xl font-bold">This month</h1>
            <div className="number text-5xl font-extrabold">$$</div>
          </div>
        </div>
      </div>
      <FilledLineChart  DataInfo={}/>
      <div className="revenue py-5">
        <h1 className='p-5 text-purple-500 font-extrabold'>Revenue</h1>
        <div className='cards flex md:flex-row flex-col md:justify-evenly mx-auto w-fit md:w-auto space-y-8 md:space-y-0'>
          <div className="card1 w-[200px] h-[150px] rounded-[12px] shadow-xl bg-gradient-to-br from-teal-200 to-rose-200 flex flex-col justify-evenly items-center text-[rebeccapurple]">
            <h1 className="title text-xl font-bold">Today</h1>
            <div className="number text-5xl font-extrabold">$$</div>
          </div>
          <div className="card2 w-[200px] h-[150px] rounded-[12px] shadow-xl bg-gradient-to-br from-teal-200 to-rose-200 flex flex-col justify-evenly items-center text-[rebeccapurple]">
            <h1 className="title text-xl font-bold">This week</h1>
            <div className="number text-5xl font-extrabold">$$</div>
          </div>
          <div className="card3 w-[200px] h-[150px] rounded-[12px] shadow-xl bg-gradient-to-br from-teal-200 to-rose-200 flex flex-col justify-evenly items-center text-[rebeccapurple]">
            <h1 className="title text-xl font-bold">This month</h1>
            <div className="number text-5xl font-extrabold">$$</div>
          </div>
        </div>
      </div>
      <FilledLineChart DataInfo={} />
    </div>
  )
}

export default page