import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      // Initialize socket connection
      const newSocket = io(window.location.hostname === 'localhost' ? 'http://localhost:9931' : 'http://51.21.131.83:9931', {
        withCredentials: true,
      });

      // Join with user ID when connected
      newSocket.on('connect', () => {
        console.log('Connected to server:', newSocket.id);
        newSocket.emit('join', user._id);
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [user]);

  const value = {
    socket,
    onlineUsers,
    setOnlineUsers,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
