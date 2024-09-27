'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import Loading from '@/components/Loading';
import Image from 'next/image';


const page = () => {

  const { data: session, status } = useSession()

  const [flag, setFlag] = useState(false)
  const router = useRouter();
  const [arrayOfOrder, setArrayOfOrder] = useState<any>([])

  const fetchOrders = async (userEmail:string) => {
    const response = await axios.get(`/api/user/orders?userEmail=${userEmail}`)
    if(!response.data.success){
      console.log("some error occured")
    }else{
      setArrayOfOrder(response.data.orders)
      console.log(response.data.orders,"order data")
    }
   }

  useEffect(() => {
    if(session && !flag){
      // console.log('hey there');
      fetchOrders(session.user.email as string)
      setFlag(true)
      console.log(session)
      // console.log((session?.user.image as string).split('//')[0])
    }
  }, [session, flag])

 


  return (
    <div className='min-h-screen bg-[#f2f2f2]'>
      <div className="text-3xl font-bold p-5">Orders</div>
      {
        arrayOfOrder.length > 0 ? 
          arrayOfOrder.map((element:any, index:number) => {
            return (<div key={index} className='p-5 my-4 bg-white rounded-[12px] shadow-xl border-2 border-solid border-gray-400 flex justify-between gap-5 w-auto mx-auto md:w-[550px] flex-col md:flex-row'>
              <div className="image w-40 h-40 shadow-xl rounded-[12px]">
              <Image className="rounded-[12px]" src={element.img} alt='noImg found' width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className='flex flex-col gap-4 justify-between items-center px-4'>
                <div className='flex flex-col gap-1 '>
                  <div className="title text-black font-bold">{element._doc.product.productName}</div>
                  <div className="order-number text-gray-400">{element._doc._id}</div>
                  <div className="order-number">Date of order : {element._doc.orderDate.split('T')[0]}</div>
                  <div className="order-number">Will deliver on : {element._doc.shippingDate.split('T')[0]}</div>
                  <div className="order-number">Order status : {element._doc.status}</div>
                  <div className="pricequantity flex justify-between gap-3">
                    <div className="order-number">Price : {element._doc.totalPrice}</div>
                    <div className="order-number">quantity : {element._doc.quantity}</div>
                  </div>
                </div>
                <button type='button' className='text-red-600 font-bold bg-white border-2 border-red-600 rounded-[10px] px-2 py-1 hover:text-white hover:bg-red-600 transition-colors duration-500'>Cancel order</button>
              </div>
            </div>)
          })
         : <div className=' flex justify-center items-center font-bold text-2xl'>Place some orders to be displayed here</div>
      }
    </div>
  )
}

export default page