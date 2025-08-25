import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/Constant";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${BASE_URL}/chat/users`, { withCredentials: true });
        setChats(res.data.data || []);
      } catch (err) {
        setError("Failed to load chats");
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);

  if (loading) return <div className="p-6 text-center text-slate-400">Loading chats...</div>;
  if (error) return <div className="p-6 text-center text-red-400">{error}</div>;
  if (!chats.length) return <div className="p-6 text-center text-slate-400">No chats yet.</div>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-sky-400 mb-4">Chats</h2>
      <ul className="space-y-3">
        {chats.map((user) => (
          <li key={user._id}>
            <Link
              to={`/chat/${user._id}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/70 hover:bg-sky-900/60 transition-all border border-slate-700/40 shadow group"
            >
              <img
                src={user.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                alt={user.firstName}
                className="w-10 h-10 rounded-full object-cover border border-sky-400/30 group-hover:border-sky-400"
              />
              <div>
                <div className="font-semibold text-white group-hover:text-sky-300">{user.firstName} {user.lastName}</div>
                <div className="text-xs text-slate-400">{user.lastMessage || "Start a conversation"}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
