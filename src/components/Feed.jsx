import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice';
import axios from 'axios';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noMoreUsers, setNoMoreUsers] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSeenAll, setHasSeenAll] = useState(false);
  
  const getFeed = async(page = 1, isInitial = false, forceReload = false) => {
    // Only skip if it's initial load and feed already exists and not forcing reload
    if (isInitial && feed && feed.length > 0 && !forceReload) {
      console.log("Feed already exists, skipping API call");
      return;
    }
    
    setLoading(true);
    try {
      console.log(`Fetching page ${page} of users...`);
      const res = await axios.get(BASE_URL + `/feed?page=${page}&limit=10`, {
        withCredentials: true
      });
      
      console.log("Feed API response:", res.data);
      
      if (res.data && res.data.data && res.data.data.length > 0) {
        if (page === 1) {
          // First page - replace feed
          dispatch(addFeed(res.data.data));
          setCurrentIndex(0);
        } else {
          // Additional pages - append to existing feed
          dispatch(addFeed([...feed, ...res.data.data]));
        }
        
        setCurrentPage(page);
        setNoMoreUsers(false);
        setHasSeenAll(false);
        console.log(`Loaded ${res.data.data.length} users from page ${page}`);
      } else {
        // No users in this page
        setNoMoreUsers(true);
        console.log(`No more users available from page ${page}`);
        
        if (page === 1) {
          dispatch(addFeed([]));
        }
      }
    }
    catch(err) {
      console.log("Feed fetch error:", err);
      if (page === 1) {
        dispatch(addFeed([]));
      }
      setNoMoreUsers(true);
    } finally {
      setLoading(false);
    }
  }

  const loadNextBatch = async() => {
    if (loading || noMoreUsers) return;
    
    const nextPage = currentPage + 1;
    console.log(`Loading next batch - page ${nextPage}`);
    await getFeed(nextPage, false);
  }

  const handleRefresh = () => {
    console.log("Refreshing feed - Loading fresh data...");
    setCurrentIndex(0);
    setCurrentPage(1);
    setNoMoreUsers(false);
    setHasSeenAll(false);
    dispatch(addFeed(null));
    getFeed(1, false, true); // Force reload
  }

  const handleViewAgain = () => {
    console.log("View again - Restarting feed...");
    setCurrentIndex(0);
    setHasSeenAll(false);
  }
  
  // Initial load
  useEffect(() => {
    getFeed(1, true);
  }, []);

  // Auto-load next batch when user is close to the end
  useEffect(() => {
    if (feed && feed.length > 0 && currentIndex >= feed.length - 3 && !noMoreUsers && !loading && !hasSeenAll) {
      console.log(`Auto-loading next batch. Current: ${currentIndex}, Total: ${feed.length}`);
      loadNextBatch();
    }
  }, [currentIndex, feed?.length, noMoreUsers, loading, hasSeenAll]);

  // Check if user has seen all available users
  useEffect(() => {
    if (feed && feed.length > 0 && currentIndex >= feed.length && noMoreUsers) {
      console.log("User has seen all available users");
      setHasSeenAll(true);
    }
  }, [currentIndex, feed?.length, noMoreUsers]);

  // Show loading for initial load
  if (loading && (!feed || feed.length === 0)) {
    return (
      <div className='flex justify-center items-center my-10'>
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
          <div className="flex items-center">
            <div className="loading loading-spinner loading-lg text-sky-400"></div>
            <p className="ml-4 text-white font-medium">Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show no users message
  if ((!feed || feed.length === 0) && noMoreUsers && !loading) {
    return (
      <div className='flex justify-center items-center my-10'>
        <div className="bg-white/15 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl w-96">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">👥 No Users Found!</h2>
            <p className="text-lg mb-4 text-white/90">No other users are available right now.</p>
            <p className="text-white/70 mb-6">You might be the first user, or everyone else is already connected!</p>
            <button 
              onClick={handleRefresh}
              className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl border border-sky-400/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Try Again"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show current user if feed has users
  if (feed && feed.length > 0) {
    // Check if user has seen all users (reached the end)
    if (hasSeenAll || (currentIndex >= feed.length && noMoreUsers)) {
      return (
        <div className='flex justify-center items-center my-10'>
          <div className="bg-white/15 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl w-96">
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">🎉 You've Seen Everyone!</h2>
              <p className="text-lg mb-4 text-white/90">You've viewed all {feed.length} available users.</p>
              <p className="text-white/70 mb-6">What would you like to do next?</p>
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={handleViewAgain}
                  className="bg-gradient-to-r from-green-500/80 to-emerald-500/80 hover:from-green-500 hover:to-emerald-500 text-white font-semibold py-3 px-6 rounded-xl border border-green-400/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  View Again
                </button>
                <button 
                  onClick={handleRefresh}
                  className="bg-gradient-to-r from-blue-500/80 to-purple-500/80 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 px-6 rounded-xl border border-blue-400/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2"
                  disabled={loading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {loading ? "Loading..." : "Fresh Feed"}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Still loading more users
    if (currentIndex >= feed.length && !noMoreUsers) {
      return (
        <div className='flex justify-center items-center my-10'>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center">
              <div className="loading loading-spinner loading-lg text-sky-400"></div>
              <p className="ml-4 text-white font-medium">Loading more users...</p>
            </div>
          </div>
        </div>
      );
    }

    // Show current user - CLEAN VERSION WITH NO PROGRESS CARD
    return (
      <div className='flex flex-col justify-center items-center my-10'>
        <UserCard
          user={feed[currentIndex]}
          onUserAction={() => setCurrentIndex(currentIndex + 1)}
        />
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center my-10'>
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
        <div className="flex items-center">
          <div className="loading loading-spinner loading-lg text-sky-400"></div>
          <p className="ml-4 text-white font-medium">Loading...</p>
        </div>
      </div>
    </div>
  );
}

export default Feed