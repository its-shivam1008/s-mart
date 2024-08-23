'use client'
import React from 'react'
import { ChartSpline, CirclePlus, House, LogOut, Shirt, ShoppingBasket, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'



const page = ({children}:{children:React.ReactNode}) => {

  const router = useRouter();
  const currentPath = usePathname();
  

  return (
    <div className='grid grid-cols-[1fr,6fr] md:grid-cols-[1fr, 3fr] min-h-screen'>
      
      <div className=' md:p-5 pt-5 pl-2  bg-[#f2f2f2] space-y-20'>
       <Link href={'/'}><div className='text-purple-500 flex gap-2 items-center'><House className='text-purple-500 size-5' /><div className='hidden md:flex'>Home</div></div></Link>
       <div className="space-y-8">
        <Link href={'/store'} className={`${currentPath== '/store' ? 'bg-gradient-to-r shadow-2xl from-rose-100 to-teal-100 text-purple-500 rounded-full p-3':'text-[rebeccapurple]'} flex gap-4 items-center font-bold text-xl`}><ChartSpline className={`${currentPath== '/store' ? 'text-purple-500':'text-purple-500'} size-8`} /><div className='hidden md:flex'>Analytics</div></Link>
        <Link href={'/store/allProducts'} className={`${currentPath== '/store/allProducts' ? 'bg-gradient-to-r shadow-2xl from-rose-100 to-teal-100 text-purple-500 rounded-full p-3':'text-[rebeccapurple]'} flex gap-4 items-center font-bold text-xl`}><Shirt className={`${currentPath== '/store/allProducts' ? 'text-purple-500':'text-purple-500'} size-8`} /><div className='hidden md:flex'>Your Products</div></Link>
        <Link href={'/store/addProduct'} className={`${currentPath=='/store/addProduct' ? 'bg-gradient-to-r shadow-2xl from-rose-100 to-teal-100 text-purple-500 rounded-full p-3':'text-[rebeccapurple]'} flex gap-4 items-center font-bold text-xl`}><CirclePlus className={`${currentPath== '/store/addProduct' ? 'text-purple-500':'text-purple-500'} size-8`} /><div className='hidden md:flex'>Add Product</div></Link>
        <Link href={'/store/orders'} className={`${currentPath=='/store/orders' ? 'bg-gradient-to-r shadow-2xl from-rose-100 to-teal-100 text-purple-500 rounded-full p-3':'text-[rebeccapurple]'} flex gap-4 items-center font-bold text-xl`}><ShoppingBasket className={`${currentPath== '/store/orders' ? 'text-purple-500':'text-purple-500'} size-8`} /><div className='hidden md:flex'>Orders</div></Link>
        <Link href={'/store/profile'} className={`${currentPath=='/store/profile' ? 'bg-gradient-to-r shadow-2xl from-rose-100 to-teal-100 text-purple-500 rounded-full p-3':'text-[rebeccapurple]'} flex gap-4 items-center font-bold text-xl`}><User className={`${currentPath== '/store/profile' ? 'text-purple-500':'text-purple-500'} size-8`} /><div className='hidden md:flex'>Profile</div></Link>
       </div>
       <div className='text-purple-500 flex gap-2 items-center'><LogOut className='text-purple-500 size-5' /><div className='hidden md:flex'>Logout</div></div>
      </div>
      <div className=''>{children}</div>
    </div>
  )
}

export default page