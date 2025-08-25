import io from "socket.io-client";

const SOCKET_URL = location.hostname === "localhost" 
  ? "http://localhost:9931" 
  : `${location.protocol}//${location.hostname}${location.port ? ':' + location.port : ''}`;

export const createSocketConnection = () => {
  const socket = io(SOCKET_URL, {
    path: '/socket.io/',
    withCredentials: true,
    transports: ['websocket', 'polling'],
    timeout: 20000,
    forceNew: true
  });
  // Graceful error handling for production
  socket.on('connect_error', (err) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('WebSocket connection error:', err);
    }
  });
  socket.on('error', (err) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('WebSocket error:', err);
    }
  });
  return socket;
}