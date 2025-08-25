import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from "react-redux";
import axios from 'axios';
import { BASE_URL } from '../utils/Constant';

const Chat = () => {
  const { targetuserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const user = useSelector(store => store.user);
  const userId = user._id;

  // Emoji list for the picker
  const emojis = ['😊', '😂', '😍', '👍', '❤️', '😢', '😮', '😡', '🔥', '💯', '🎉', '👏', '🤔', '😎', '🚀', '💪', '👨‍💻', '💻', '🌟', '✨'];

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle emoji selection
  const handleEmojiSelect = (emoji) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  // Fetch target user info
  const fetchTargetUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/${targetuserId}`, {
        withCredentials: true,
      });
      setTargetUser(response.data);
    } catch (err) {
      console.log("Error fetching target user:", err);
      // Set a default user object if fetch fails
      setTargetUser({ firstName: 'User', lastName: '', photoUrl: '' });
    }
  };

  // Handle typing events
  const handleTyping = () => {
    const socket = createSocketConnection();
    
    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", { userId, targetuserId, isTyping: true });
    }
    
    // Clear existing timeout
    clearTimeout(typingTimeoutRef.current);
    
    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit("typing", { userId, targetuserId, isTyping: false });
    }, 1000); // Stop typing after 1 second of inactivity
  };

  // Handle chat history
  const fetchMessage = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetuserId, {
        withCredentials: true,
      });
      const chatmessage = chat?.data?.messages.map((msg) => {
        const { senderId, text, createdAt } = msg;
        const isOwn = senderId?._id === userId;
        return {
          firstName: isOwn ? "You" : senderId?.firstName,
          lastName: senderId?.lastName,
          text,
          isOwn,
          timestamp: createdAt || new Date().toISOString()
        };
      });
      setMessages(chatmessage || []);
    } catch (err) {
      console.log("Error fetching messages:", err);
      setMessages([]);
    }
  };

  useEffect(() => {
    fetchMessage();
    fetchTargetUser();
  }, [targetuserId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Add message to local state immediately as "You"
      const newMsg = {
        firstName: "You",
        text: newMessage,
        isOwn: true,
        timestamp: new Date().toISOString()
      };
      
      setMessages((prevMessages) => [...prevMessages, newMsg]);

      const socket = createSocketConnection();
      socket.emit("sendMessage", {
        firstName: user.firstName,
        lastName: user.lastName,
        userId,
        targetuserId,
        text: newMessage,
      });
      setNewMessage("");
    }
  };

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    let connectionError = false;
    // Graceful error handling for production
    socket.on('connect_error', () => {
      connectionError = true;
      setIsOnline(false);
    });
    socket.on('error', () => {
      connectionError = true;
      setIsOnline(false);
    });
    // Tell server this user is online
    socket.emit("userOnline", userId);
    socket.emit("joinChat", { userId, targetuserId });
    socket.on("messageReceived", ({ firstName, text }) => {
      if (firstName !== user.firstName) {
        setMessages((messages) => [
          ...messages,
          {
            firstName,
            text,
            isOwn: false,
            timestamp: new Date().toISOString()
          }
        ]);
      }
    });
    // Handle target user's online status when joining chat
    socket.on("targetUserStatus", ({ userId: statusUserId, status }) => {
      if (statusUserId === targetuserId) {
        setIsOnline(status === "online");
      }
    });
    // Handle real-time user status updates
    socket.on("userStatusUpdate", ({ userId: statusUserId, status }) => {
      if (statusUserId === targetuserId) {
        setIsOnline(status === "online");
      }
    });
    // Handle typing indicator
    socket.on("userTyping", ({ userId: typingUserId, isTyping }) => {
      if (typingUserId === targetuserId) {
        setOtherUserTyping(isTyping);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [userId, targetuserId]);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full min-h-[85vh] flex justify-center items-center px-0 sm:px-2 md:px-4">
      <div className="w-full max-w-2xl m-0 sm:m-5 h-[85vh] flex flex-col bg-slate-900/95 backdrop-blur-md border border-slate-700/50 rounded-none sm:rounded-2xl overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-slate-800/90 to-slate-700/90 backdrop-blur-md border-b border-slate-600/50 p-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500/50">
              <img
                src={targetUser?.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                alt={targetUser?.firstName || "User"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
                }}
              />
            </div>
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-white">
              {targetUser?.firstName || 'User'} {targetUser?.lastName || ''}
            </h2>
            <p className="text-sm text-slate-400">
              {isOnline ? (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Online
                </span>
              ) : (
                'Offline'
              )}
            </p>
          </div>
        </div>
      </div>

  {/* Messages Area */}
  <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4 bg-gradient-to-b from-slate-900/50 to-slate-800/50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <div className="text-6xl mb-4">💬</div>
            <p className="text-lg">No messages yet</p>
            <p className="text-sm">Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'} w-full`}
            >
              <div className={`flex items-end gap-2 max-w-[95vw] sm:max-w-xs lg:max-w-md ${
                msg.isOwn ? 'flex-row-reverse' : 'flex-row'
              }`}>
                {!msg.isOwn && (
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-600 flex-shrink-0">
                    <img
                      src={targetUser?.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                      alt={msg.firstName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className={`group ${msg.isOwn ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`inline-block p-3 rounded-2xl shadow-lg backdrop-blur-sm ${
                      msg.isOwn
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-md'
                        : 'bg-slate-700/80 text-slate-100 rounded-bl-md border border-slate-600/50'
                    } max-w-full overflow-x-auto`}
                  >
                    <div className="break-words break-all whitespace-pre-line overflow-x-auto" style={{wordBreak:'break-word', maxWidth:'80vw'}}>{msg.text}</div>
                  </div>
                  <div className={`text-xs text-slate-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                    msg.isOwn ? 'text-right' : 'text-left'
                  }`}>
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        
        {/* Typing Indicator */}
        {otherUserTyping && (
          <div className="flex justify-start">
            <div className="flex items-end gap-2 max-w-xs">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-600">
                <img
                  src={targetUser?.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                  alt="typing"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-slate-700/80 border border-slate-600/50 rounded-2xl rounded-bl-md p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

  {/* Message Input */}
  <div className="bg-slate-800/90 backdrop-blur-md border-t border-slate-600/50 p-2 sm:p-4 shrink-0">
        <div className="flex items-end gap-2 sm:gap-3">
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTyping();
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              className="w-full bg-slate-700/50 border border-slate-600/50 rounded-2xl text-white placeholder-slate-400 p-4 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-200 max-h-32 min-h-[50px]"
              placeholder="Type a message..."
              rows="1"
              style={{
                height: 'auto',
                minHeight: '50px'
              }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
              }}
            />
            
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <button 
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-200 transition-colors duration-200"
              >
                <span className="text-lg">😊</span>
              </button>
              
              {/* Emoji Picker */}
              {showEmojiPicker && (
                <div className="absolute bottom-full right-0 mb-2 bg-slate-700/95 backdrop-blur-md border border-slate-600/50 rounded-xl p-3 shadow-2xl z-50">
                  <div className="grid grid-cols-5 gap-2 w-48">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => handleEmojiSelect(emoji)}
                        className="p-2 rounded-lg hover:bg-slate-600/50 transition-colors duration-200 text-lg"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className={`p-3 rounded-full flex-shrink-0 transition-all duration-200 ${
              newMessage.trim()
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg transform hover:scale-105'
                : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span className="text-lg">🚀</span>
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Chat;