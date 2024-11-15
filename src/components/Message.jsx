import React, { useState, useEffect, useRef } from 'react';
import { FaSearch,} from 'react-icons/fa';
import { LuMessageSquarePlus } from "react-icons/lu";
import MessageSection from './MessageSection';
import { Sidebar } from './MessageSearch';
import axios from "axios"
import user from "../assets/images/user.png";
import { useParams } from 'react-router-dom';
import {BACKEND_URL} from "../../url"
import { useUserContext } from "../context/usercontext"; 
const Message = () => {
  const {userId}=useParams();
  const {setUnseenMessageCount,setOnlineStatus } = useUserContext();
  const [usersData,setUserData] = useState();   
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('search');
  const [usersTyping,setUsersTyping]=useState({});
  const [userOnlineStatus,setUserOnlineStatus]=useState({});

  const handleUserTyping=(userId,typing)=>{
    setUsersTyping((prev) => ({ ...prev, [userId]: typing }));
  }
  const handleUserOnline=(userId,online)=>{
    setUserOnlineStatus((prev) => ({ ...prev, [userId]: online }));
  }
  const handleUserSelect = (user) => {
    setUnseenMessageCount((pre)=>pre-user.unseenMessageCount);
    setSelectedUser(user);
    UpdateUnseen(user?._id);
    setActiveTab('message'); 
  };
  const UpdateUsersLastMessage = (userId, message, unseenCount) => {
    let total=0;
    setUserData((prevUserData) => {
      // Map over the previous user data to only update the specified user
      const updatedUserData = prevUserData.map((user) =>{
        if(user._id === userId){
             if(!selectedUser || userId!==selectedUser?._id){
              total+=unseenCount;
              return { ...user, lastMessage: message, unseenMessageCount: unseenCount }
             }
             else{

              return {...user, lastMessage: message, unseenMessageCount: 0 }
             }
        }
        else{
          total+=user.unseenMessageCount;
          return user;
        }
      }
      );
  
      // Sort the updated data by last message timestamp
      return updatedUserData.sort(
        (a, b) => new Date(b.lastMessage?.timestamp) - new Date(a.lastMessage?.timestamp)
      );
    });
  };
  

const handleUpdateUnseen = (userId) => {
  const newUserData = usersData.map((user) => user._id === userId ? {...user, unseenMessageCount: user.unseenMessageCount + 1}:user).sort((a, b) => new Date(b.lastMessage?.timestamp) - new Date(a.lastMessage?.timestamp));
  return newUserData ;
  }


const UpdateUnseen=(userId)=>{
  const newUserData = usersData.map((user) => user._id === userId ? { ...user, unseenMessageCount: 0} : user).sort((a, b) => new Date(b.lastMessage?.timestamp) - new Date(a.lastMessage?.timestamp));
  setUserData(newUserData);
}

  const handleActiveTab=(value)=>{
    //UpdateUnseen(selectedUser?._id);
    if(value==='search')setSelectedUser(null);
    setActiveTab(value);
  }

  useEffect(()=>{
    const getChatsProfile =async()=>{
      const jsonFormData = JSON.stringify({currentuserId:userId});  
      try {
        const res = await axios.post(`${BACKEND_URL}/api/message/all-chats-profile`,jsonFormData,{
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        console.log(res);
        const initUserTyping = res.data.users.reduce((acc, user) => {
          acc[user._id] = false;
          return acc;
        }, {});
        const initUserOnline = res.data.users.reduce((acc, user) => {
          acc[user._id] = user.online;
          return acc;
        }, {});
        
        setUserOnlineStatus(initUserOnline);
        setUsersTyping(initUserTyping);
        setUserData(res.data.users);
        setSelectedUser(res.data.currentUser);
        if(res.data.currentUser){
          setActiveTab('message');
        }
      } catch (error) {
        console.log(error);
      }
    }
    getChatsProfile();
  },[]);
  
  
  return (
    !usersData ? <div  className="flex absolute top-0 h-screen w-full justify-center  items-center bg-gray-900 ">
      <div className="w-12 h-12 animate-spin border-4 border-white"></div>
    </div>: <div  className="flex h-screen w-full bg-gray-900 text-white flex-col lg:flex-row">
    {/* Mobile header with tabs at the top (only for small screens) */}
    <div className="lg:hidden w-full bg-gray-800 p-4 pb-4 pt-4 flex justify-between items-center">
      <button
        className={`flex px-3 py-2 ${
          activeTab === 'search' ? 'bg-gray-700' : 'bg-gray-900'
        } rounded-lg`}
        onClick={() => handleActiveTab('search')}
      >
        <FaSearch className="text-white mr-2 mt-1" />
        Search
      </button>
      <button
        className={`flex px-3 py-2 ${
          activeTab === 'message' ? 'bg-gray-700' : 'bg-gray-900'
        } rounded-lg`}
        onClick={() => handleActiveTab('message')}
      >
        <LuMessageSquarePlus className="text-white text-1xl mr-2 mt-1.5" />
        Message
      </button>
    </div>
  
    {/* Container for Sidebar and MessageSection */}
    <div className="flex-1 flex flex-col lg:flex-row w-full">
      {/* Sidebar: visible on large screens or when the search tab is active on small screens */}
      <div
        className={`${
          activeTab === 'search' ? 'flex' : 'hidden'
        } lg:flex lg:w-1/3 w-full flex-col overflow-y-auto`}
      >
        <Sidebar
          users={usersData}
          onUserSelect={handleUserSelect}
          selectedUserId={selectedUser?._id}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          usersTyping={usersTyping}
          userOnlineStatus={userOnlineStatus}
        />
      </div>
  
      {/* Message Section: visible on large screens or when the message tab is active on small screens */}
      <div
        className={`${
          activeTab === 'message' ? 'flex' : 'hidden'
        } lg:flex lg:flex-row lg:w-2/3 w-full flex-col`}
      >
        <MessageSection
          selectedUser={selectedUser}
          UpdateUsersLastMessage={UpdateUsersLastMessage}
          usersTyping={usersTyping}
          handleUserTyping={handleUserTyping}
          handleUserOnline={handleUserOnline}
          onBack={() => handleActiveTab('search')}
        />
      </div>
    </div>
  </div>
  
  );
};

export default Message;
