"use client"
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState , useRef} from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import {useGSAP} from '@gsap/react';

export default function Home() {

  const signOutRef = useRef(null);
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
      <main className="w-full">
        <div className="home h-screen w-full bg-blue-400 flex justify-center items-center">
            
            <div className="text-white absolute flex flex-col gap-3">
              <div className="buy-text tracking-wider font-bold text-xl">Buy Anything</div>
              <div className="text-5xl flex gap-5 font-extrabold tracking-widest text-stroke">
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
