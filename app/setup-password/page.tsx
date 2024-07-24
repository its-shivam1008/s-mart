"use client"
import React, { InputHTMLAttributes } from 'react'
import { useState } from 'react'

const page = () => {
    const [textValue, setTextValue] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void  =>{
        setTextValue(e.target.value)
    }
    const submitThePass = ()=>{
        // todo:
        // fetch to password saving route  to save the password
        
        // redirecting the user to verify itself
    }
  return (
    <div>
        <form action={submitThePass}>
            <label htmlFor="password">Enter password:</label>
            <input type="password" name="password" id="password" value={textValue} onChange={handleChange}/>
            <button type="submit">Save password</button>
        </form>
    </div>
  )
}

export default page
