import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/Constant';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';

const Connections = () => {
    const connection=useSelector((store)=>store.connection);
    const dispatch=useDispatch();
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
    useEffect(()=>{
        fetchConn();
    },[]);
    if(!connection)return;
    if(connection.length===0)return <div className="flex justify-center items-center min-h-[400px]"><h1 className="text-red-600 text-3xl font-bold text-base-content/70">No connections found</h1></div>
  return (
    <div className='container mx-auto px-4 py-8'>
        <h1 className='text-bold text-3xl text-center mb-8 text-primary'>Your Connections</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connection.map((connection, index) => {
            const {firstName,lastName,photoUrl,age,gender,about}=connection;
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
                        <div className="card-actions justify-center mt-4">
                            <button className="btn btn-primary btn-sm">Message</button>
                            <button className="btn btn-outline btn-sm">View Profile</button>
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