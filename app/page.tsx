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
    gsap.from(signOutRef.current,{
      // x:1000,
      duration:5,
      delay:1,
      rotate:720,
      scale:2,
      // opacity:0,
      color:'red',
      background:'green'
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
        <div className="home h-screen w-full border-2 bg-blue-400">
          {/* bg here */}

          <div className="absolute">
            <div className="flex flex-col gap-3 bg-red-500">
              <div className="text-xl">Buy Anything</div>
              <div className="text-5xl flex gap-5 ">
                <div>Lorem</div>
                <div>Ipsum</div>
                <div>Dolor</div>
              </div>
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
