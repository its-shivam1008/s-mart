'use client'
import React, { useEffect, useState } from 'react'
import { ChartSpline, CirclePlus, Shirt, ShoppingBasket, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FilledLineChart from '@/components/FilledLineChart';
import { useSession } from 'next-auth/react';
import { checkUserType } from '@/actions/checkUserType';
import { getOrderStatsForStore } from '@/actions/ordersAndAnalytics';
import Loading from '@/components/Loading';
import axios from 'axios';




const StoreOwnerPage = () => {
  const { data: session, status } = useSession()
  const [flag, setFlag] = useState(false)

  const router = useRouter();

  const [statsValueOrder, setStatsValueOrder] = useState<any>({})
  const [statsValueRevenue, setStatsValueRevenue] = useState<any>({})

  const [isLoading, setIsLoading] = useState(false)

  const fetchStats = async (userEmail:string) => {
    // console.log(session);
    setIsLoading(true)
    const userType = await checkUserType(userEmail)
    if(userType?.userRole !== 'StoreOwner'){
      router.push('/')
    }
    const stats = await getOrderStatsForStore(userEmail)
    if(stats.success){
      // console.log(stats)
      setStatsValueOrder({today:stats?.today?.count, month:stats?.month?.count, week:stats?.week?.count})
      setStatsValueRevenue({today:stats?.today?.revenue, month:stats?.month?.revenue, week:stats?.week?.revenue})
    }
    
    setIsLoading(false)
  }

  useEffect(() => {
    if(session && !flag) {
      // console.log(session)
      fetchStats(session.user.email as string)
      setFlag(true)
    }
  }, [session, flag])

  const [flagForSession, setFlagForSession] = useState(false)

  useEffect(() => {
    (async () => {
    if(session && !flagForSession){
      const res = await axios.get(`/api/store?email=${session.user.email}`)
      setFlagForSession(true);
      if(res.data.success){
        res.data.getStoreData?.owner_name ? '':router.push('/store-getting-started')
        res.data.getStoreData?.businessAddress?.address ? '':router.push('/store-getting-started')
        res.data.getStoreData?.razorpay?.id ? '':router.push('/store-getting-started')
      }
    }
    })()
  }, [session, flagForSession])
  

  return (
    <div className='min-h-screen bg-[#f2f2f2]'>
      {isLoading ? <div className='pt-20'><Loading/></div> : <div>
        <div className="orders py-5">
          <h1 className='p-5  text-purple-500 font-extrabold'>Orders</h1>
          <div className='cards flex md:flex-row flex-col md:justify-evenly mx-auto w-fit md:w-auto space-y-8 md:space-y-0'>
            <div className="card1 min-w-[200px] w-fit p-2 h-[150px] rounded-[12px] shadow-xl bg-gradient-to-br from-rose-200 to-teal-100 flex flex-col justify-evenly items-center text-[rebeccapurple]">
              <h1 className="title text-xl font-bold">Today</h1>
              <div className="number text-5xl font-extrabold">{statsValueOrder.today}</div>
            </div>
            <div className="card2 min-w-[200px] w-fit p-2 h-[150px] rounded-[12px] shadow-xl bg-gradient-to-br from-rose-200 to-teal-100 flex flex-col justify-evenly items-center text-[rebeccapurple]">
              <h1 className="title text-xl font-bold">This week</h1>
              <div className="number text-5xl font-extrabold">{statsValueOrder.week}</div>
            </div>
            <div className="card3 min-w-[200px] w-fit p-2 h-[150px] rounded-[12px] shadow-xl bg-gradient-to-br from-rose-200 to-teal-100 flex flex-col justify-evenly items-center text-[rebeccapurple]">
              <h1 className="title text-xl font-bold">This month</h1>
              <div className="number text-5xl font-extrabold">{statsValueOrder.month}</div>
            </div>
          </div>
        </div>
        <FilledLineChart titleOfGraph='Visualising Orders' DataInfo={statsValueOrder}/>
        <div className="revenue py-5">
          <h1 className='p-5 text-purple-500 font-extrabold'>Revenue</h1>
          <div className='cards flex md:flex-row flex-col md:justify-evenly mx-auto w-fit md:w-auto space-y-8 md:space-y-0'>
            <div className="card1 min-w-[200px] w-fit p-2 h-[150px] rounded-[12px] shadow-xl bg-gradient-to-br from-teal-200 to-rose-200 flex flex-col justify-evenly items-center text-[rebeccapurple]">
              <h1 className="title text-xl font-bold">Today</h1>
              <div className="number text-5xl font-extrabold">{statsValueRevenue.today}</div>
            </div>
            <div className="card2 min-w-[200px] w-fit p-2 h-[150px] rounded-[12px] shadow-xl bg-gradient-to-br from-teal-200 to-rose-200 flex flex-col justify-evenly items-center text-[rebeccapurple]">
              <h1 className="title text-xl font-bold">This week</h1>
              <div className="number text-5xl font-extrabold">{statsValueRevenue.week}</div>
            </div>
            <div className="card3 min-w-[200px] w-fit p-2 h-[150px] rounded-[12px] shadow-xl bg-gradient-to-br from-teal-200 to-rose-200 flex flex-col justify-evenly items-center text-[rebeccapurple]">
              <h1 className="title text-xl font-bold">This month</h1>
              <div className="number text-5xl font-extrabold">{statsValueRevenue.month}</div>
            </div>
          </div>
        </div>
        <FilledLineChart titleOfGraph='Revenue Visualisation' DataInfo={statsValueRevenue}/>

      </div>}
    </div>
  )
}

export default StoreOwnerPage