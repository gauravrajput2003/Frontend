import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/Constant';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import { useNavigate, Link } from 'react-router-dom';

const Connections = () => {
    const connection=useSelector((store)=>store.connection);
    const dispatch=useDispatch();
    const navigate = useNavigate();
    
    const fetchConn=async()=>{
        try{
const res=await axios.get(BASE_URL+"/user/connections",{
    withCredentials:true,
});
console.log(res.data.data);
dispatch(addConnection(res.data.data));
        }
        catch(err){
            console.log(err.message);
        }
    }
    
    const handleMessage = (_connectionId) => {
        // Chat feature removed; no action.
    };
    
    useEffect(()=>{
        fetchConn();
    },[]);
        if(!connection)return;
        if(connection.length===0)return <div className="flex justify-center items-center min-h-[400px] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] w-full h-screen"><h1 className="text-3xl font-bold text-error my-3">No connections found</h1></div>
    return (
        <div className="relative min-h-screen w-full">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]" />
            <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-12 pt-20 sm:pt-24">
                        <h1 className="font-extrabold text-3xl sm:text-4xl text-center mb-8 sm:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-sky-400 to-emerald-400 drop-shadow-lg tracking-tight">Your Connections</h1>
                        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-8 xl:gap-8">
                            {connection.map((connection, index) => {
                                const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = connection;
                                const skillsArray = skills ? (Array.isArray(skills) ? skills : (typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(s => s.length > 0) : [])) : [];
                                return (
                                    <div key={index} className="attractive-card relative group overflow-hidden w-full max-w-xs min-h-[320px] flex flex-col justify-between mx-auto p-3 sm:p-4">
                                        {/* Glow border effect */}
                                        <div className="absolute inset-0 pointer-events-none z-0 group-hover:shadow-[0_0_40px_10px_rgba(34,197,94,0.15)] transition-all duration-300"></div>
                                        {/* Profile image */}
                                        <div className="flex justify-center items-center pt-8 pb-2 px-8">
                                            <img
                                                alt="profile"
                                                className="rounded-2xl w-full h-36 object-cover border-4 border-white/10 shadow-lg group-hover:border-emerald-400/40 transition-all duration-300"
                                                src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                            />
                                        </div>
                                        {/* Card content */}
                                        <div className="relative z-10 flex flex-col items-center text-center px-8 pt-2 flex-1">
                                            <h2 className="text-xl font-bold text-sky-300 mb-1 tracking-tight drop-shadow-lg">{firstName + " " + lastName}</h2>
                                            {age && gender && <p className="text-emerald-200 text-sm mb-1 font-medium">{age} yrs • {gender}</p>}
                                            <p className="text-slate-200/90 text-base mb-4 min-h-[48px] line-clamp-4">{about || "No description available"}</p>
                                            {/* Skills section */}
                                            {skillsArray && skillsArray.length > 0 && (
                                                <div className="w-full mt-2 mb-4">
                                                    <h4 className="text-xs font-semibold text-sky-400 mb-2 uppercase tracking-widest">Skills</h4>
                                                    <div className="flex flex-wrap justify-center gap-2">
                                                        {skillsArray.slice(0, 5).map((skill, skillIndex) => (
                                                            <span
                                                                key={skillIndex}
                                                                className="bg-gradient-to-r from-purple-500/20 to-sky-400/20 text-sky-200 text-xs px-3 py-1 rounded-full border border-sky-400/30 font-semibold shadow hover:from-purple-400/40 hover:to-sky-400/40 transition-all duration-200 truncate max-w-[100px]"
                                                                title={skill}
                                                            >
                                                                {skill.length > 12 ? skill.substring(0, 12) + '…' : skill}
                                                            </span>
                                                        ))}
                                                        {skillsArray.length > 5 && (
                                                            <span className="bg-slate-700/60 text-sky-300 text-xs px-3 py-1 rounded-full border border-sky-400/20 font-semibold">+{skillsArray.length - 5} more</span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                            {/* Action buttons */}
                                            <div className="flex gap-3 justify-center mt-2 mb-4">
                                                <Link to={"/chat/" + _id}>
                                                    <button
                                                        className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-sky-400 text-white font-bold shadow-lg hover:from-purple-600 hover:to-sky-500 hover:scale-105 transition-all duration-200"
                                                        onClick={() => handleMessage(connection._id)}
                                                    >
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                                                        </svg>
                                                        Message
                                                    </button>
                                                </Link>
                                                <button
                                                    className="flex items-center gap-2 px-5 py-2 rounded-xl border-2 border-sky-400 text-sky-300 font-bold bg-transparent hover:bg-sky-400/10 hover:scale-105 transition-all duration-200 shadow"
                                                >
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                                                    </svg>
                                                    Profile
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                  </div>
                </div>
              );
            }

            export default Connections;