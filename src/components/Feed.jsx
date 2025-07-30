import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice';
import axios from 'axios';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  
  const getFeed = async() => {
    // Better check to prevent multiple API calls
    if (feed && feed.length > 0) {
      console.log("Feed already exists, skipping API call");
      return;
    }
    
    try {
      console.log("Fetching feed...");
      const res = await axios.get(BASE_URL + "/feed", {withCredentials: true});
      console.log("Feed API response:", res.data);
      
      // Only dispatch if we have data
      if (res.data && res.data.data && res.data.data.length > 0) {
        dispatch(addFeed(res.data.data));
      }
    }
    catch(err) {
      console.log("Feed fetch error:", err);
    }
  }
  
  useEffect(() => {
    getFeed();
  }, []); // Remove feed from dependency array to prevent infinite loops

  console.log("Current feed state:", feed);

  // Show loading if feed is null or empty
  if (!feed || feed.length === 0) {
    return (
      <div className='flex justify-center items-center my-10'>
        <div className="loading loading-spinner loading-lg"></div>
        <p className="ml-4">Loading users...</p>
      </div>
    );
  }

  // Show first user from feed
  return (
    <div className='flex justify-center my-10'>
      <UserCard user={feed[0]} />
    </div>
  )
}

export default Feed