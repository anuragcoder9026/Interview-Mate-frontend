import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { FiSend } from 'react-icons/fi';
import user from "../assets/images/user.png";
import { FaPaperclip, FaSmile, FaImage } from 'react-icons/fa';
import ChatMessage from "./ChatMessage";
import EmojiPicker from 'emoji-picker-react';

const MessageSection = ({ selectedUser, messages, onSendMessage, onBack }) => {
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const handleBack = () => {
    onBack('search');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

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

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-900">
      <div className="flex px-1 lg:px-3 py-3 w-full pt-4 bg-gray-800 border-b border-gray-700 sticky top-0">
        <div className="flex lg:hidden items-center mr-2">
          <IoMdArrowBack className='text-white text-xl' onClick={handleBack} />
        </div>
        <img src={user} alt="profile" className="rounded-full w-8 h-8 mr-2 mt-2" />
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-white">{selectedUser.name}</h2>
          {selectedUser.isOnline && <p className="text-green text-sm">online</p>}
        </div>
      </div>

      {/* Container for messages with scroll functionality */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} fromMe={msg.fromMe} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative border-t border-gray-700 px-2 py-2 bg-gray-800 w-full sticky bottom-0">
        <div className="flex items-center mb-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            className="ml-1 mr-1 hover:bg-blue text-white text-xl px-2 py-2 rounded-lg"
            onClick={handleSendMessage}
          >
            <FiSend />
          </button>
          {showEmojiPicker && (
              <div
                ref={emojiPickerRef}
                className="absolute bottom-28 left-0 pl-1 md:pl-4 rounded-lg z-50 "
              >
                <EmojiPicker onEmojiClick={onEmojiClick} style={{width:"300px",height:"400px"}}/>
              </div>
            )}
        </div>

        <div className="flex justify-start gap-5 p-2">
          <FaImage className="text-gray-400 text-xl cursor-pointer" />
          <div className="relative">
            <FaSmile
              className="text-gray-400 text-xl cursor-pointer"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            />
           
          </div>
          <FaPaperclip className="text-gray-400 text-xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default MessageSection;
