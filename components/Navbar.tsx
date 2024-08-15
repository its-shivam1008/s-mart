'use client'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Navbar = () => {

    const navBar = useRef(null)
    
    const [menuClicked, setMenuClicked] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    const {contextSafe} = useGSAP();
    
    useGSAP(()=>{
        const tl = gsap.timeline()
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




    const handleClick = contextSafe(() =>{

        // const tl4 = gsap.timeline()
        // tl4.to('.menuElements',{
        //     x:80,
        //     opacity:0,
        //     stagger:-0.3
        // })
        // tl4.to('.navMenu',{
        //     y:-300,
        //     scale:0,
        //     opacity:0,
        //     // display:'hidden',
        //     onComplete:() => {setMenuClicked(!menuClicked) 
        //         console.log('set to false after completion')}
        // })
        // tl4.pause();
        // if(menuClicked){
        //     tl4.reverse()
        // }else{
        //     tl4.play()
        // }


        if(menuClicked){
            const tl2 = gsap.timeline()
            tl2.to('.menuElements',{
                x:80,
                opacity:0,
                stagger:-0.3
            })
            tl2.to('.navMenu',{
                y:-300,
                scale:0,
                opacity:0,
                // display:'hidden',
                onComplete:() => {setMenuClicked(false) 
                    console.log('set to false after completion')}
            })
        }else{
            const tl3 = gsap.timeline()
            setMenuClicked(true)
            console.log('clicked',menuClicked)
            tl3.from('.navMenu',{
                y:-300,
                scale:0,
                opacity:0,
            })
            tl3.from('.menuElements',{
                x:80,
                opacity:0,
                stagger:0.3
            })
        }
    })


  return (
    <div ref={navBar} className='top-3 rounded-lg absolute w-full z-50'>
        <div className='w-[90%] bg-white bg-opacity-40  backdrop-filter backdrop-blur-md  mx-auto rounded-full flex font-bold text-xl tracking-wide items-center justify-around h-12'>
            <div className="icons">Logo</div>
            <div className='pages md:flex hidden gap-10'>
                <div className='elements font-normal'>Products</div>
                <div className='elements font-normal'>Categories</div>
                <div className='elements font-normal'>Cart</div>
                <div className='elements font-normal'>Ask Ai</div>
            </div>
            <div className="icons flex items-center gap-3">
                <div>UserLogo</div>
                <div onClick={handleClick} className="burgerMenu cursor-pointer md:hidden flex flex-col gap-1 justify-center">
                    <div className="lines w-6 h-1 rounded-full bg-black"></div>
                    <div className="lines w-4 h-1 rounded-full bg-black"></div>
                    <div className="lines w-2 h-1 rounded-full bg-black"></div>
                </div>
            </div>
        </div>
        <div className={`navMenu min-h-[80vh] ${menuClicked?`flex`:`hidden`} flex-col items-center justify-evenly m-5 rounded-[16px]  bg-white bg-opacity-30  backdrop-filter backdrop-blur-md shadow-xl`}>
            <div className='menuElements font-bold text-3xl hover:text-blue-500 transition-colors duration-700'>Products</div>
            <div className='menuElements font-bold text-3xl hover:text-blue-500 transition-colors duration-700'>Categories</div>
            <div className='menuElements font-bold text-3xl hover:text-blue-500 transition-colors duration-700'>Cart</div>
            <div className='menuElements font-bold text-3xl hover:text-blue-500 transition-colors duration-700'>Ask Ai</div>
        </div>
    </div>
  )
}

export default Navbar