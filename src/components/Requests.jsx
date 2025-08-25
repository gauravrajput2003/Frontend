import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
  const request=useSelector((store)=>store.requests);
  const dispatch=useDispatch();
  const [showbtn,setshowbtn]=useState(true);
  //revire request
  const reviewRequest=async(status,_id)=>{
    try{
const res=await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{
withCredentials:true
});
dispatch(removeRequest(_id));
    }
    catch(err){
console.log(err.message);
    }
  }
  const fetchRequest=async()=>{
    try{
const res=await axios.get(BASE_URL+"/user/requests/received",{
  withCredentials:true
});
console.log(res.data.data);
dispatch(addRequests(res.data.data))
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    fetchRequest();
  },[]);
  if(!request)return;
  if(request.length===0)return <h1 className='flex justify-center my-20 text-3xl text-red-500 font-bold'>No Request Found!</h1>
        return (
        <div className="relative min-h-screen w-full">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]" />
            <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-12 pt-20 sm:pt-24">
                        <h1 className="font-extrabold text-3xl sm:text-4xl text-center mb-8 sm:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-purple-400 drop-shadow-lg tracking-tight">Your Requests</h1>
                        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 xl:gap-8">
                {request.map((request, index) => {
                    const { firstName, lastName, photoUrl, age, gender, about, skills } = request.fromUserId;
                    const skillsArray = skills ? (Array.isArray(skills) ? skills : (typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(s => s.length > 0) : [])) : [];
                    return (
                        <div key={index} className="relative group rounded-3xl bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/90 shadow-2xl border border-slate-700/60 hover:shadow-purple-400/30 hover:scale-[1.025] transition-all duration-300 overflow-hidden w-full max-w-xs min-h-[320px] mx-auto flex flex-col justify-between p-3 sm:p-4">
                            {/* Glow border effect */}
                            <div className="absolute inset-0 pointer-events-none z-0 group-hover:shadow-[0_0_40px_10px_rgba(168,85,247,0.15)] transition-all duration-300"></div>
                            {/* Profile image */}
                            <div className="flex justify-center items-center pt-8 pb-2 px-8">
                                <img
                                    alt="profile"
                                    className="rounded-2xl w-full h-40 object-cover border-4 border-white/10 shadow-lg group-hover:border-purple-400/40 transition-all duration-300"
                                    src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                />
                            </div>
                            {/* Card content */}
                            <div className="relative z-10 flex flex-col items-center text-center px-8 pt-2 flex-1">
                                <h2 className="text-2xl font-bold text-purple-300 mb-1 tracking-tight drop-shadow-lg">{firstName + " " + lastName}</h2>
                                {age && gender && <p className="text-emerald-200 text-sm mb-1 font-medium">{age} yrs • {gender}</p>}
                                <p className="text-slate-200/90 text-base mb-3 min-h-[32px] whitespace-pre-line break-words">{about || "No description available"}</p>
                                {/* Skills section */}
                                {skillsArray && skillsArray.length > 0 && (
                                    <div className="w-full mb-4">
                                        <h4 className="text-xs font-semibold text-purple-400 mb-2 uppercase tracking-widest">Skills</h4>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {skillsArray.slice(0, 5).map((skill, skillIndex) => (
                                                <span
                                                    key={skillIndex}
                                                    className="bg-gradient-to-r from-purple-500/20 to-sky-400/20 text-sky-200 text-xs px-3 py-1 rounded-full border border-sky-400/30 font-semibold shadow hover:from-purple-400/40 hover:to-sky-400/40 transition-all duration-200 truncate max-w-[80px]"
                                                    title={skill}
                                                >
                                                    {skill.length > 10 ? skill.substring(0, 10) + '…' : skill}
                                                </span>
                                            ))}
                                            {skillsArray.length > 5 && (
                                                <span className="bg-slate-700/60 text-sky-300 text-xs px-3 py-1 rounded-full border border-sky-400/20 font-semibold">+{skillsArray.length - 5} more</span>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {/* Action buttons: Accept on right, Reject on left, always visible, stick to bottom */}
                            </div>
                            <div className="flex gap-3 justify-center mt-4 mb-6 px-8">
                                <button
                                    onClick={() => reviewRequest("rejected", request._id)}
                                    className="flex items-center gap-2 px-5 py-2 rounded-xl border-2 border-pink-400 text-pink-300 font-bold bg-transparent hover:bg-pink-400/10 hover:scale-105 transition-all duration-200 shadow"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    Reject
                                </button>
                                <button
                                    onClick={() => reviewRequest("accepted", request._id)}
                                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-400 text-white font-bold shadow-lg hover:from-emerald-600 hover:to-sky-500 hover:scale-105 transition-all duration-200"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 7.293a1 1 0 00-1.414 0L9 13.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" />
                                    </svg>
                                    Accept
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
      </div>
    </div>
  );
}

export default Requests;