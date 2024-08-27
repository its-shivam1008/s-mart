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
    <div className="modal-wrapper fixed inset-0 bg-opacity-20 bg-[rebeccapurple] backdrop-blur-sm">
            <div className="modal-container fixed inset-0 flex items-center justify-center p-4 overflow-auto">
                <div className="rounded-lg shadow-lg w-full max-w-lg max-h-full">
                    {children}
                </div>
            </div>
        </div>
  )
}

export default Modal