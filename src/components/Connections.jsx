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
    if(connection.length===0)return <div className="flex justify-center items-center min-h-[400px]"><h1 className="text-3xl font-bold text-error">No connections found</h1></div>
  return (
    <div className='container mx-auto px-4 py-8'>
        <h1 className='text-bold text-3xl text-center mb-8 text-primary'>Your Connections</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connection.map((connection, index) => {
            const {_id,firstName,lastName,photoUrl,age,gender,about,skills}=connection;
            // Chat data removed
            
            // Handle skills - ensure it's always an array
            const skillsArray = skills ? (Array.isArray(skills) ? skills : (typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(s => s.length > 0) : [])) : [];
            
            return(
                <div key={index} className='card bg-base-300 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'>
                    <figure className="px-6 pt-6">
                        <img 
                            alt='photo' 
                            className='rounded-lg w-full h-52 object-cover' 
                            src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                        />
                    </figure>
                    <div className='card-body items-center text-center'>
                        <h2 className='card-title text-xl font-bold text-primary'>{firstName+" "+lastName}</h2>
                        {age && gender && <p className="text-base-content/70 text-sm">{age+", "+gender}</p>}
                        <p className="text-base-content/80 text-sm line-clamp-3">{about}</p>
                        
                        {/* Skills section */}
                        {skillsArray && skillsArray.length > 0 && (
                            <div className="w-full mt-3">
                                <h4 className="text-xs font-semibold text-base-content/60 mb-2 uppercase tracking-wide">Skills</h4>
                                <div className="flex flex-wrap justify-center gap-1">
                                    {skillsArray.slice(0, 3).map((skill, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full border border-primary/30 font-medium truncate max-w-[80px]"
                                            title={skill}
                                        >
                                            {skill.length > 8 ? skill.substring(0, 8) + '...' : skill}
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
                        
                        {/* Last message preview removed */}
                        
                        <div className="card-actions justify-center mt-4 space-x-2">
                          <Link to={"/chat/"+_id}>  <button 
                                className="btn btn-sm btn-primary gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                                onClick={() => handleMessage(connection._id)}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                                </svg>
                                Message
                            </button></Link>
                            <button className="btn btn-outline btn-sm gap-2 hover:shadow-lg transition-all duration-300">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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
  )
}

export default Connections