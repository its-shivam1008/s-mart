"use client"
import React, { InputHTMLAttributes } from 'react'
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useState } from 'react'

const page = () => {
    const [textValue, setTextValue] = useState("");
    const { data: session, status } = useSession()
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void  =>{
        setTextValue(e.target.value)
    }
    const submitThePass =async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        // todo:
        // fetch to password saving route  to save the password
        const res = await fetch('http://localhost:3000/app/api/setup-password',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(session),
        })
        const data = await res.json();
        console.log(data);
        // redirecting the user to verify itself
        router.push('/verify');
    }
  return (
    <div>
        <form onSubmit={submitThePass}>
            <label htmlFor="password">Enter password:</label>
            <input type="password" name="password" id="password" value={textValue} onChange={handleChange}/>
            <button type="submit" className='bg-blue-500 text-white rounded-full px-3 py-2 cursor-pointer'>Save password</button>
        </form>
    </div>
  )
}

export default page
