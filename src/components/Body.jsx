import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { BASE_URL } from '../utils/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log("Not authenticated, redirecting to login");
      navigate("/login"); // This should redirect to login
    }
  }

  useEffect(() => {
    if (!user) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body