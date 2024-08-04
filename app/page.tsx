"use client"
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useSession()
  useEffect(() => {
    const checkPass = async () =>{
      // alert('useeffect')
      if(session){
        // console.log(session)
        const res = await axios.get(`/api/isVerified?email=${session.user.email}`);
        // console.log(res.data.isVerified)
        if(!res.data.isVerified){
          router.push('/verify')
        }
      }
    }
    checkPass();
  }, [session]) //You get undefined because the session hasn't been fetched yet. You can solve it by using useEffect and adding "session" to its dependencies
  
  
  return (
    <div>
      hello this side ecommerce app hii

      <button type='button' onClick={()=>{signOut()}}>Sign out</button>
    </div>
  );
}
