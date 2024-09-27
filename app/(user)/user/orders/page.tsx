'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import Loading from '@/components/Loading';
import Image from 'next/image';
import Modal from '@/components/Modal';
import { X } from 'lucide-react';


const page = () => {

  const { data: session, status } = useSession()

  const [flag, setFlag] = useState(false)
  const [arrayOfOrder, setArrayOfOrder] = useState<any>([])
  const [cancelOrderPrompt, setCancelOrderPrompt] = useState(false)
  const [orderId, setOrderId] = useState()
  const router = useRouter();
  const { toast } = useToast()

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

 
  const handleClick = (orderIdOfUser:any) =>{
    setCancelOrderPrompt(true)
    setOrderId(orderIdOfUser)
  }

  const cancelOrder = async () => {
    const res = await axios.put(`/api/user/orders?orderId=${orderId}&cancel=true&userEmail=${session?.user.email}`)
    if(!res.data.success){
      toast({
        variant: "destructive",
        title: 'Some error occured',
        description: 'Unable to cancel the order'
      })
      setCancelOrderPrompt(false)
    }else{
      toast({
        title: 'Order cancelled',
      })
      setCancelOrderPrompt(false)
      fetchOrders(session?.user.email as string)
    }
  }

  return (
    <div className='min-h-screen h-fit py-10 bg-[#f2f2f2]'>
      <div className="text-3xl font-bold p-5">Orders</div>
      {
        cancelOrderPrompt && <Modal>
          <div className="w-auto flex justify-end"><button type="button" onClick={() => setCancelOrderPrompt(false)} title='close'><X className='text-white size-8' /></button></div>
              <div className="p-4 rounded-[16px] w-auto">
                <div className=" p-4 w-full max-w-md h-full md:h-auto">
                  <div className=" p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                    <p className="mb-4 text-gray-500 dark:text-gray-600">Are you sure you want to CANCEL this order ?</p>
                    <div className="flex justify-center items-center space-x-4">
                      <button onClick={() => setCancelOrderPrompt(false)} type="button" className="py-2 px-3 text-sm font-medium text-white bg-green-500 rounded-lg border border-green-600 hover:bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-green-500 focus:z-10 dark:bg-green-700 dark:text-green-500 dark:border-green-600 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-600 transition-colors duration-300">
                        No, cancel
                      </button>
                      <button onClick={() => cancelOrder()} type='button' className="py-2 px-3 text-sm font-medium text-center bg-white text-red-600 rounded-lg hover:bg-white focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900 transition-colors duration-300">
                        Yes, I'm sure
                      </button>
                    </div>
                  </div>
                </div>
              </div>

        </Modal>
      }
      {
        arrayOfOrder.length > 0 ? 
          arrayOfOrder.map((element:any, index:number) => {
            return (<div key={index} className='p-5 my-4 bg-white rounded-[12px] shadow-xl border-2 border-solid border-gray-400 flex md:justify-between gap-5 w-auto mx-auto md:w-[520px] flex-col md:flex-row justify-center items-center'>
              <div className="image w-40 h-40 shadow-xl rounded-[12px]">
              <Image className="rounded-[12px]" src={element.img} alt='noImg found' width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className='flex flex-col gap-4 justify-between items-center px-4'>
                <div className='flex flex-col gap-1 '>
                  <div className="title text-black font-bold">{element._doc.product.productName}</div>
                  <div className="order-number text-gray-400">{element._doc._id}</div>
                  <div className="order-number">Date of order : {element._doc.orderDate.split('T')[0]}</div>
                  <div className="order-number">Will deliver on : {element._doc.shippingDate.split('T')[0]}</div>
                  <div className="order-number flex gap-2">Order status : <div className={`font-bold ${element._doc.status !== 'Cancelled' ? 'text-green-700' :'text-red-500'}`}>{element._doc.status}</div></div>
                  <div className="pricequantity flex justify-between gap-3">
                    <div className="order-number">Price : {element._doc.totalPrice}</div>
                    <div className="order-number">quantity : {element._doc.quantity}</div>
                  </div>
                </div>
                {element._doc.status !== 'Cancelled' && <button onClick={() => handleClick(element._doc._id)} type='button' className='text-red-600 font-bold bg-white border-2 border-red-600 rounded-[10px] px-2 py-1 hover:text-white hover:bg-red-600 transition-colors duration-500'>Cancel order</button>}
              </div>
            </div>)
          })
         : <div className=' flex justify-center items-center font-bold text-2xl'>Place some orders to be displayed here</div>
      }
    </div>
  )
}

export default page