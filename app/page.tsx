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
      alert('useeffect')
      if(session){
        alert('session present')
        const response = await axios.get(`/api/checkPassword?email=${session.user.email}`)
        if(!response.data.isPasswordPresent){
           router.push('/setup-password')
        }
      }else{
        alert('no session')
      }
    }
    checkPass();
  }, [])
  

  return (
    <div>
      hello this side ecommerce app

      <button type='button' onClick={()=>{signOut()}}>Sign out</button>
    </div>
  );
}
