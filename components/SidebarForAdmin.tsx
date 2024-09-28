'use client'
import React from 'react'
import { Boxes, ChartSpline, CirclePlus, House, ImagePlus, LogOut, Shirt, ShoppingBasket, User, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react";



const SidebarForAdmin = ({children}:{children:React.ReactNode}) => {

  const router = useRouter();
  const currentPath = usePathname();
  

  return (
    <div className='grid grid-cols-[1fr,6fr] md:grid-cols-[1fr, 3fr] min-h-screen'>
      
      <div className=' md:p-5 pt-5 pl-2  bg-[#f2f2f2] space-y-20'>
       <Link href={'/'}><div className='text-purple-500 flex gap-2 items-center'><House className='text-purple-500 size-5' /><div className='hidden md:flex'>Home</div></div></Link>
       <div className="space-y-8">
        <Link href={'/admin'} className={`${currentPath== '/admin' ? 'bg-gradient-to-r shadow-2xl from-rose-100 to-teal-100 text-purple-500 rounded-full p-3':'text-[rebeccapurple]'} flex gap-4 items-center font-bold text-xl`}><ChartSpline className={`${currentPath== '/admin' ? 'text-purple-500':'text-purple-500'} size-8`} /><div className='hidden md:flex'>Analytics</div></Link>
        <Link href={'/admin/categories'} className={`${currentPath== '/admin/categories' ? 'bg-gradient-to-r shadow-2xl from-rose-100 to-teal-100 text-purple-500 rounded-full p-3':'text-[rebeccapurple]'} flex gap-4 items-center font-bold text-xl`}><Boxes  className={`${currentPath== '/admin/categories' ? 'text-purple-500':'text-purple-500'} size-8`} /><div className='hidden md:flex'>Categories</div></Link>
        <Link href={'/admin/profile'} className={`${currentPath=='/admin/profile' ? 'bg-gradient-to-r shadow-2xl from-rose-100 to-teal-100 text-purple-500 rounded-full p-3':'text-[rebeccapurple]'} flex gap-4 items-center font-bold text-xl`}><Users className={`${currentPath== '/admin/profile' ? 'text-purple-500':'text-purple-500'} size-8`} /><div className='hidden md:flex'>Profile</div></Link>
       </div>
       <div className='text-purple-500 flex gap-2 items-center cursor-pointer' onClick={()=>{signOut()}}><LogOut className='text-purple-500 size-5' /><div className='hidden md:flex'>Logout</div></div>
      </div>
      <div className=''>{children}</div>
    </div>
  )
}

export default SidebarForAdmin