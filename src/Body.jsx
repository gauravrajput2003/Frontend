import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import axios from 'axios';
import BASE_URL from './utils/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './utils/userSlice';

const Body = () => {
  const Navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector((store)=>store.user);
  const fetchUser=async()=>{
    if(user)return;
    try{
const res=await axios.get(BASE_URL+"/profile/view",{
  withCredentials:true,
});
dispatch(addUser(res.data));
    }
  catch(err){
    if(err.status==401){
 Navigate("/login");
    }
   
    console.log(err);
  }
  };
  useEffect(()=>{
  
    fetchUser();
   

  },[]);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  ) 
}

export default Body