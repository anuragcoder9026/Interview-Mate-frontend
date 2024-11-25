'use client'

import { useState, useEffect, useRef } from 'react'
import { MoreVertical, X, Send, Gift, ChevronDown, CornerUpLeft } from 'lucide-react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import user from "../assets/images/user.png";
import { useUserContext } from '../context/usercontext';
import socket from "../../socket";
import { useParams } from 'react-router-dom';
import {BACKEND_URL} from "../../url"
import axios from "axios"
import { FaRegTimesCircle } from 'react-icons/fa'; 
import { FaQuestionCircle } from "react-icons/fa";
import { EnhancedEncryptionOutlined } from '@mui/icons-material';
export default function EventChat() {
    const {userdata}=useUserContext();
    const {id}=useParams();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('')
  const [userCount, setUserCount] = useState(0)
  const [streamDuration, setStreamDuration] = useState(0)
  const [replyingTo, setReplyingTo] = useState(null)
  const [showDropdown, setShowDropdown] = useState(null)
  const [eventEnded,setEventEnded]=useState(false);
  const scrollAreaRef = useRef(null)
  const bottomRef = useRef(null)

  const [currentUser,setCurrentUser] = useState({ 
    id:userdata?._id,
    name:userdata?.name,
    avatar: userdata?.profileimg,})
  useEffect(()=>{
    const getEvent=async()=>{
      try {
        const res = await axios.get(`${BACKEND_URL}/api/event/get-event`,  {
            params:{eventId:id},
            headers: {
               'Content-Type': 'application/json'
            },
            withCredentials: true 
        });
        console.log(res);
        setEventEnded(res?.data?.status==='ended');
        if(res?.data?.eventAdmin === userdata ?._id && res?.data?.status!=='ended'){
          socket.emit('liveEvent', { eventId: res?.data?.eventId, userId: userdata?._id});
        }
        else if( res?.data?.status==='live'){
          socket.emit('joinEvent', { eventId: res?.data?.eventId, userId: userdata?._id});
         }
         setMessages(res?.data?.chats);
        setCurrentUser({ ...currentUser,
          userType:  res?.data?.eventAdmin === userdata ?._id ? 'admin' : 'default'})
       } catch (error) {
        console.log(error);
       }
    }
    getEvent();
    return () => {
      if (location.pathname !== `/event/${id}`) {
        socket.emit("leaveEvent", { eventId: id, userId: userdata._id });
      }
    };
   },[id,userdata, location.pathname]);

  useEffect(() => {
    const timer = setInterval(() => {
      setStreamDuration(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  
  useEffect(() => {
    socket.on('newUser', (newUser) => {
      const newUserMessage = {
        id: Date.now(),
        user: newUser?.name,
        content: '',
        userType: 'default',
        username: newUser?.username,
        avatar: newUser?.profileimg,
        isNewUser: true
      }
      setMessages(prev => [...prev, newUserMessage])
    });

    socket.on('newMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on('watchingUsers', (numUsers)=>{
      setUserCount(numUsers)
    });
    socket.on('eventEnded', ({eventId})=>{
      if(id===eventId) setEventEnded(true);
    });

    return () => {
      socket.off('newUser');
      socket.off('newMessage');
      socket.off('watchingUsers');
    };
  }, []) 


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    
    const messagePayload = {
      eventId:id,
      userId: currentUser?.id,
      name:currentUser?.name,
      avatar:currentUser?.avatar,
      text: newMessage,
      isAdminChat: currentUser?.userType === 'admin',
      repliedTo: replyingTo ? replyingTo.userId : null 
    };
    
    socket.emit('sendEventMessage', messagePayload);
    // setMessages(prev => [...prev, newMsg])
    setNewMessage('');
    setReplyingTo(null);
  };

  const handleReply = (message) => {
    setReplyingTo({
      id: message.id,
      userId:message.userId,
      user: message.user,
      content: message.content
    })
   
    setShowDropdown(null)
  }

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
 
const navigate=useNavigate();
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleDelete = () => {
    if(currentUser.userType === 'default'){
      socket.emit("leaveEvent", { eventId: id, userId: userdata._id });
      setPopupVisible(false);
      navigate("/");
    }
    if(currentUser.userType === 'admin'){
      socket.emit("endEvent", { eventId: id, userId: userdata._id });
      setPopupVisible(false);
      navigate("/");
    }
  };
  return (
    <div className="w-full text-white min-h-screen flex flex-col" style={{backgroundColor:"#0f0f0f"}}>
      <div className="sticky -top-1 z-10 border-b border-gray-800" style={{backgroundColor:"#0f0f0f"}}>
       { 
       eventEnded && 
      <div className="w-full bg-red-500 text-white py-3 flex items-center justify-between px-4">
      <div className="flex items-center">
        <FaRegTimesCircle className="text-white mr-2" size={24} />
        <span className="font-bold">This event has ended</span>
      </div>
    </div>
     }
     {!eventEnded && <>
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-medium flex items-center gap-2">
            Live chat
            <ChevronDown className="w-4 h-4" />
          </h2>
          <div className="flex items-center gap-2">
            <button className="text-white hover:bg-gray-800 p-2 rounded-full">
              <MoreVertical className="w-5 h-5" />
            </button>
            <button className="text-white hover:bg-gray-800 p-2 rounded-full"   onClick={() => setPopupVisible(true)}>
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="px-4 py-2 text-sm text-gray-400 flex justify-between items-center">
          <span>{userCount.toLocaleString()} watching now</span>
          <span>Stream duration: {formatDuration(streamDuration)}</span>
        </div>
        </>
         }
      </div>
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-200  shadow-lg w-[340px] p-3 py-6 sm:p-6 flex flex-col items-center mx-2">
            <FaQuestionCircle className="text-red-500 text-5xl mb-4" />
            <h2 className="text-lg font-medium text-gray-800 mb-6">
              Are you sure to {currentUser?.userType === 'admin' ? 'End' : 'Leave'} this Event ?
            </h2>
            <div className="flex space-x-4">
              <button
                className="px-4 py-1 bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
                onClick={() => setPopupVisible(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-1 bg-red-500 text-white  hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-grow overflow-y-auto" ref={scrollAreaRef}>
        <div className="p-4 space-y-4">
          {messages?.map((message) => (
            <div key={message.id} className={`flex items-start gap-3 ${message.isNewUser ? 'animate-pulse' : ''}`}>
              <img src={message?.avatar} alt="" className="w-8 h-8 mt-1 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                {message.isNewUser ? (
                  <div className="flex items-center gap-2 bg-blue-500 bg-opacity-20 p-2 rounded-md">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>
                    <span className="font-medium text-blue-400">{message.user} joined the chat</span>
                    <Gift className="w-4 h-4 text-yellow-500" />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-medium ${
                        message?.userType === 'admin' 
                          ? 'text-[#ff0000]'
                          : message?.userType === 'moderator' 
                            ? 'text-[#2ba640]' 
                            : message?.userType === 'member' 
                              ? 'text-[#2196f3]' 
                              : 'text-[#fff]'
                      }`}>
                        {message.user}
                      </span>
                      {message.badge && (
                        <span className="bg-transparent border border-gray-600 text-gray-300 text-xs px-1 py-0.5 rounded">
                          {message.badge}
                        </span>
                      )}
                      {message?.userType === 'admin' && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          Admin
                        </span>
                      )}
                    </div>
                    {message.replyTo && (
                      <div className="mt-1 mb-2 text-sm text-gray-400 flex items-center gap-1">
                        <CornerUpLeft className="w-3 h-3" />
                        <span >Replying to <Link to={`/${message.replyTo.username}`} className='text-blue'>{message.replyTo.name}</Link></span>
                      </div>
                    )}
                    <p className="text-[#fff] mt-0.5 break-words">{message.content}</p>
                  </>
                )}
              </div>
              {currentUser?.userType === 'admin' && message?.userType !== 'admin' && !message.isNewUser && (
                <div className="relative">
                  <button 
                    onClick={() => setShowDropdown(showDropdown === message.id ? null : message.id)}
                    className="text-white hover:bg-gray-800 p-1 rounded-full"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                  {showDropdown === message.id && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button
                          onClick={() => handleReply(message)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                          role="menuitem"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
      { !eventEnded &&
      <div className="sticky bottom-0 bg-[#0f0f0f] border-t border-gray-800 p-4">
        <form onSubmit={handleSendMessage} className="space-y-2">
          {replyingTo && (
            <div className="flex items-center justify-between bg-gray-800 p-2 rounded-md">
              <span className="text-sm text-gray-400">
                Replying to {replyingTo.user}: {replyingTo.content.slice(0, 50)}...
              </span>
              <button
                type="button"
                onClick={() => setReplyingTo(null)}
                className="text-gray-400 hover:text-white p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          <div className="flex items-center gap-4">
            <img src={currentUser?.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Chat ${replyingTo ? 'in reply' : 'publicly'} as ${currentUser?.name}`}
              className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-md px-3 py-2"
            />
            <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
       }

    </div>
  )
}