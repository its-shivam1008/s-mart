"use client"
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Home() {

  const { data: session, status } = useSession()
  return (
    <div>
      hello this side ecommerce app

      <button type='button' onClick={()=>{signOut()}}>Sign out</button>
    </div>
  );
}
