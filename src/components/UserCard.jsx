import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/Constant';
import { useDispatch } from 'react-redux';
import { removeUserFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
  const dispatch = useDispatch();
  
  // Check if user exists BEFORE destructuring
  if (!user) {
    console.log("User is undefined, showing loading...");
    return (
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <div className="flex justify-center items-center h-48">
            <div className="loading loading-spinner loading-lg"></div>
            <p className="ml-4">Loading user data...</p>
          </div>
        </div>
      </div>
    );
  }

  // NOW it's safe to destructure user
  const {_id, firstName, lastName, photoUrl, age, gender, about} = user;
  
  const handleSendRequest = async(status, userId) => {
    try {
      console.log("Sending request:", status, "for user:", userId);
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {
        withCredentials: true
      });
      console.log("Request successful:", res.data);
      dispatch(removeUserFeed(userId));
    }
    catch(err) {
      console.log("Request error:", err.response?.data || err.message);
    }
  }

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
          alt="user" 
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => handleSendRequest("ignore", _id)}
            className="btn btn-secondary">
            Ignore
          </button>
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="btn btn-primary">
            Interested
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCard