import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from '../utils/Constant'

const Login = () => {
      const navigate=useNavigate();
  const[email,setemail]=useState("sk@gmail.com");
  const[password,setpassword]=useState("Animal@@80");
  const [Error,setError]=useState();
  const dispatch=useDispatch();
    const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleLogin=async()=>{
if (!validateEmail(email)) {
      setError("email is incorrect");
      return;
    }
 try{
  const res=await axios.post(BASE_URL+"/Login",{
  email,
  password,
 },
{withCredentials:true}
);


// Dispatch only the user object, not the whole response
dispatch(addUser(res.data.user));
navigate("/")
}

 catch(err){
setError(err?.response?.data || "something went wrong");
  // console.log(err);
 }
  };
  return (
    <div className='flex justify-center my-20'>
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title flex justify-center text-2xl mb-6">Login</h2>
          
          {/* Email Field */}
          <label className="input input-bordered flex items-center gap-2">
            <svg className="h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input type="email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
             placeholder="your@email.com" />
          </label>
          
          {/* Password Field */}
          <label className="input input-bordered flex items-center gap-2 mt-4">
            <svg className="h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input type="password" 
              value={password}
              onChange={(e)=>setpassword(e.target.value)}
            placeholder="Password" />
          </label>
          
          {/* Login Button */}
         <p className='text-red-500 text-2xl'>{Error}</p>
          <div className="card-actions justify-center mt-6">
            <button className="btn btn-primary w-full" onClick={handleLogin}>Login</button>
          </div>
          
          {/* Sign up link */}
          <div className="text-center mt-4">
            <p className="text-sm">Don't have an account? 
              <a href="#" className="link link-primary ml-1">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login