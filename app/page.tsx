"use client"
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState , useRef} from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { Zenitho, Novatrix } from "uvcanvas"
import {useGSAP} from '@gsap/react';

export default function Home() {

  const {contextSafe} = useGSAP();
  const mainRef = useRef(null);
  const cursorRef = useRef(null);

  // mouse follower in the hero section 
  const mouseMove = contextSafe((e: React.MouseEvent)=>{
    gsap.to(cursorRef.current,{
      x:e.screenX-10,
      y:e.screenY-60,
      ease:'back.out',
      delay:0.1
    })
  })

  // scalinng the cursor on mouse enter and mouse leave
  const mouseEnter = contextSafe((e: React.MouseEvent)=>{
    gsap.to(cursorRef.current,{
      scale:2,
      delay:0.2,
      duration:0.2
    })
  })
  const mouseLeave = contextSafe((e: React.MouseEvent)=>{
    gsap.to(cursorRef.current,{
      scale:1,
      delay:0.2,
      duration:0.2
    })
  })


  const signOutRef = useRef(null);
  // text reveal animantion in the hero section 
  useGSAP(() => {
    const tl = gsap.timeline()
    tl.from('.buy-text', {
      duration:0.5,
      x:-30,
      opacity:0,
      delay:4
    })
    tl.from('.headings',{
      duration:1,
      scale:0,
      opacity:0,
    })
  })

  const router = useRouter()
  const [flag, setFlag] = useState(false)
  const { data: session, status } = useSession()
  useEffect(() => {
    const checkPass = async () =>{
      // alert('useeffect')
      if(session && !flag){
        // console.log(session)
        const res = await axios.get(`/api/isVerified?email=${session.user.email}`);
        // console.log(res.data.isVerified)
        setFlag(true)
        if(!res.data.isVerified){
          router.push('/verify')
        }
      }
    }
    checkPass();
  }, [session, flag]) //You get undefined because the session hasn't been fetched yet. You can solve it by using useEffect and adding "session" to its dependencies
  
  
  return (
    <div>
      <main onMouseMove={mouseMove} ref={mainRef} className="w-full">
        <div className="h-6 w-6 rounded-full bg-purple-500 opacity-50 fixed" ref={cursorRef}></div>
        <div className="home h-screen w-full  flex justify-center items-center">
        <Novatrix />
            <div className="text-Black absolute flex flex-col gap-3">
              <div className="buy-text tracking-wider font-bold text-xl">Buy Anything</div>
              <div onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className="text-5xl flex gap-5 font-extrabold tracking-widest text-stroke">
                <div className='headings'>Lorem</div>
                <div className='headings'>Ipsum</div>
                <div className='headings'>Dolor</div>
              </div>
          </div>
        </div>
      </main>

      {/* hello this side ecommerce app hii
        <button type='button' onClick={()=>{signOut()}}>Sign out</button>
      <div className='bg-blue-500 w-20 h-20 rounded-md m-5' ref={signOutRef}>

      </div> */}
      
    </div>
  );
}
