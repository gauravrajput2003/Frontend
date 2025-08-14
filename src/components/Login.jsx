import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from '../utils/Constant'

const Login = () => {
  const navigate=useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Error, setError] = useState();
  const [islogin,setislogin]=useState(true);
  const dispatch = useDispatch();
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Simple LOGIN function - only handles login
  const handleLogin = async() => {
    if (!validateEmail(email)) {
      setError("Email is incorrect");
      return;
    }
    
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    
    try {
      const res = await axios.post(BASE_URL + "/login", {
        email,
        password
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      dispatch(addUser(res.data.user));
      navigate("/")
    }
    catch(err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  // Separate SIGNUP function
  const handleSignup = async() => {
    if (!firstName.trim()) {
      setError("First name is required");
      return;
    }
    
    if (!lastName.trim()) {
      setError("Last name is required");
      return;
    }
    
    if (!validateEmail(email)) {
      setError("Email is incorrect");
      return;
    }
    
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        email,
        password
      }, {
        withCredentials: true
      });
      console.log("chekc signup");
      dispatch(addUser(res.data.data));
      navigate("/profile");
    }
    catch(err) {
      setError(err?.response?.data || "Something went wrong");
    }
  }

  return (
    <div className='flex justify-center my-20'>
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title flex justify-center text-2xl mb-6 text-primary">
            {islogin ? "Welcome Back!" : "Create Account"}
          </h2>
          
          {/* First Name & Last Name Fields - Only for Signup */}
          {!islogin && (
            <>
              <label className="input input-bordered flex items-center gap-2 h-12">
                <svg className="h-5 w-5 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input 
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name" 
                  className="grow text-base font-medium"
                />
              </label>

              <label className="input input-bordered flex items-center gap-2 mt-4 h-12">
                <svg className="h-5 w-5 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input 
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name" 
                  className="grow text-base font-medium"
                />
              </label>
            </>
          )}
          
          {/* Email Field */}
          <label className="input input-bordered flex items-center gap-2 mt-4 h-12">
            <svg className="h-5 w-5 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input 
              type="email"
              value={email}
              onChange={(e)=>setemail(e.target.value)}
              placeholder="your@email.com" 
              className="grow text-base font-medium"
            />
          </label>
          
          {/* Password Field */}
          <label className="input input-bordered flex items-center gap-2 mt-4 h-12">
            <svg className="h-5 w-5 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input 
              type="password" 
              value={password}
              onChange={(e)=>setpassword(e.target.value)}
              placeholder="Password" 
              className="grow text-base font-medium"
            />
          </label>
          
          {/* Error Message */}
          {Error && (
            <div className="alert alert-error mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-base">{Error}</span>
            </div>
          )}
          
          {/* Submit Button - Calls correct function */}
          <div className="card-actions justify-center mt-6">
            <button 
              className="btn btn-primary w-full text-lg h-12" 
              onClick={islogin ? handleLogin : handleSignup}
            >
              {islogin ? "Login" : "Create Account"}
            </button>
          </div>
          
          {/* Toggle Link */}
          <div className="divider">OR</div>
          
          <div className="text-center">
            <p className="text-base-content/70 text-base mb-2">
              {islogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              onClick={() => {
                setislogin(!islogin);
                setError("");
              }}
              className="btn btn-ghost btn-md text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              {islogin ? "Sign up here" : "Login here"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login