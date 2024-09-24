'use client'
import React from 'react'
import { Boxes, ChartSpline, CirclePlus, House, ImagePlus, LogOut, Logs, Shirt, ShoppingBasket, User, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react";



const SidebarForUser = ({children}:{children:React.ReactNode}) => {

  const router = useRouter();
  const currentPath = usePathname();
  

  return (
    <div className='grid grid-cols-[1fr,6fr] md:grid-cols-[1fr, 3fr] min-h-screen'>
      
      <div className=' md:p-5 pt-5 pl-2  bg-[#f2f2f2] space-y-20'>
       <Link href={'/'}><div className='text-purple-500 flex gap-2 items-center'><House className='text-purple-500 size-5' /><div className='hidden md:flex'>Home</div></div></Link>
       <div className="space-y-8">
        <Link href={'/user'} className={`${currentPath== '/user' ? 'bg-gradient-to-r shadow-2xl from-rose-100 to-teal-100 text-purple-500 rounded-full p-3':'text-[rebeccapurple]'} flex gap-4 items-center font-bold text-xl`}><ChartSpline className={`${currentPath== '/user' ? 'text-purple-500':'text-purple-500'} size-8`} /><div className='hidden md:flex'>Profile</div></Link>
        <Link href={'/user/wishlist'} className={`${currentPath== '/user/wishlist' ? 'bg-gradient-to-r shadow-2xl from-rose-100 to-teal-100 text-purple-500 rounded-full p-3':'text-[rebeccapurple]'} flex gap-4 items-center font-bold text-xl`}><Logs  className={`${currentPath== '/user/wishlist' ? 'text-purple-500':'text-purple-500'} size-8`} /><div className='hidden md:flex'>Wishlist</div></Link>
        <Link href={'/user/cart'} className={`${currentPath=='/user/cart' ? 'bg-gradient-to-r shadow-2xl from-rose-100 to-teal-100 text-purple-500 rounded-full p-3':'text-[rebeccapurple]'} flex gap-4 items-center font-bold text-xl`}><ShoppingBasket className={`${currentPath== '/user/cart' ? 'text-purple-500':'text-purple-500'} size-8`} /><div className='hidden md:flex'>Cart</div></Link>
        <Link href={'/user/orders'} className={`${currentPath=='/user/orders' ? 'bg-gradient-to-r shadow-2xl from-rose-100 to-teal-100 text-purple-500 rounded-full p-3':'text-[rebeccapurple]'} flex gap-4 items-center font-bold text-xl`}><ShoppingBasket className={`${currentPath== '/user/orders' ? 'text-purple-500':'text-purple-500'} size-8`} /><div className='hidden md:flex'>Orders</div></Link>
       </div>
       <div className='text-purple-500 flex gap-2 items-center' onClick={()=>{signOut()}}><LogOut className='text-purple-500 size-5' /><div className='hidden md:flex'>Logout</div></div>
      </div>
      <div className=''>{children}</div>
    </div>
  )
}

export default SidebarForUser