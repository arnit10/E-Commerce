import React, { useState } from "react"
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import SignupPage from "./SignupPage"
import { useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'


export const LoginPage = () =>{
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [error , setError] = useState('')
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setLoading(true);

        try{
            const response = await axios.post("http://localhost:5000/api/auth/login",{
                email,
                password
            }, { withCredentials: true });
            setLoading(false);

            if (response.data && response.data.user.name){
                dispatch(login({ user: response.data.user, token: response.data.token }));
                console.log("✅ User data:", response.data);
                navigate(`/profile/${response.data.user.name}`, { state: response.data.user });
            }else {
                alert("Invalid credentials or user not found");
              }

        }
        catch(err){
            console.error("❌ Login error:", err);
            setError("Login failed. Please try again.");
        }
    }

    return(

        <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 min-h-screen flex justify-center items-center ">
                <div className="flex items-center justify-center flex-col border-white bg-white p-10 rounded-md ">
                    <h1 className="text-4xl text-center pb-8">Login</h1>
                    <div className="flex items-center flex-col gap-6">
                        <input className="w-80 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                        <input className="w-80 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                        <button className="bg-gray-600 text-white border border-gray-700 rounded-lg p-4 w-58 hover:bg-gray-700 focus:outline-none"
                        onClick={handleSubmit}
                        disabled={loading}>Login</button>

                        <p>New User? <Link to='/signup' className="no-underline text-blue-500" >Signup</Link></p>

                        {loading && <p>Loading...</p>}

                        {error && <p className="text-red-500">{error}</p>}
                    
                    </div>

                </div>
        </div>
    )
}
