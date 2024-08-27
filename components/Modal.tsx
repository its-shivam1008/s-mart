'use client'
import React, { useEffect } from 'react'


const Modal = ({children}:{children:React.ReactNode}) => {
    useEffect(() => {
        document.body.style.overflowY = 'hidden';
      return () => {
        document.body.style.overflowY = 'scroll';
      }
    }, [])
    
  return (
    <div>
        <div className="modal-wrapper left-0 right-0 bottom-0 top-0 fixed bg-opacity-20 bg-[rebeccapurple] backdrop-blur-md"></div>
        <div className="modal-container fixed top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 md:w-auto w-full">
            {children}
        </div>
    </div>
  )
}

export default Modal