import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { FiSend } from 'react-icons/fi';
import user from "../assets/images/user.png";
import { FaPaperclip, FaSmile, FaImage } from 'react-icons/fa';
import ChatMessage from "./ChatMessage";
import EmojiPicker from 'emoji-picker-react';
import { useUserContext } from "../context/usercontext"; 
import axios from "axios";
import socket from "../../socket";
import messagingImage from "../assets/images/messaging.png";
import { useParams } from 'react-router-dom';
import {BACKEND_URL} from "../../url"
const MessageSection = ({ selectedUser,UpdateUsersLastMessage,usersTyping,handleUserTyping, handleUserOnline,onBack }) => {
  const { userdata,setOnlineStatus } = useUserContext();
  const selid=useParams().userId;
  const [messages,setMessages] = useState();
  const [newMessage, setNewMessage] = useState('');
  const [status, setStatus] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const [contactOnline, setContactOnline] = useState(false);
  const [isSending,setIsSending]=useState(false);
  const parentDivRef = useRef(null);

  const imageUrl="https://tse4.mm.bing.net/th?id=OIP.Z14BsSLq7JcRcQC27h52lAHaLH&pid=Api&P=0&h=180";
  useEffect(()=>{
   setContactOnline(selectedUser?.online);
    socket.emit('join', userdata?._id);
    

    socket.on('receiveMessage', ({userId,message,unseenCount}) => {
      if(message.sender ===userdata?._id )setIsSending(false);
      if(message.sender === selid || message.receiver === selid){
        setMessages((prev) => {
        const newmessages=[...prev, message]
        return newmessages;
      });
      }
      UpdateUsersLastMessage(userId,message,unseenCount);
      socket.emit('messageReceived', message._id);
    });

    socket.on('messageStatus', (data) => {
      setStatus((prev) => ({ ...prev, [data.messageId]: data.status }));
    });

    socket.on('userTyping', ({ userId, typing }) => {
      handleUserTyping(userId, typing);
    });
    
     socket.on('userOnlineStatus', ({ userId, online }) => {
      if (userId === selectedUser?._id) {
        setContactOnline(online);
      }
      handleUserOnline(userId, online );
      setOnlineStatus((prev) => ({ ...prev, [userId]: online }));
    });

    return()=>{
      socket.off('receiveMessage');
      socket.off('messageStatus');
      socket.off('userTyping');
      socket.off('userOnlineStatus');
    }
  },[selid]);


  const handleSendMessage = async () => {
    // Check if an image file is provided
    if (!imageFile) {
        // If no image file, check if there is a text message to send
        if (newMessage.trim()) {
            setIsSending(true);
            // Send text message via socket
            socket.emit('sendMessage', { 
                senderId: userdata?._id, 
                recipientId: selectedUser?._id, 
                content: { text: newMessage }, 
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
            setNewMessage('');
        }
    } else {
        setIsSending(true);
        try {
            // Get image URL from server after uploading the image
            const imageUrl = await getMessageImageUrl(imageFile);
            if (imageUrl) {
                // Send message with both text and image URL if available
                socket.emit('sendMessage', { 
                    senderId: userdata?._id, 
                    recipientId: selectedUser?._id, 
                    content: { 
                        text: newMessage.trim() ? newMessage : null, 
                        image: imageUrl 
                    },
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                });
                // Reset the image-related states and clear message input
                setMessageImage({ url: null, name: '' });
                setImageFile(null);
                setIsImage(false);
                setNewMessage('');
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            // Handle any error that occurs during the image upload
        }
    }
};


  const handleTyping = () => {
    socket.emit('typing', { userId:userdata._id, recipientId: selectedUser._id, typing: true });
    setTimeout(() => socket.emit('typing', { userId:userdata._id, recipientId: selectedUser._id, typing: false }), 1000);
  };

  const handleSeenMessages = () => {
    const unseenMessages = messages?.filter(
      (msg) => msg.sender === selectedUser?._id && status[msg._id] !== 'seen'
    );

    unseenMessages?.forEach((msg) => {
      socket.emit('messageSeen', msg._id);
    });
  };
  useEffect(() => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        handleSeenMessages();
      }
    }, 20);
  }, [messages]);
  

  
  const handleBack = () => {onBack('search');};

  const onEmojiClick = (emojiData) => {
    setNewMessage((prevMessage) => prevMessage + emojiData.emoji);
  };

  const handleOutsideClick = (e) => {
    if (showEmojiPicker && emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showEmojiPicker]);

 useEffect(()=>{
  const getUserMessages=async()=>{
    try {
      const res = await axios.get(`${BACKEND_URL}/api/message/get-message`,  {
          params:{receiverId:selectedUser?._id},
          headers: {
             'Content-Type': 'application/json'
          },
          withCredentials: true 
      });
      setMessages(res.data);
      const newStatus = res.data.reduce((acc, msg) => {
        acc[msg._id] = msg.status;
        return acc;
      }, {});
      
      setStatus(newStatus);
     } catch (error) {
      console.log(error);
     }
  }
  getUserMessages();
 },[selectedUser]);

 const [isImage,setIsImage]=useState(false);
 const [messageImage, setMessageImage] = useState({ url: null, name: '' });
 const [imageFile,setImageFile]=useState(null);

 const handleIsImage=()=>{
  setMessageImage({ url: null, name: '' });
  setImageFile(null); 
  setIsImage(false);
}

 const getMessageImageUrl=async(file)=>{
  const postData={messageImage:file};
  try {
    const res = await axios.post(`${BACKEND_URL}/api/message/get-image-url`, postData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true 
    });
    console.log(res);
    if(res.status===200)return res.data;
   } catch (error) {
    console.log(error);
    return null;
   }
 }
  const handleMediaChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
          const name = file.name;
              if (messageImage.url) URL.revokeObjectURL(messageImage.url); 
              setMessageImage({ url, name });
              setIsImage(true);
              setImageFile(file);
              console.log(file);
              
      }
  };    

  const FormattedDate = (dateStr) => {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    return formattedDate;
};
const handleEmojiPicker=()=>{setShowEmojiPicker((prev)=>!prev);}
  return (
    !selectedUser ? 
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-900">    
             <img src={messagingImage} alt="" className="object-contain" 
             style={{height:"300px",width:"300px"}}/>     
    </div>
    :<div className="flex flex-col w-full min-h-screen bg-gray-900">
      <div className="flex px-1 lg:px-3 py-3 w-full pt-4 bg-gray-800 border-b border-gray-700 sticky top-0">
        <div className="flex lg:hidden items-center mr-2">
          <IoMdArrowBack className='text-white text-xl' onClick={handleBack} />
        </div>
        <img src={selectedUser?.profileimg} alt="profile" className="rounded-full w-8 h-8 mr-2 mt-2" />
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-white">{selectedUser?.name}</h2>
          {usersTyping[selectedUser?._id] ? <p className=" text-sm" style={{color:"greenyellow"}}>Typing...</p>: contactOnline ? <p className="text-sm" style={{color:"greenyellow"}}>online</p> :<p></p>}
        </div>
      </div>

      {/* Container for messages with scroll functionality */}
      {!messages ?  <div  className="flex h-screen w-full justify-center  items-center bg-gray-900 ">
      <div className="w-12 h-12 animate-spin border-4 border-white"></div>
    </div>
 :
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
        {messages?.map((msg,index) => (
          <React.Fragment key={msg.id}>
          {(index === 0 || FormattedDate(messages[index - 1].timestamp) !== FormattedDate(msg.timestamp)) && (
            <div className="flex justify-center my-4">
              <span className="text-center text-xs text-gray-400 px-3 py-1 bg-gray-800 rounded-md"> {FormattedDate(msg.timestamp)} </span>
            </div>
          )}
          <ChatMessage
            key={msg.id}
            message={msg}
            fromMe={msg.sender === userdata._id}
            receiverImage={selectedUser?.profileimg}
            messageStatus={status[msg._id]}
          />
        </React.Fragment>
        ))}
        <div ref={messagesEndRef} />
      </div>
       } 
      <div className="relative border-t border-gray-700 px-2 py-2 bg-gray-800 w-full sticky bottom-0">
        <div className="flex items-center mb-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyUp={handleTyping}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          {isSending ? <div className="w-6 h-6 border-4 border-blue border-t-transparent rounded-full animate-spin ml-2 mt-1"></div> : <button
            className="ml-1 mr-1 hover:bg-blue text-white text-xl px-2 py-2 rounded-lg"
            onClick={handleSendMessage}
          >
            <FiSend />
            </button>}
          {showEmojiPicker && (
              <div
                ref={emojiPickerRef}
                className="absolute bottom-28 left-0 pl-1 md:pl-4 rounded-lg z-50 "
              >
                <EmojiPicker onEmojiClick={onEmojiClick} style={{width:"300px",height:"400px"}}/>
              </div>
            )}
            {
              isImage && (
                <div className="absolute bottom-28 left-2 z-50" >
                <img src={messageImage.url} className="object-cover rounded-lg" style={{width:"270px",height:"400px"}}/>
                <button 
                className="text-white bg-blue bg-opacity-60 rounded-full p-1 px-2.5"
                style={{position:"absolute",top:"5px",right:"5px"}} 
                onClick={handleIsImage}
                aria-label="Close"
              >
                ✕
              </button>
               </div>
            
              )
            }
        </div>

        <div className="flex justify-start gap-5 p-2">
                   <input
                    type="file"
                    accept="image/*,"
                    onChange={handleMediaChange}
                    className="hidden"
                    id="media-upload"
                  />
                  <label
                    htmlFor="media-upload"
                    className="cursor-pointer"
                  >
                    <FaImage className="text-gray-400 text-xl cursor-pointer"  />
                  </label>
          <div className="relative">
            <FaSmile
              className="text-gray-400 text-xl cursor-pointer"
              onClick={handleEmojiPicker}
            />
           
          </div>
          <FaPaperclip className="text-gray-400 text-xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default MessageSection;
