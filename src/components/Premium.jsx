import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/Constant'

const Premium = () => {
  const handleBuyClick=async(type)=>{
const order = await axios.post(
  BASE_URL + "/payment/create",
  { membershipType: type },
  { withCredentials: true }
);
const { keyId, order: { id: orderId, amount, currency, notes, receipt } } = order.data;
const options = {
    "key": keyId,
    "amount": amount,
    "currency": currency,
    "name": "devNexus", 
    "description": "connect to other",

    "order_id": orderId,

    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": notes.firstName + " " + notes.lastName, //your customer's name
        "email": notes.email,
  
    },
 
    "theme": {
        "color": "#3399cc"
    }
};
const rzp = new window.Razorpay(options);
rzp.open();
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