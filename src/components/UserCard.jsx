import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { BASE_URL } from '../utils/Constant';

const UserCard = ({ user, onUserAction, interactive = true }) => {
  const [isCardAnimating, setIsCardAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);

  const handleAction = (direction) => {
    setSwipeDirection(direction);
    setIsCardAnimating(true);
    setTimeout(() => {
      setSwipeDirection(null);
      setIsCardAnimating(false);
      if (onUserAction) onUserAction();
    }, 500);
  };

  const variants = {
    initial: { opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 },
    interested: {
      x: 300,
      y: -50,
      rotate: 25,
      opacity: 0,
      scale: 0.9,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
    ignore: {
      x: -300,
      y: 50,
      rotate: -25,
      opacity: 0,
      scale: 0.9,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  };

  const handleSendRequest = async (status, userId) => {
    if (!interactive || !userId) {
      // In preview mode or missing id – do nothing
      return;
    }
    try {
      console.log('Sending request:', status, 'for user:', userId);
      const res = await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, {
        withCredentials: true
      });
      console.log('Request successful:', res.data);
      handleAction(status === "interested" ? "interested" : "ignore");
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      console.log('Request error:', message);

      if (message.includes("already exists")) {
        handleAction(status === "interested" ? "interested" : "ignore");
      } else {
        alert("Error: " + message);
      }
    }
  };

  if (!user) {
    return (
      <div className="relative">
        {/* Card backdrop with glassmorphism */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl"></div>
        <div className="relative bg-transparent w-96 h-96 rounded-2xl p-8">
          <div className="flex justify-center items-center h-full">
            <div className="loading loading-spinner loading-lg text-sky-400"></div>
            <p className="ml-4 text-white font-medium">Loading user data...</p>
          </div>
        </div>
      </div>
    );
  }

  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = user;

  // Handle skills - ensure it's always an array
  const skillsArray = React.useMemo(() => {
    if (!skills) return [];
    if (Array.isArray(skills)) return skills;
    if (typeof skills === 'string') {
      return skills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
    }
    return [];
  }, [skills]);

  return (
    <AnimatePresence mode="wait">
      {user && (
        <div className="relative perspective-1000">
          <motion.div
            key={_id}
            initial="initial"
            animate={swipeDirection || "initial"}
            exit={{ opacity: 0, scale: 0.8 }}
            variants={variants}
            className="relative"
            style={{
              filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))'
            }}
          >
            {/* Main card with enhanced glassmorphism */}
            <div className="relative bg-white/15 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl w-96 overflow-hidden hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-3xl">
              
              {/* Swipe indicators */}
              {swipeDirection === "interested" && (
                <motion.div
                  className="absolute top-6 left-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-lg font-bold px-4 py-2 rounded-xl shadow-lg z-20 border border-green-400/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="flex items-center gap-2">
                    ❤️ Interested
                  </span>
                </motion.div>
              )}
              {swipeDirection === "ignore" && (
                <motion.div
                  className="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-lg font-bold px-4 py-2 rounded-xl shadow-lg z-20 border border-red-400/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="flex items-center gap-2">
                    ❌ Ignored
                  </span>
                </motion.div>
              )}

              {/* Profile image with enhanced styling */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 rounded-t-3xl"></div>
                <img
                  src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                  alt="user"
                  className="w-full h-72 object-cover rounded-t-3xl"
                />
                
                {/* Online status indicator */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-green-500/90 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full border border-green-400/50 font-medium shadow-lg flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    Online
                  </div>
                </div>
              </div>

              {/* Card content with better contrast */}
              <div className="p-6 relative">
                {/* Background pattern for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent rounded-b-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                        {firstName} {lastName}
                      </h2>
                      {age && gender && (
                        <p className="text-sky-200 text-sm font-medium">
                          {age} years old • {gender}
                        </p>
                      )}
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/30">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  <p className="text-white/90 text-sm leading-relaxed mb-4 drop-shadow">
                    {about || "No description available"}
                  </p>
                  
                  {/* Skills section - Enhanced Design */}
                  {skillsArray && skillsArray.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                        <h3 className="text-white text-sm font-bold tracking-wide">
                          Technical Skills
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {skillsArray.slice(0, 3).map((skill, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-r from-sky-500/20 to-blue-500/20 backdrop-blur-lg text-white text-sm px-4 py-2.5 rounded-xl border border-sky-400/30 font-medium hover:from-sky-400/30 hover:to-blue-400/30 transition-all duration-300 shadow-lg text-center truncate"
                            title={skill} // Tooltip for full skill name
                          >
                            {skill.length > 20 ? skill.substring(0, 20) + '...' : skill}
                          </div>
                        ))}
                        {skillsArray.length > 3 && (
                          <div className="bg-white/10 backdrop-blur-lg text-white/80 text-sm px-4 py-2.5 rounded-xl border border-white/20 font-medium text-center">
                            +{skillsArray.length - 3} more skills
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Enhanced action buttons */}
          <div className="flex gap-4 justify-center">
                    <button
            onClick={() => handleSendRequest("ignore", _id)}
            disabled={!interactive || isCardAnimating}
                      className="flex-1 bg-gradient-to-r from-red-500/90 to-pink-500/90 hover:from-red-500 hover:to-pink-500 text-white font-bold py-4 px-6 rounded-2xl border border-red-400/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Pass
                      </span>
                    </button>
                    
                    <button
                      onClick={() => handleSendRequest("interested", _id)}
                      disabled={!interactive || isCardAnimating}
                      className="flex-1 bg-gradient-to-r from-emerald-500/90 to-green-500/90 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-4 px-6 rounded-2xl border border-emerald-400/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        Like
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400/10 to-purple-400/10 rounded-3xl blur-xl -z-10 scale-110"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UserCard;