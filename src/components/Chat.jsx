import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import {useSelector} from "react-redux";

const Chat = () => {
  const {targetuserId} = useParams();
  const [messages, setMessages] = useState([ ]);
  const [newMessage, setNewMessage] = useState("");
  const user=useSelector(store=>store.user);
  const userId=user._id;
  const sendMessage = () => {
    if (newMessage.trim()) {
      // Add message to local state immediately as "You"
      setMessages((prevMessages) => [
        ...prevMessages,
        { firstName: "You", text: newMessage, isOwn: true }
      ]);
      
      const socket=createSocketConnection();
      socket.emit("sendMessage",{
        firstName:user.firstName,
        userId,
        targetuserId,
        text:newMessage,
      });
      setNewMessage("");
    }
  };
  useEffect(()=>{
    //as soon as a page load ,the socket connection is made and join chat event is meitted
    if(!userId){
      return;
    }
    const socket=createSocketConnection();
    socket.emit("joinChat",{userId,targetuserId});
    socket.on("messageReceived",({firstName,text})=>{
      console.log(firstName+" "+text);
      // Only add message if it's not from the current user (avoid duplicates)
      if(firstName !== user.firstName) {
        setMessages((messages)=>[...messages,{firstName,text, isOwn: false}])
      }
    }
    )
    //unmounted
    return ()=>{
      socket.disconnect();
    }

  },[userId,targetuserId]); 
  return (
    <div className='w-1/2 mx-auto border border-black m-5 h-[80vh] flex flex-col'>
        <h1 className='p-5 border-b border-gray-600'>Chat</h1>
        <div className='flex-1 overflow-scroll p-5'>
         {messages.map((msg, index) => {
            return (
               <div
                 key={index}
                 className={`p-2 m-2 rounded max-w-xs ${
                   msg.isOwn 
                     ? 'bg-blue-500 text-white ml-auto' 
                     : 'bg-gray-300 text-black mr-auto'
                 }`}
               >
                 <div className={`font-bold text-sm ${
                   msg.isOwn ? 'text-blue-200' : 'text-blue-600'
                 }`}>
                   {msg.firstName}
                 </div>
                 <div>{msg.text}</div>
               </div>
               
            )
         })}
        </div>
        <div className='p-5 border-t border-gray-600 flex gap-2'>
            <input 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className='flex-1 border border-gray-500 text-black rounded text-xl p-2'
              placeholder="Type a message..."
            />
            <button 
              onClick={sendMessage}
              className='cursor-pointer btn btn-primary'
            >
              Send
            </button>
        </div>
    </div>
  )
}

export default Chat