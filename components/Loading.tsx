import { CircleDot } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='container mb-10'>
        <CircleDot className='text-[rebeccapurple] animate-ping size-10 mx-auto'/>
    </div>
  )
}

export default Loading