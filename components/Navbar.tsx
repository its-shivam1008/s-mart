'use client'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { CircleUserRound } from 'lucide-react'
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {

    const navBar = useRef(null)
    const { data: session, status } = useSession()

    const [menuClicked, setMenuClicked] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    const { contextSafe } = useGSAP();

    useGSAP(() => {
        const tl = gsap.timeline()
        tl.from(navBar.current, {
            scale: 0,
            backgroundColor: 'white',
            duration: 0.5,
            delay: 0.3
        })
        tl.from('.icons', {
            y: -30,
            opacity: 0,
            duration: 1,
            delay: 0.5,
        })
        tl.from('.elements', {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.2
        })
        tl.kill()
    })

    useEffect(() => {
        //   setMenuClicked(menuClicked)
    }, [menuClicked])


    const handleClick = contextSafe(() => {

        console.log(menuClicked)
        if (menuClicked) {

            gsap.to('.menuElements', {
                x: 80,
                opacity: 0,
                stagger: -0.3,
                onComplete: () => {
                    gsap.to('.navMenu', {
                        y: -300,
                        scale: 0,
                        opacity: 0,
                        onComplete: () => setMenuClicked(false)
                    });
                }
            });
        } else {
            setMenuClicked(true)
            gsap.fromTo('.navMenu', {
                y: -300,
                scale: 0,
                opacity: 0,
            }, {
                y: 0,
                scale: 1,
                opacity: 1,
                // duration:0.3,
                onComplete: () => {
                    gsap.fromTo('.menuElements', { x: 80, opacity: 0 }, {
                        x: 0,
                        opacity: 1,
                        stagger: 0.3,
                        // duration:0.5,

                    });
                }
            });
        }
    })

    return (
        <div ref={navBar} className='top-3 rounded-lg absolute w-full z-50'>
            <div className='w-[90%] bg-white bg-opacity-40  backdrop-filter backdrop-blur-md  mx-auto rounded-full flex font-bold text-xl tracking-wide items-center justify-around h-12'>
                <div className="rounded-full w-auto border-purple-500 border-2 size-8  overflow-hidden">
                    <img alt='noimagefound' className='rounded-full object-cover size-8' width={10} height={10} src='https://res.cloudinary.com/di8z1aufv/image/upload/v1727023012/S_-_Mart_lfvdl6.jpg' />
                </div>
                <div className='pages md:flex hidden gap-10'>
                    <Link href='/products' className='elements font-normal  hover:text-blue-500 transition-colors duration-500'>Products</Link>
                    <Link href='/categories' className='elements font-normal  hover:text-blue-500 transition-colors duration-500'>Categories</Link>
                    <Link href='/user/cart' className='elements font-normal  hover:text-blue-500 transition-colors duration-500'>Cart</Link>
                    <Link href='/ask-ai' className='elements font-normal  hover:text-blue-500 transition-colors duration-500'>Ask Ai</Link>
                </div>
                <div className="icons flex items-center gap-3">
                    {session ? <div className="rounded-full w-auto border-purple-500 border-2 size-8  overflow-hidden">
                        {session?.user.image ? <img alt='noimagefound' className='rounded-full object-cover size-8' width={10} height={10} src={session?.user.image as string} /> : <CircleUserRound className='text-[#935fc8] size-8' />}
                    </div> :
                        <div>
                            <Link href='/sign-up' className='text-lg text-white hover:text-purple-500 transition-colors duration-500'>Sign-up</Link>
                        </div>
                    }
                    <div onClick={handleClick} className="burgerMenu cursor-pointer md:hidden flex flex-col gap-1 justify-center">
                        <div className="lines w-6 h-1 rounded-full bg-black"></div>
                        <div className="lines w-4 h-1 rounded-full bg-black"></div>
                        <div className="lines w-2 h-1 rounded-full bg-black"></div>
                    </div>
                </div>
            </div>
            <div className={`navMenu min-h-[80vh] ${menuClicked ? `flex ` : `hidden`} flex-col items-center justify-evenly m-5 rounded-[16px]  bg-green-300 bg-opacity-30  backdrop-filter backdrop-blur-md shadow-xl`}>
                <Link href='/products' className='menuElements font-bold text-3xl hover:text-blue-500 transition-colors duration-500'>Products</Link>
                <Link href='/categories' className='menuElements font-bold text-3xl hover:text-blue-500 transition-colors duration-500'>Categories</Link>
                <Link href='/user/cart' className='menuElements font-bold text-3xl hover:text-blue-500 transition-colors duration-500'>Cart</Link>
                <Link href='/ask-ai' className='menuElements font-bold text-3xl hover:text-blue-500 transition-colors duration-500'>Ask Ai</Link>
            </div>
        </div>
    )
}

export default Navbar
