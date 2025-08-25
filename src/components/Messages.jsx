import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/Constant';
import { Link } from 'react-router-dom';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get(BASE_URL + '/chat/conversations', { withCredentials: true });
        setConversations(res.data.data || []);
      } catch (err) {
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
    // Optionally: add socket.io listener for new messages to update list in real time
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-[300px]">Loading...</div>;
  if (!conversations.length) return <div className="flex justify-center items-center min-h-[300px] text-sky-300">No messages yet.</div>;

  return (
    <div className="max-w-2xl mx-auto py-8 px-2">
      <h1 className="text-2xl font-bold mb-6 text-center text-sky-400">Your Messages</h1>
      <div className="flex flex-col gap-4">
        {conversations.map(conv => (
          <Link to={`/chat/${conv.otherUserId}`} key={conv._id} className="bg-slate-800 rounded-xl p-4 flex items-center gap-4 hover:bg-sky-900 transition">
            <img src={conv.otherUserPhoto || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} alt="profile" className="w-12 h-12 rounded-full object-cover border-2 border-sky-400/30" />
            <div className="flex-1">
              <div className="font-semibold text-sky-200">{conv.otherUserName}</div>
              <div className="text-slate-300 text-sm line-clamp-1">{conv.lastMessage}</div>
            </div>
            <div className="text-xs text-slate-400 min-w-[70px] text-right">{conv.lastMessageTime && new Date(conv.lastMessageTime).toLocaleString()}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Messages;
