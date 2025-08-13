// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import { useSelector } from 'react-redux';

// const SocketContext = createContext();

// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (!context) {
//     throw new Error('useSocket must be used within a SocketProvider');
//   }
//   return context;
// };

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState({});
//   const user = useSelector((store) => store.user);

//   useEffect(() => {
//     if (user) {
//       // Initialize socket connection
//       const isLocal = window.location.hostname === 'localhost';
//       const socketURL = isLocal
//         ? 'http://localhost:9931'
//         : `${window.location.protocol}//${window.location.host}`; // same host (codeally.online)
//       const newSocket = io(socketURL, {
//         withCredentials: true,
//         transports: ['websocket', 'polling']
//       });

//       // Join with user ID when connected
//       newSocket.on('connect', () => {
//         console.log('Connected to server:', newSocket.id);
//         newSocket.emit('join', user._id);
//       });

//       newSocket.on('disconnect', () => {
//         console.log('Disconnected from server');
//       });

//       setSocket(newSocket);

//       return () => {
//         newSocket.close();
//       };
//     }
//   }, [user]);

//   const value = {
//     socket,
//     onlineUsers,
//     setOnlineUsers,
//   };

//   return (
//     <SocketContext.Provider value={value}>
//       {children}
//     </SocketContext.Provider>
//   );
// };
