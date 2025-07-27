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
      Navigate("/login");
    }
    catch(err){
      // console.log(err);
    }
  }
  return (
    <div className="navbar bg-base-300 text-base-content shadow-md">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">👦DevNexus</Link>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end mx-5 flex items-center">
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
            className="menu menu-sm dropdown-content bg-base-200 text-base-content rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-base-300"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile <span className="badge">New</span>
              </Link>
            </li>
            <li><a>Settings</a></li>
            <li><a onClick={LogoutUser}>Logout</a></li>
          </ul>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar 