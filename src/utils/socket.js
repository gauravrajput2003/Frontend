import io from "socket.io-client";

const SOCKET_URL = location.hostname === "localhost" 
  ? "http://localhost:9931" 
  : `${location.protocol}//${location.hostname}${location.port ? ':' + location.port : ''}`;

export const createSocketConnection=()=>{
    return io(SOCKET_URL, {
        path: '/socket.io/',
        withCredentials: true,
        transports: ['websocket', 'polling'], // Support both for better compatibility
        timeout: 20000,
        forceNew: true
    });
}