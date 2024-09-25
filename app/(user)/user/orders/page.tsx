import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen bg-[#f2f2f2]'>
      <div className="text-3xl font-bold p-5">Orders</div>
      <div className='bg-white rounded-[12px] shadow-xl border-2 border-solid border-gray-400 flex gap-5 w-auto mx-auto md:w-[600px]'>
        <div className='flex flex-col gap-2 justify-between'>
          <div className='flex flex-col gap-2'>
            <div className="title text-black font-bold"></div>
            <div className="order-number text-gray-500"></div>
          </div>
          <button type='button' className='bg-red-400'>Cancel order</button>
        </div>
        <div className="image h-40 w-40 bg-bluee-300">

        </div>
      </div>
    </div>
  )
}

export default page