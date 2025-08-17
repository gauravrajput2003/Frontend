import React from 'react'
import { BASE_URL } from '../utils/Constant'

const Premium = () => {
  const handleBuyClick=async(type)=>{
const order=await axios.post(
  BASE_URL+"/payment/create",
  {type,},
  {withCredentials:true}
);

  }
  return (
    <div className='mt-40 p-10'>
        <div className="flex w-full">
  <div className="card bg-base-300 rounded-box grid h-50 grow place-items-center"><h1 className='font-bold text-2xl'>silver Membership</h1>
  <ul>
    <li>-chat with other peole</li>
    <li>-100 connection requests per day</li>
    <li>-get blue tick</li>
  </ul>
  <button  onClick={()=>handleBuyClick("silver")}  className='bg-pink-700'>Buy Silver</button>
  </div>
  <div className="divider divider-horizontal">OR</div>
  <div className="card bg-base-300 rounded-box grid h-50 grow place-items-center"><h1 className='font-bold text-2xl'>gold Membership</h1>
  
    <ul>
    <li>-chat with other peole</li>
    <li>-100 connection requests per day</li>
    <li>-get blue tick</li>
  </ul>
  <button onClick={()=>handleBuyClick("gold")} className='bg-blue-700 rounded'>Buy Gold</button></div>
</div>
    </div>
  )
}

export default Premium