"use client";
import React, { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

const page = () => {
  const [textValue, setTextValue] = useState('');
  const { data: session, status } = useSession()
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void =>{
    //handlng the verify code field changes
    setTextValue(e.target.value);
  }

  const submitTheVerifyCode = async(e: React.FormEvent<HTMLFormElement>) =>{
    // prevnting the page refresh
    e.preventDefault()
    // verifying the verification code through fetch
    const res = await fetch('http://localhost:3000/api/verifyingCode', {
      method:'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body:JSON.stringify({session, verifyCode:textValue})
    })
    const data = await res.json();
    // redirecting the user to home page if verified successfully
    if(data.success){
      router.push('/');
    }else{
      alert(data.message);
    }
  }
  return (
    <div>
      <form onSubmit={submitTheVerifyCode}>
            <label htmlFor="verifyCode">Enter Verification Code:</label>
            <input type="text" name="verifyCode" id="verifyCode" value={textValue} onChange={handleChange}/>
            <button type="submit" className='bg-blue-500 text-white rounded-full px-3 py-2 cursor-pointer m-5'>Verify</button>
        </form>
    </div>
  )
}

export default page
