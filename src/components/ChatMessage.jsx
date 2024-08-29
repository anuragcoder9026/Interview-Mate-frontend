import React from "react";
const ChatMessage = ({ message, fromMe }) => {
    return (
      <div className={`flex items-start ${fromMe ? 'justify-end' : 'justify-start'} mb-2`}>
        {!fromMe && (
          <img src={message.profileImg} alt="profile" className="rounded-full w-5 h-5 mr-2 mt-2" />
        )}
        <div
          className={`flex flex-col max-w-[80%] px-2 py-2 rounded-lg ${
            fromMe ? 'bg-blue text-white' : 'bg-gray-700 text-gray-200'
          }`}
        >
          {/* Ensure text wraps and adjusts to container size */}
          <p className="break-words overflow-hidden overflow-ellipsis">{message.message}</p>
          <span className="text-xs text-gray-400 mt-1">{message.time}</span>
        </div>
        {fromMe && (
          <img src={message.profileImg} alt="profile" className="rounded-full w-5 h-5 ml-2 mt-3" />
        )}
      </div>
    );
  };
  export default ChatMessage;