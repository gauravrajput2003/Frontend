import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Smile, Mic, Volume2, Phone, Video, MoreVertical, Search } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, setActiveChat, initializeConversation } from '../utils/chatSlice';
import { addConnection } from '../utils/connectionSlice';
import { AudioRecorder, TextToSpeech, SpeechToText, playAudio, blobToBase64, base64ToBlob } from '../utils/audioUtils';
import axios from 'axios';
import { BASE_URL } from '../utils/Constant';

const Chat = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const currentUser = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connection);
  const chatHistory = useSelector((store) => store.chat.conversations[userId] || []);
  const allConversations = useSelector((store) => store.chat.conversations);
  
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(new Set()); // Track online users
  const [typingUsers, setTypingUsers] = useState(new Set()); // Track typing users
  const messagesEndRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const audioRecorderRef = useRef(new AudioRecorder());
  const textToSpeechRef = useRef(new TextToSpeech());
  const speechToTextRef = useRef(new SpeechToText());
  const recordingIntervalRef = useRef(null);

  // Get chat partner from connections
  const chatPartner = connections?.find(conn => conn._id === userId);

  // Fetch connections if not already loaded
  const fetchConnections = async () => {
    if (!connections) {
      try {
        const res = await axios.get(BASE_URL + "/user/connections", {
          withCredentials: true,
        });
        dispatch(addConnection(res.data.data));
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  // Get last message for each connection
  const getLastMessage = (connectionId) => {
    const messages = allConversations[connectionId];
    if (messages && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      return {
        text: lastMessage.message.length > 30 
          ? lastMessage.message.substring(0, 30) + '...' 
          : lastMessage.message,
        time: new Date(lastMessage.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
        isOwn: lastMessage.isOwn
      };
    }
    return null;
  };

  // Navigate to different chat
  const handleChatNavigation = (connectionId) => {
    navigate(`/chat/${connectionId}`);
  };

  // Initialize connections on component mount
  useEffect(() => {
    fetchConnections();
  }, []);

  // Notify server about user being online
  useEffect(() => {
    if (socket && currentUser) {
      socket.emit('userConnected', { userId: currentUser._id });
      
      // Clean up on unmount
      return () => {
        socket.emit('userDisconnected', { userId: currentUser._id });
      };
    }
  }, [socket, currentUser]);

  const emojis = ['😀', '😂', '🥰', '😍', '🤔', '👍', '👎', '❤️', '🔥', '💯', '🎉', '👏', '🙏', '💪', '✨', '🌟', '💫', '🌈', '☀️', '🌙'];

  // Helper function to safely format timestamps
  const formatTimestamp = (timestamp) => {
    try {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      return date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // Initialize conversation when component mounts - PRESERVE CHAT HISTORY
  useEffect(() => {
    if (userId) {
      dispatch(setActiveChat(userId));
      // Only initialize if it doesn't exist, preserving existing history
      if (!chatHistory.length) {
        dispatch(initializeConversation({ userId, messages: [] }));
      }
    }
    // Remove clearActiveChat to preserve history when switching users
  }, [userId, dispatch, chatHistory.length]);

  useEffect(() => {
    if (!socket || !currentUser) return;

    socket.on('receiveMessage', (data) => {
      if (data.senderId === userId) {
        const message = {
          id: Date.now(),
          senderId: data.senderId,
          senderName: data.senderName,
          message: data.message,
          messageType: data.messageType || 'text',
          audioData: data.audioData,
          timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
          isOwn: false
        };
        dispatch(addMessage({ userId, message }));
      }
    });

    socket.on('userTyping', (data) => {
      if (data.senderId === userId) {
        setOtherUserTyping(data.isTyping);
      }
      
      // Update typing users for sidebar
      if (data.isTyping) {
        setTypingUsers(prev => new Set([...prev, data.senderId]));
      } else {
        setTypingUsers(prev => {
          const newSet = new Set(prev);
          newSet.delete(data.senderId);
          return newSet;
        });
      }
    });

    // Listen for user online/offline status
    socket.on('userOnline', (data) => {
      setOnlineUsers(prev => new Set([...prev, data.userId]));
    });

    socket.on('userOffline', (data) => {
      setOnlineUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(data.userId);
        return newSet;
      });
    });

    // Listen for initial online users list
    socket.on('onlineUsers', (users) => {
      setOnlineUsers(new Set(users));
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('userTyping');
      socket.off('userOnline');
      socket.off('userOffline');
      socket.off('onlineUsers');
    };
  }, [socket, userId, currentUser, dispatch]);

  const sendMessage = (messageText = null, messageType = 'text', audioData = null) => {
    const textToSend = messageText || newMessage.trim();
    if ((!textToSend && messageType === 'text') || !socket || !currentUser) return;

    const messageData = {
      senderId: currentUser._id,
      receiverId: userId,
      message: textToSend,
      messageType,
      audioData,
      senderName: currentUser.firstName
    };

    const message = {
      id: Date.now(),
      senderId: currentUser._id,
      senderName: currentUser.firstName,
      message: textToSend,
      messageType,
      audioData,
      timestamp: new Date(),
      isOwn: true
    };
    
    dispatch(addMessage({ userId, message }));
    socket.emit('sendMessage', messageData);
    setNewMessage('');
    setShowEmojiPicker(false);
    
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

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit('stopTyping', {
        senderId: currentUser._id,
        receiverId: userId
      });
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Voice recording functions
  const startVoiceRecording = async () => {
    const success = await audioRecorderRef.current.startRecording();
    if (success) {
      setIsRecording(true);
      setRecordingTime(0);
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };

  const stopVoiceRecording = async () => {
    const audioData = await audioRecorderRef.current.stopRecording();
    setIsRecording(false);
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
    setRecordingTime(0);

    if (audioData) {
      const base64Audio = await blobToBase64(audioData.blob);
      sendMessage(`🎵 Voice message (${Math.round(audioData.blob.size / 1024)}KB)`, 'audio', base64Audio);
    }
  };

  const cancelVoiceRecording = () => {
    audioRecorderRef.current.cancelRecording();
    setIsRecording(false);
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
    setRecordingTime(0);
  };

  // Speech-to-text functions
  const startSpeechToText = () => {
    const success = speechToTextRef.current.startListening(
      (finalText, interimText) => {
        setNewMessage(finalText + interimText);
      },
      () => {
        setIsListening(false);
      }
    );
    if (success) {
      setIsListening(true);
    }
  };

  const stopSpeechToText = () => {
    speechToTextRef.current.stopListening();
    setIsListening(false);
  };

  // Play audio message
  const playAudioMessage = (audioData) => {
    try {
      const blob = base64ToBlob(audioData);
      const audioUrl = URL.createObjectURL(blob);
      playAudio(audioUrl);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  // Text-to-speech for incoming messages
  const speakMessage = (text) => {
    textToSpeechRef.current.speak(text);
  };

  const addEmoji = (emoji) => {
    setNewMessage(prev => prev + emoji);
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle case when chat partner is not found
  if (!chatPartner) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center relative"
        style={{
          backgroundImage: 'url(/dev.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="text-center text-white relative z-10">
          <h2 className="text-2xl font-bold mb-4">User not found</h2>
          <button 
            onClick={() => navigate('/connections')} 
            className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Back to Connections
          </button>
        </div>
      </div>
    );
  }

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      {/* Sidebar - Desktop Only */}
      <div className={`hidden lg:flex lg:flex-col lg:w-80 bg-white border-r border-gray-200 h-full ${isSidebarOpen ? 'block' : 'hidden'}`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-800">Messages</h1>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        
        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {connections && connections.length > 0 ? (
            connections.map((connection) => {
              const lastMessage = getLastMessage(connection._id);
              const isActive = connection._id === userId;
              const isOnline = onlineUsers.has(connection._id); // Check if user is actually online
              const isTyping = typingUsers.has(connection._id); // Check if user is typing
              
              return (
                <div 
                  key={connection._id} 
                  onClick={() => handleChatNavigation(connection._id)}
                  className={`p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors ${
                    isActive ? 'bg-purple-50 border-l-4 border-l-purple-500' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-full overflow-hidden transition-all ${
                        isTyping ? 'ring-2 ring-blue-400 ring-opacity-75' : ''
                      }`}>
                        <img 
                          src={connection.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                          alt={connection.firstName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Only show green dot for online users */}
                      {isOnline && !isTyping && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                      {/* Show blue typing indicator */}
                      {isTyping && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-600 rounded-full border-2 border-white animate-pulse"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {connection.firstName} {connection.lastName}
                        </h3>
                        {lastMessage && (
                          <span className="text-xs text-gray-500">
                            {lastMessage.time}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate">
                          {isTyping ? (
                            <span className="text-blue-600 font-medium italic flex items-center">
                              <span className="flex space-x-1 mr-2">
                                <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                              </span>
                              typing...
                            </span>
                          ) : lastMessage ? (
                            <span className={lastMessage.isOwn ? 'text-blue-600' : ''}>
                              {lastMessage.isOwn ? 'You: ' : ''}{lastMessage.text}
                            </span>
                          ) : (
                            'No messages yet'
                          )}
                        </p>
                        {lastMessage && !lastMessage.isOwn && !isTyping && (
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>No connections found</p>
              <button 
                onClick={() => navigate('/connections')}
                className="mt-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                Find connections
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col max-w-full lg:max-w-none h-full">
        {/* Chat Header - Fixed */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <button 
              className="lg:hidden text-gray-600 hover:text-gray-800"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="relative">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden">
                <img 
                  src={chatPartner.photoUrl} 
                  alt={chatPartner.firstName}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Only show green dot if user is actually online */}
              {onlineUsers.has(chatPartner._id) && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                {chatPartner.firstName} {chatPartner.lastName}
              </h3>
              {otherUserTyping ? (
                <p className="text-sm text-blue-600 font-medium flex items-center">
                  <span className="flex space-x-1 mr-2">
                    <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </span>
                  typing...
                </p>
              ) : onlineUsers.has(chatPartner._id) ? (
                <p className="text-sm text-green-500">Online</p>
              ) : (
                <p className="text-sm text-gray-500">Offline</p>
              )}
            </div>
          </div>
          
          {/* Header Actions */}
          <div className="flex items-center space-x-2">
            <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-full text-gray-600">
              <Phone className="w-5 h-5" />
            </button>
            <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-full text-gray-600">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Container - Scrollable */}
        <div className="flex-1 overflow-y-auto bg-gray-50 min-h-0">
          <div className="max-w-4xl mx-auto p-4 space-y-4 h-full">
            {chatHistory.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src={chatPartner.photoUrl} 
                    alt={chatPartner.firstName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Chat with {chatPartner.firstName}
                </h3>
                <p className="text-gray-500 text-sm">
                  Send your first message to start the conversation!
                </p>
              </div>
            ) : (
              chatHistory.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
                    message.isOwn 
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-br-md' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm'
                  }`}>
                    <div className="flex items-start justify-between">
                      <p className="text-sm leading-relaxed font-medium flex-1">{message.message}</p>
                      {!message.isOwn && (
                        <button className="ml-2 p-1 rounded-full hover:bg-gray-100 text-gray-600 text-xs">
                          <Volume2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <p className={`text-xs mt-2 ${
                      message.isOwn ? 'text-purple-100' : 'text-gray-500'
                    }`}>
                      {formatTimestamp(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))
            )}
            
            {/* Typing Indicator */}
            {otherUserTyping && (
              <div className="flex justify-start">
                <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-sm text-blue-600 font-medium italic">{chatPartner?.firstName} is typing...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div ref={emojiPickerRef} className="border-t border-gray-200 bg-white">
            <div className="max-w-4xl mx-auto p-4">
              <div className="grid grid-cols-10 sm:grid-cols-15 lg:grid-cols-20 gap-2">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => addEmoji(emoji)}
                    className="text-xl p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Message Input - Fixed at bottom */}
        <div className="border-t border-gray-200 bg-white flex-shrink-0">
          <div className="max-w-4xl mx-auto p-4">
            {isRecording ? (
              // Voice recording interface
              <div className="flex items-center justify-center space-x-4 py-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-600 font-medium">Recording... {recordingTime}s</span>
                </div>
                <button 
                  onClick={() => setIsRecording(false)}
                  className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-colors"
                >
                  ✓
                </button>
                <button 
                  onClick={() => setIsRecording(false)}
                  className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
                >
                  <Smile className="w-5 h-5" />
                </button>
                
                <button 
                  onClick={() => setIsListening(!isListening)}
                  className={`p-2 rounded-full transition-colors ${
                    isListening 
                      ? 'bg-red-100 text-red-600 animate-pulse' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title={isListening ? 'Stop listening' : 'Speech to text'}
                >
                  <Mic className="w-5 h-5" />
                </button>
                
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isListening ? "Listening..." : "Type a message..."}
                    className={`w-full px-4 py-3 text-base bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all placeholder-gray-500 ${
                      isListening ? 'bg-red-50 border-2 border-red-200' : ''
                    }`}
                  />
                </div>
                
                <button 
                  onMouseDown={() => setIsRecording(true)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-3 rounded-full transition-colors hidden sm:block"
                  title="Hold to record voice message"
                >
                  <Mic className="w-5 h-5" />
                </button>
                
                <button 
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className={`p-3 rounded-full transition-all ${
                    newMessage.trim() 
                      ? 'bg-purple-500 hover:bg-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;