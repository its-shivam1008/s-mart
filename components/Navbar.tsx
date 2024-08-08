'use client'
import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Navbar = () => {

    const navBar = useRef(null)
    
    const tl = gsap.timeline()
    useGSAP(()=>{
        tl.from(navBar.current,{
            scale:0,
            backgroundColor:'white',
            duration:0.5,
            delay:0.3
        })
        tl.from('.icons',{
            y:-30,
            opacity:0,
            duration:1,
            delay:0.5,
        })
        tl.from('.elements',{
            y:30,
            opacity:0,
            duration:0.5,
            stagger:0.2
        })
    })


  return (
    <div ref={navBar} className='top-3 rounded-lg absolute w-full'>
        <div className='w-[90%] bg-white bg-opacity-40  backdrop-filter backdrop-blur-md  mx-auto rounded-full flex font-bold text-xl tracking-wide items-center justify-around h-12'>
            <div className="icons">Logo</div>
            <div className='pages flex gap-10 text-stroke'>
                <div className='elements'>Products</div>
                <div className='elements'>Categories</div>
                <div className='elements'>About us</div>
                <div className='elements'>Contact</div>
            </div>
            <div className="icons">UserLogo</div>
        </div>
        
    </div>
  )
}

export default Navbar