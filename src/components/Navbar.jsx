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
    <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 sticky top-0 z-[60] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 text-white hover:text-purple-400 transition-colors duration-300">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                D
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                DevNexus
              </span>
            </Link>
            
            {/* Navigation Links */}
            {user && (
              <div className="hidden md:flex items-center gap-6">
                <Link 
                  to="/" 
                  className="text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-all duration-200 flex items-center gap-2"
                >
                  <span className="text-lg">🏠</span>
                  <span>Feed</span>
                </Link>
                <Link 
                  to="/connections" 
                  className="text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-all duration-200 flex items-center gap-2"
                >
                  <span className="text-lg">🤝</span>
                  <span>Connections</span>
                </Link>
                <Link 
                  to="/requests" 
                  className="text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-all duration-200 flex items-center gap-2"
                >
                  <span className="text-lg">📬</span>
                  <span>Requests</span>
                </Link>
                <Link 
                  to="/about" 
                  className="text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-all duration-200 flex items-center gap-2"
                >
                  <span className="text-lg">ℹ️</span>
                  <span>About</span>
                </Link>
                <Link 
                  to="/contact" 
                  className="text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-all duration-200 flex items-center gap-2"
                >
                  <span className="text-lg">📞</span>
                  <span>Contact</span>
                </Link>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Premium Badge */}
                {user?.isPremium && (
                  <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-3 py-1">
                    <span className="text-yellow-400 text-sm">⭐</span>
                    <span className="text-yellow-400 text-sm font-medium">Premium</span>
                  </div>
                )}
                
                {/* Premium CTA for non-premium users */}
                {!user?.isPremium && (
                  <Link 
                    to="/premium" 
                    className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <span className="text-sm">✨</span>
                    <span className="text-sm">Go Premium</span>
                  </Link>
                )}

                {/* User Profile Dropdown */}
                <div className="dropdown dropdown-end">
                  <div 
                    tabIndex={0} 
                    role="button" 
                    className="flex items-center gap-3 cursor-pointer hover:bg-slate-800/50 rounded-lg p-2 transition-all duration-200"
                  >
                    <div className="hidden sm:block text-right">
                      <p className="text-white text-sm font-medium">
                        {user?.firstName?.trim() || 'User'}
                      </p>
                      <p className="text-slate-400 text-xs">
                        {user?.isPremium ? 'Premium Member' : 'Free Member'}
                      </p>
                    </div>
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500/50 hover:border-purple-400 transition-colors">
                        <img
                          alt="User photo"
                          src={user?.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
                          }}
                        />
                      </div>
                      {user?.isPremium && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">⭐</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content bg-slate-800/95 backdrop-blur-md rounded-xl z-[100] mt-3 w-56 p-3 shadow-2xl border border-slate-700/50"
                  >
                    <li className="mb-2">
                      <Link 
                        to="/profile" 
                        className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg p-2 transition-all duration-200"
                      >
                        <span className="text-lg">👤</span>
                        <span>Edit Profile</span>
                        <span className="ml-auto badge badge-primary badge-sm">New</span>
                      </Link>
                    </li>
                    <li className="mb-2 md:hidden">
                      <Link 
                        to="/connections" 
                        className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg p-2 transition-all duration-200"
                      >
                        <span className="text-lg">🤝</span>
                        <span>Connections</span>
                      </Link>
                    </li>
                    <li className="mb-2 md:hidden">
                      <Link 
                        to="/requests" 
                        className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg p-2 transition-all duration-200"
                      >
                        <span className="text-lg">📬</span>
                        <span>Requests</span>
                      </Link>
                    </li>
                    {!user?.isPremium && (
                      <li className="mb-2">
                        <Link 
                          to="/premium" 
                          className="flex items-center gap-3 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg p-2 transition-all duration-200"
                        >
                          <span className="text-lg">✨</span>
                          <span>Upgrade to Premium</span>
                        </Link>
                      </li>
                    )}
                    <li className="mb-2 md:hidden">
                      <Link 
                        to="/about" 
                        className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg p-2 transition-all duration-200"
                      >
                        <span className="text-lg">ℹ️</span>
                        <span>About</span>
                      </Link>
                    </li>
                    <li className="mb-3 md:hidden">
                      <Link 
                        to="/contact" 
                        className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg p-2 transition-all duration-200"
                      >
                        <span className="text-lg">📞</span>
                        <span>Contact</span>
                      </Link>
                    </li>
                    <div className="divider divider-slate-700 my-2"></div>
                    <li>
                      <a 
                        onClick={LogoutUser} 
                        className="flex items-center gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg p-2 transition-all duration-200"
                      >
                        <span className="text-lg">🚪</span>
                        <span>Logout</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/about" 
                  className="text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-all duration-200"
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-all duration-200"
                >
                  Contact
                </Link>
                <Link 
                  to="/login" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar