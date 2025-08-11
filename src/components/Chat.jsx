import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { addMessage, setActiveChat, clearActiveChat, initializeConversation } from '../utils/chatSlice';

const Chat = () => {
  const { userId } = useParams(); // The ID of the user we're chatting with
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const currentUser = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connection);
  const chatHistory = useSelector((store) => store.chat.conversations[userId] || []);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Find the user we're chatting with from connections
  const chatPartner = connections?.find(conn => conn._id === userId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // Initialize conversation when component mounts
  useEffect(() => {
    if (userId) {
      dispatch(setActiveChat(userId));
      // Initialize conversation if it doesn't exist
      if (!chatHistory.length) {
        dispatch(initializeConversation({ userId, messages: [] }));
      }
    }
    
    return () => {
      dispatch(clearActiveChat());
    };
  }, [userId, dispatch]);

  useEffect(() => {
    if (!socket || !currentUser) return;

    // Check connection status
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Chat: Connected to server');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Chat: Disconnected from server');
    });

    // Listen for incoming messages
    socket.on('receiveMessage', (data) => {
      if (data.senderId === userId) {
        const message = {
          id: Date.now(),
          senderId: data.senderId,
          senderName: data.senderName,
          message: data.message,
          timestamp: new Date(data.timestamp),
          isOwn: false
        };
        dispatch(addMessage({ userId, message }));
      }
    });

    // Listen for typing indicators
    socket.on('userTyping', (data) => {
      if (data.senderId === userId) {
        setOtherUserTyping(data.isTyping);
      }
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('receiveMessage');
      socket.off('userTyping');
    };
  }, [socket, userId, currentUser]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socket || !currentUser) return;

    const messageData = {
      senderId: currentUser._id,
      receiverId: userId,
      message: newMessage.trim(),
      senderName: currentUser.firstName
    };

    // Add message to Redux store
    const message = {
      id: Date.now(),
      senderId: currentUser._id,
      senderName: currentUser.firstName,
      message: newMessage.trim(),
      timestamp: new Date(),
      isOwn: true
    };
    
    dispatch(addMessage({ userId, message }));

    // Send message via socket
    socket.emit('sendMessage', messageData);
    setNewMessage('');
    
    // Stop typing indicator
    socket.emit('stopTyping', {
      senderId: currentUser._id,
      receiverId: userId
    });
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    
    if (!socket || !currentUser) return;

    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing', {
        senderId: currentUser._id,
        receiverId: userId
      });
    }

    // Clear existing timeout
    clearTimeout(typingTimeoutRef.current);

    // Set new timeout to stop typing
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit('stopTyping', {
        senderId: currentUser._id,
        receiverId: userId
      });
    }, 1000);
    
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!chatPartner) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-error mb-4">User not found</h2>
          <button 
            onClick={() => navigate('/connections')} 
            className="btn btn-primary"
          >
            Back to Connections
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300">
      <div className="container mx-auto max-w-4xl h-screen flex flex-col">
        {/* Chat Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-10"
        >
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/connections')}
                className="btn btn-ghost btn-circle text-xl hover:bg-white/20"
              >
                ←
              </motion.button>
              <div className="avatar online">
                <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img 
                    src={chatPartner.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                    alt={chatPartner.firstName}
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl text-base-content">
                  {chatPartner.firstName} {chatPartner.lastName}
                </h3>
                {otherUserTyping ? (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-primary font-medium"
                  >
                    <span className="inline-flex space-x-1">
                      <span className="animate-bounce">•</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>•</span>
                      <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>•</span>
                      <span className="ml-2">typing</span>
                    </span>
                  </motion.p>
                ) : (
                  <p className="text-sm text-base-content/60">
                    {isConnected ? 'Online' : 'Connecting...'}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="btn btn-ghost btn-circle"
              >
                📞
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="btn btn-ghost btn-circle"
              >
                📹
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-6 py-4 bg-gradient-to-b from-transparent to-base-200/30">
          <div className="space-y-4 max-w-3xl mx-auto">
            <AnimatePresence>
              {chatHistory.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.8 }}
                  transition={{ type: "spring", duration: 0.4 }}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`group relative max-w-sm lg:max-w-lg ${
                    message.isOwn ? 'ml-auto' : 'mr-auto'
                  }`}>
                    {!message.isOwn && (
                      <div className="avatar mb-2">
                        <div className="w-8 h-8 rounded-full">
                          <img 
                            src={chatPartner.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                            alt={chatPartner.firstName}
                          />
                        </div>
                      </div>
                    )}
                    <div className={`px-4 py-3 rounded-2xl shadow-lg ${
                      message.isOwn 
                        ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-content rounded-br-md' 
                        : 'bg-white/20 backdrop-blur-lg text-base-content border border-white/30 rounded-bl-md'
                    }`}>
                      <p className="text-sm leading-relaxed break-words">{message.message}</p>
                      <div className="flex items-center justify-end mt-2 space-x-1">
                        <p className={`text-xs ${
                          message.isOwn ? 'text-primary-content/70' : 'text-base-content/50'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                        {message.isOwn && (
                          <span className="text-xs text-primary-content/70">✓✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {chatHistory.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="avatar mb-4">
                  <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                    <img 
                      src={chatPartner.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                      alt={chatPartner.firstName}
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-base-content mb-2">
                  Chat with {chatPartner.firstName}
                </h3>
                <p className="text-base-content/60">
                  Send your first message to start the conversation!
                </p>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl border-t border-white/20 p-6"
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end space-x-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-circle btn-ghost"
              >
                📎
              </motion.button>
              <div className="flex-1 relative">
                <textarea
                  value={newMessage}
                  onChange={handleTyping}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message ${chatPartner.firstName}...`}
                  className="textarea textarea-bordered w-full resize-none bg-white/20 backdrop-blur-lg border-white/30 text-base-content placeholder-base-content/50 focus:border-primary focus:bg-white/30 transition-all duration-300"
                  rows="1"
                  style={{ 
                    minHeight: '3rem', 
                    maxHeight: '8rem',
                    borderRadius: '1.5rem',
                    paddingLeft: '1.5rem',
                    paddingRight: '4rem'
                  }}
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-circle btn-sm transition-all duration-300 ${
                    newMessage.trim() 
                      ? 'btn-primary shadow-lg' 
                      : 'btn-ghost opacity-50 cursor-not-allowed'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                  </svg>
                </motion.button>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-circle btn-ghost"
              >
                😊
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Chat;
