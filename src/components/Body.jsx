import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { BASE_URL } from '../utils/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(true);

  // Public routes that don't require auth
  const publicPaths = ["/login", "/privacy", "/about", "/contact"];
  const isPublicRoute = publicPaths.includes(location.pathname);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      setIsLoading(false);
    } catch (err) {
      console.log("Not authenticated, redirecting to login");
      setIsLoading(false);
      navigate("/login", { replace: true });
    }
  }

  useEffect(() => {
    if (!user && !isPublicRoute) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
    // re-evaluate when route changes between public/protected
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPublicRoute]);

  if (isLoading && !isPublicRoute) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
          <div className="loading loading-spinner loading-lg text-sky-400"></div>
        </div>
        <Footer />
      </div>
    );
  }

  // Allow public routes even when not authenticated
  if (isPublicRoute) {
    return (
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  }

  // If not logged in (protected route) and not loading, don't render content
  if (!user) return null;

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body