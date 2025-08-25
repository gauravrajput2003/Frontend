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

  // Loading Component with Animation
  const LoadingComponent = ({ message = "Loading users..." }) => (
    <div className='flex justify-center items-center min-h-[60vh]'>
      <div className="feed-loading-card">
        <div className="loading-content">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
          <div className="loading-text">
            <h3 className="text-xl font-semibold text-white mb-2">{message}</h3>
            <p className="text-slate-300 text-sm">Finding amazing developers for you...</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Show loading for initial load
  if (loading && (!feed || feed.length === 0)) {
    return <LoadingComponent />;
  }

  // Show no users message
  if ((!feed || feed.length === 0) && noMoreUsers && !loading) {
    return (
      <div className='flex justify-center items-center min-h-[60vh]'>
        <div className="feed-status-card">
          <div className="status-content">
            <div className="status-icon">
              <svg className="w-16 h-16 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No Users Found</h2>
            <p className="text-slate-300 mb-6 text-center max-w-sm">
              No other users are available right now. You might be the first user, or everyone else is already connected!
            </p>
            <button 
              onClick={handleRefresh}
              className="feed-primary-button"
              disabled={loading}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
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
        <div className='flex justify-center items-center min-h-[60vh]'>
          <div className="feed-status-card">
            <div className="status-content">
              <div className="status-icon">
                <div className="celebration-icon">
                  <svg className="w-16 h-16 text-green-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="celebration-particles">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className={`particle particle-${i + 1}`}></div>
                    ))}
                  </div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">You've Seen Everyone!</h2>
              <p className="text-slate-300 mb-6 text-center max-w-sm">
                You've viewed all {feed.length} available users. Great job exploring the community!
              </p>
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={handleViewAgain}
                  className="feed-secondary-button"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  View Again
                </button>
                <button 
                  onClick={handleRefresh}
                  className="feed-primary-button"
                  disabled={loading}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      return <LoadingComponent message="Loading more users..." />;
    }

    // Show current user - clean version with no extra cards or buttons
    return (
      <div className="flex justify-center items-center min-h-[80vh] w-full px-1 sm:px-0">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl flex justify-center">
          <UserCard
            user={feed[currentIndex]}
            onUserAction={() => setCurrentIndex(currentIndex + 1)}
          />
        </div>
      </div>
    );
  }

  return <LoadingComponent />;
}

export default Feed