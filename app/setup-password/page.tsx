"use client"
import React, { InputHTMLAttributes } from 'react'
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useState } from 'react'


const page = () => {
    const [textValue, setTextValue] = useState("");
    const [userRole, setUserRole] = useState('User');
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void  =>{
        //handle the change in the password field
        setTextValue(e.target.value)
    }

    const submitThePass =async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        // fetch to password saving route to save the password
        const res = await fetch('http://localhost:3000/api/setup-password',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({session, password:textValue, role:userRole}),
        })
        const data = await res.json();
        console.log(data);
        // redirecting the user to verify itself if the verification email has been sent to the user
        if(data.success){
            router.push('/verify');
        }else{
            alert("cannot sent the email");
        }
    }

    const handleClick = ():void =>{
        setUserRole('StoreOwner');
    }
  return (
    <div>
        <form onSubmit={submitThePass}>
            <label htmlFor="password">Enter password:</label>
            <input type="password" name="password" id="password" value={textValue} onChange={handleChange}/>
            <button type="submit" className='bg-blue-500 m-5 text-white rounded-full px-3 py-2 cursor-pointer'>Save password</button>
        </form>
        <button type="button" className='bg-blue-500 m-5 text-white rounded-full px-3 py-2 cursor-pointer' onClick={handleClick}>Wanted to open a store ?</button>
    </div>
  )
}

export default page
