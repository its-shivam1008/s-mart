'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar';

const ConditionalNavbar = () => {
    const pathname = usePathname();
    const hideNavbarOnRoutes:string[] = ['/login', '/sign-up', '/sign-up/store','/verify', '/setup-password'];

    const hideNavbarfromPath = hideNavbarOnRoutes.includes(pathname) || pathname.startsWith('/store') || pathname.startsWith('/admin') || pathname.startsWith('/user')
  return (
    (!hideNavbarfromPath && <Navbar />)
  )
}

export default ConditionalNavbar