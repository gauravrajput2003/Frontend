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
    <div className='container mx-auto px-4 py-8'>
        <h1 className='text-bold text-3xl text-center mb-8 text-primary'>Your Requests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {request.map((request, index) => {
            const {firstName,lastName,photoUrl,age,gender,about,skills}=request.fromUserId;
            
            // Handle skills - ensure it's always an array
            const skillsArray = skills ? (Array.isArray(skills) ? skills : (typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(s => s.length > 0) : [])) : [];
            
            return(
                <div key={index} className='card bg-base-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-80 h-96'>
                    <figure className="px-6 pt-6">
                        <img 
                            alt='photo' 
                            className='rounded-lg w-1/2 h-52 object-cover' 
                            src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                        />
                    </figure>
                    <div className='card-body items-center text-center'>
                        <h2 className='card-title text-xl font-bold text-primary'>{firstName+" "+lastName}</h2>
                        {age && gender && <p className="text-base-content/70 text-sm">{age+", "+gender}</p>}
                        <p className="text-base-content/80 text-sm line-clamp-2">{about}</p>
                        
                        {/* Skills section */}
                        {skillsArray && skillsArray.length > 0 && (
                            <div className="w-full mt-2">
                                <h4 className="text-xs font-semibold text-base-content/60 mb-1 uppercase tracking-wide">Skills</h4>
                                <div className="flex flex-wrap justify-center gap-1">
                                    {skillsArray.slice(0, 3).map((skill, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full border border-primary/30 font-medium truncate max-w-[70px]"
                                            title={skill}
                                        >
                                            {skill.length > 6 ? skill.substring(0, 6) + '...' : skill}
                                        </span>
                                    ))}
                                    {skillsArray.length > 3 && (
                                        <span className="bg-base-content/10 text-base-content/60 text-xs px-2 py-1 rounded-full border border-base-content/20">
                                            +{skillsArray.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                        
                        <div className="card-actions justify-center mt-4 p-4 w-full">
                            <button 
                            onClick={()=>reviewRequest("accepted",request._id)}
                            className="btn btn-primary btn-md w-24">Accept</button>
                            <button onClick={()=>reviewRequest("rejected",request._id)} className="btn btn-secondary btn-md w-24">Reject</button>
                        </div>
                    </div>
                </div>
            );
        })}
        </div>
    </div>
  )
}

export default Requests