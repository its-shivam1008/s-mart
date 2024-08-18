'use client'
import React from 'react'
import { ChartSpline, CirclePlus, Shirt, ShoppingBasket, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'



const page = ({children}:{children:React.ReactNode}) => {

  const router = useRouter();
  const currentPath = usePathname();
  

  return (
    <div className='grid grid-cols-[1fr,3fr] min-h-screen'>
      
      <div className=' p-5 bg-[#f2f2f2] space-y-20'>
       <div>Home</div>
       <div className="space-y-5">
        <Link href={'/store'} className={`${currentPath== '/store' ? 'bg-gradient-to-r from-rose-100 to-teal-100 text-purple-500 rounded-full p-3':'text-[rebeccapurple]'} flex gap-4 items-center font-bold text-xl`}><ChartSpline className={`${currentPath== '/store' ? 'text-purple-400':'text-purple-300'} size-8`} />Analytics</Link>
        <Link href={'/store/allProducts'} className={`${currentPath== '/store/allProducts' ? 'bg-gradient-to-r from-rose-100 to-teal-100 text-purple-500 rounded-full p-3':'text-[rebeccapurple]'} flex gap-4 items-center font-bold text-xl`}><Shirt className={`${currentPath== '/store/allProducts' ? 'text-purple-400':'text-purple-300'} size-8`} />Your Products</Link>
        <Link href={'/store/addProduct'} className={`${currentPath=='/store/addProduct' ? 'bg-gradient-to-r from-rose-100 to-teal-100 text-purple-500 rounded-full p-3':'text-[rebeccapurple]'} flex gap-4 items-center font-bold text-xl`}><CirclePlus className={`${currentPath== '/store/addProduct' ? 'text-purple-400':'text-purple-300'} size-8`} />Add Product</Link>
        <Link href={'/store/orders'} className={`${currentPath=='/store/orders' ? 'bg-gradient-to-r from-rose-100 to-teal-100 text-purple-500 rounded-full p-3':'text-[rebeccapurple]'} flex gap-4 items-center font-bold text-xl`}><ShoppingBasket className={`${currentPath== '/store/ordesr' ? 'text-purple-400':'text-purple-300'} size-8`} />Orders</Link>
        <Link href={'/store/profile'} className={`${currentPath=='/store/profile' ? 'bg-gradient-to-r from-rose-100 to-teal-100 text-purple-500 rounded-full p-3':'text-[rebeccapurple]'} flex gap-4 items-center font-bold text-xl`}><User className={`${currentPath== '/store/profile' ? 'text-purple-400':'text-purple-300'} size-8`} />Profile</Link>
       </div>
       <div>Logout</div>
      </div>
      <div className='mt-20'>{children}</div>
    </div>
  )
}

export default page