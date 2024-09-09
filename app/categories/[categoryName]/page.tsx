import React from 'react'

const page = ({ params }: any) => {
  return (
    <div className='bg-green-700 text-5xl text-white'>{params.categoryName}</div>
  )
}

export default page