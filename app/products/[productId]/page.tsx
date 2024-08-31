'use client'
import React from 'react'
// import { useRouter } from 'next/navigation'

const page = ({params}: any) => {
    // const router = useRouter()
  return (
    <div className="text-3xl h-full bg-green-500 flex items-start"> {params.productId}</div>
  )
}

export default page