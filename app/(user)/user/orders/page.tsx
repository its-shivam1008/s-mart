import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen bg-[#f2f2f2]'>
      <div className="text-3xl font-bold p-5">Orders</div>
      <div className='p-5 bg-white rounded-[12px] shadow-xl border-2 border-solid border-gray-400 flex justify-between gap-5 w-auto mx-auto md:w-[550px]'>
        <div className='flex flex-col gap-2 justify-between items-center bg-blue-300 w-auto md:w-auto'>
          <div className='flex flex-col gap-1 bg-yellow-500'>
            <div className="title text-black font-bold">tittle</div>
            <div className="order-number text-gray-400">number</div>
            <div className="order-number">order date</div>
            <div className="order-number">deliver on</div>
            <div className="pricequantity flex justify-between w-auto">
              <div className="order-number">Price:$356469</div>
              <div className="order-number">quantity:123</div>
            </div>
          </div>
          <button type='button' className='bg-red-400'>Cancel order</button>
        </div>
        <div className="image h-40 w-40 bg-blue-300">

        </div>
      </div>
    </div>
  )
}

export default page