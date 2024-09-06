import React from 'react'

const CardSkeletonLoading = () => {
  return (
    <div className="relative eleProd my-5 w-48 h-fit p-4 rounded-[12px] flex flex-col gap-2 justify-center shadow-lg outline outline-offset-4 outline-transparent animate-pulse bg-gray-300">
    
    <div className='absolute top-3 right-2 ml-2 mb-2 p-2 bg-gray-400 rounded-full w-8 h-8'></div>

    
    <div className='w-fit h-fit'>
        
        <div className="title bg-gray-400 h-6 rounded mb-2 w-3/4"></div>
        
        <div className='mx-auto w-36 h-36 rounded-[8px] bg-gray-400 flex justify-center items-center'>
        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
        </div>
        
        
        <div className="price bg-gray-400 h-6 rounded my-2 w-1/2"></div>
        
        
        <div className="description bg-gray-400 h-4 rounded w-full"></div>
    </div>

    
    <button title='Add to cart' type="button" className='rounded-[8px] flex items-center px-full py-2 gap-2 bg-gray-400 text-transparent justify-center'>
        <div className='bg-gray-500 h-5 rounded w-24'></div>
    </button>
</div>
  )
}

export default CardSkeletonLoading