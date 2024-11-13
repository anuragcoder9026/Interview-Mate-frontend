import React from "react";
import { BiCheckDouble,BiCheck } from "react-icons/bi";
import { useUserContext } from "../context/usercontext"; 
const ChatMessage = ({ message, fromMe ,receiverImage ,messageStatus}) => {
  const { userdata } = useUserContext();
    return (
      <div className={`flex items-start ${fromMe ? 'justify-end' : 'justify-start'} mb-2`}>
        {!fromMe && (
          <img src={receiverImage} alt="profile" className="rounded-full w-5 h-5 mr-2 mt-2" />
        )}
        <div
          className={`flex flex-col max-w-[80%] px-2 py-2 rounded-lg ${
            fromMe ? `bg-blue text-white bg-opacity-20` : 'bg-gray-600 text-white'
          }`}
          
        >
          {/* Ensure text wraps and adjusts to container size */}
          {message?.content.image && <img src={message?.content.image}  className="object-contain rounded-lg" style={{maxWidth:"270px",maxHeight:"400px"}}/> }
          {message?.content?.text && <p className="break-words overflow-hidden overflow-ellipsis">{message?.content?.text}</p>}
          <div className="flex justify-between">
          <span className="text-xs text-gray-400 mt-1">{message?.time}</span>
          {fromMe && messageStatus === 'sent' && <BiCheck className="text-gray mt-1"/>}
          {fromMe && messageStatus === 'received' && <BiCheckDouble className="text-white mt-1"/>}
          {fromMe && messageStatus === 'seen' && <BiCheckDouble className="mt-1" style={{color:"greenyellow"}}/>}
          </div>
        </div>
        {fromMe && (
          <img src={userdata?userdata.profileimg :message.profileImg} alt="profile" className="rounded-full w-5 h-5 ml-2 mt-3" />
        )}
      </div>
    );
  };
  export default ChatMessage;