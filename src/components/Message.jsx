import React, { useState, useEffect, useRef } from 'react';
import { FaSearch,} from 'react-icons/fa';
import user from "../assets/images/user.png";
import { LuMessageSquarePlus } from "react-icons/lu";
import MessageSection from './MessageSection';
import { Sidebar } from './MessageSearch';
const usersData = [
  { id: 1, name: 'John Doe', lastMessage: 'See you tomorrow!', time: '10:00 AM', profileImg: user },
  { id: 2, name: 'Jane Smith', lastMessage: 'Meeting at 3 PM.', time: '9:45 AM', profileImg: user },
  { id: 3, name: 'Michael Lee', lastMessage: 'I’ll send the report.', time: '9:30 AM', profileImg: user},
  // More users...
];

const messagesData = {
  1: [
    { id: 1, user: 'John Doe', message: 'Hey, how are you?', time: '10:00 AM', fromMe: false, profileImg: user },
    { id: 2, user: 'You', message: 'I am good, thanks!', time: '10:02 AM', fromMe: true, profileImg: user },
  ],
  2: [
    { id: 1, user: 'Jane Smith', message: 'See you at the meeting.', time: '9:50 AM', fromMe: false, profileImg: user },
  ],
  // More messages per user...
};


const Message = () => {
  const [selectedUser, setSelectedUser] = useState(usersData[0]);
  const [messages, setMessages] = useState(messagesData[selectedUser.id] || []);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('search'); // 'search' or 'message'

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages(messagesData[user.id] || []);
    setActiveTab('message'); // Switch to message tab when user is selected
  };
  const handleActiveTab=(value)=>{
       setActiveTab(value);
  }
  const handleSendMessage = (newMessage) => {
    const newMessageData = {
      id: messages.length + 1,
      user: 'You',
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fromMe: true,
      profileImg: user,
    };
    setMessages([...messages, newMessageData]);
  };

  return (
    <div className="flex h-screen w-full  bg-gray-900 text-white">
      {/* Sidebar for large screens */}
      <div className="hidden lg:flex lg:flex-col lg:w-1/3">
        <Sidebar
          users={usersData}
          onUserSelect={handleUserSelect}
          selectedUserId={selectedUser.id}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {/* Chat Section */}
      <div className="flex-1 hidden lg:flex w-2/3">
        <MessageSection
          selectedUser={selectedUser}
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      </div>

      {/* Mobile header with tabs */}
      <div className="flex flex-col w-full lg:hidden">
        <div className="lg:hidden w-full bg-gray-800 p-4 pb-0 pt-3 text-white flex justify-between items-center">
          <button
            className={`flex px-3 py-2 ${activeTab === 'search' ? 'bg-gray-700' : 'bg-gray-900'} rounded-lg`}
            onClick={() => setActiveTab('search')}
          > <FaSearch className="text-white mr-2 mt-1" />
            Search
          </button>
          <button
            className={`flex px-3 py-2 ${activeTab === 'message' ? 'bg-gray-700' : 'bg-gray-900'} rounded-lg`}
            onClick={() => setActiveTab('message')}
          ><LuMessageSquarePlus className="text-white text-1xl mr-2 mt-1.5"/>
            Message
          </button>
        </div>

        {/* Mobile search section */}
        {activeTab === 'search' && (
          <div className="lg:hidden bg-gray-900 z-50">
            <Sidebar
              users={usersData}
              onUserSelect={handleUserSelect}
              selectedUserId={selectedUser.id}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        )}

        {/* Mobile message section */}
        {activeTab === 'message' && (
          <div className="lg:hidden bg-gray-900 z-50">
            <MessageSection
              selectedUser={selectedUser}
              messages={messages}
              onSendMessage={handleSendMessage}
              onBack={handleActiveTab}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
