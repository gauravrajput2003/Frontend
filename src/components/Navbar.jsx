import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/Constant';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
  const user=useSelector((store)=>store.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const LogoutUser=async()=>{
    try{
    await axios.post(BASE_URL+"/logout",{},{
            withCredentials:true,
      });
      dispatch(removeUser());
      navigate("/login");
    }
    catch(err){
      // console.log(err);
    }
  }
  return (
    <div className="navbar bg-base-300 text-base-content shadow-md sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">👦DevNexus</Link>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end dropdown-hover mx-5 flex items-center">
            <p className='px-4 text-base font-medium'>
              Welcome, {user?.firstName?.trim() || 'User'}!
            </p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User photo"
                  src={user.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-[100] mt-8 w-52 p-2 shadow-xl border border-base-300"
            >
              <li>
                <Link to="/profile" className="justify-between hover:bg-primary hover:text-white">
                  Profile <span className="badge badge-primary badge-sm">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" className="hover:bg-primary hover:text-white">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="hover:bg-primary hover:text-white">
                  Requests
                </Link>
              </li>
              <li>
                <a onClick={LogoutUser} className="hover:bg-error hover:text-white">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar