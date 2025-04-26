import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const SignupPage = () => {
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")
    const [firstName , setFirstName] = useState("")
    const [lastName , setLastName] = useState("")
    const [email , setEmail] = useState("")
    const [loading , setLoading] = useState("")

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setLoading(true)
        if(firstName == ""){
            alert("Please enter details")
        }
        if(lastName == ""){
            alert("Please enter details")
        }
        if(email == ""){
            alert("Please enter details")
        }
        if(confirmPassword == ""){
            alert("Please enter details")
        }
        if(password == ""){
            alert("Please enter details")
        }

        try{
            const res = await axios.post("http://127.0.0.1:8000/auth/signup/",{
                username ,
                password ,
                first_name:firstName ,
                last_name:lastName ,
                email
            })
            console.log(res.data)
            alert("User registered successfully!")
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }

    }
  return (
    <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 min-h-screen flex justify-center items-center ">
        <div className='bg-white p-10 rounded-lg  '>
            <h1 className='text-center text-4xl pb-8'>Signup</h1>
            <div className='flex flex-col gap-6 items-center justify-center'
             >
                <input type='text' placeholder='username' className="w-80 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={(e)=>setUsername(e.target.value)}/>
                <input type='password' placeholder='password' className="w-80 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={(e)=>setPassword(e.target.value)}/>
                <input type='text' placeholder=' first name' className="w-80 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={(e)=>setFirstName(e.target.value)}/>
                <input type='text' placeholder='last name' className="w-80 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={(e)=>setLastName(e.target.value)}/>
                <input type='text' placeholder='email' className="w-80 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={(e)=>setEmail(e.target.value)}/>
                <button className='border rounded-4xl text-white bg-gray-700 focus:outline-0 hover:bg-gray-500 p-4 w-40' onClick={handleSubmit}>Signup</button>
                <p>Already a user ? <Link to="/login" className='no-underline text-blue-500'>Login</Link></p>
        </div>
        </div>
    </div>
    
  )
}

export default SignupPage