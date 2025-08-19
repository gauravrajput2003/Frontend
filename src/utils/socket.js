import io from "socket.io-client";

const SOCKET_URL = location.hostname === "localhost" ? "http://localhost:9931" : window.location.origin;

export const createSocketConnection=()=>{
    return io(SOCKET_URL, {
        path: '/socket.io/',
        withCredentials: true
    });
}