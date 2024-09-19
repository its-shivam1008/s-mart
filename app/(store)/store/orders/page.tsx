'use client'
import { checkUserType } from '@/actions/checkUserType';
import Loading from '@/components/Loading';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast, useToast } from '@/components/ui/use-toast';
import { Trash2 } from 'lucide-react';

const page = () => {

    const { data: session, status } = useSession()
    const [flag, setFlag] = useState(false)

    const {toast} = useToast()

    const router = useRouter();

    const [ordersArray, setOrdersArray] = useState<any>([])

    const [isLoading, setIsLoading] = useState(false)

    const fetchOrdersFromDB = async (userEmail: string) => {
        // console.log(session);
        setIsLoading(true)
        const userType = await checkUserType(userEmail)
        if (userType?.userRole !== 'StoreOwner') {
            router.push('/')
        }
        const orders = await axios.get(`/api/store/orders?role=${userType?.userRole}&userEmail=${userEmail}`)
        if (orders.data.success) {
            console.log(orders.data.orders, "orders")
            setOrdersArray(orders.data.orders)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        if (session && !flag) {
            console.log(session)
            fetchOrdersFromDB(session.user.email as string)
            setFlag(true)
        }
    }, [session, flag])

    const handleStatusChange = async (orderId:any, value:string) => {
        const payload = {
            session
        }
        const response = await axios.put(`/api/store/order?orderId=${orderId}&status=${value}`,payload)
        if(response.data.success){
            toast({
                title:'Status updated',
            })
        }else{
            toast({
                variant: "destructive",
                title:'Something went wrong...',
            })
        }
    }

    const handleDeleteOrder = async (orderId:any) => {
        setIsLoading(true)
        const response = await axios.delete(`/api/store/orders?orderId=${orderId}`)
        if(response.data.success){
            toast({
                title:'Status updated',
            })
        }else{
            toast({
                variant: "destructive",
                title:'Something went wrong...',
            })
        }
        setIsLoading(false)
    }

    return (
        <div className='bg-[#f2f2f2] min-h-screen'>
            <h1 className="text-3xl ml-5 mb-5 pt-5">Orders</h1>
            <div className="overflow-auto w-full">
                {isLoading ? <div className='p-8 mx-auto'><Loading /></div> : <table className="my-10 border-3 border-solid border-[#521e52] w-full h-full table-auto border-collapse border-spacing-1 text-center overflow-x-auto w-inherit">
                    <caption className="caption-top text-center my-3">Track your orders</caption>
                    <thead>
                        <tr>
                            <th className="border-3 border-[#521e52] bg-[#c9afd9] text-black p-2">User</th>
                            <th className="border-3 border-[#521e52] bg-[#c9afd9] text-black p-2">Address</th>
                            <th className="border-3 border-[#521e52] bg-[#c9afd9] text-black p-2">Status</th>
                            <th className="border-3 border-[#521e52] bg-[#c9afd9] text-black p-2">Order-Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersArray.map((element: any, index: number) => (
                            <tr key={index}>
                                <td className="border-3 border-[#521e52] bg-[#f5d6f2] text-black p-2 flex items-center gap-2">{element.status === 'Cancelled' ? <div onClick={() => handleDeleteOrder(element._id)}><Trash2 className='text-red-500 size-5'/></div>:''}{element.user.userEmail}</td>
                                <td className="border-3 border-[#521e52] bg-[#f5d6f2] text-black p-2">{element.shippingAddress.address}, {element.shippingAddress.street}, {element.shippingAddress.state}, {element.shippingAddress.city}, {element.shippingAddress.pincode}</td>
                                <td className="border-3 border-[#521e52] bg-[#f5d6f2] text-black p-2">
                                    <Select value={element.status} onValueChange={(value:string) => handleStatusChange(element._id, value)}>
                                        <SelectTrigger className="w-fit">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Confirmed">Confirmed</SelectItem>
                                            <SelectItem value="Pending">Pending</SelectItem>
                                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                                            <SelectItem value="Shipped">Shipped</SelectItem>
                                            <SelectItem value="Delivered">Delivered</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </td>
                                <td className="border-3 border-[#521e52] bg-[#f5d6f2] text-black p-2">{element._id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>}
            </div>
        </div>
    )
}

export default page