import React, { useState, useRef, useEffect } from "react";
import { FaSearch,FaCircle} from 'react-icons/fa';
import { FaCircleDot } from "react-icons/fa6";
import socket from "../../socket";
import { FaRegImages } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserListItem = ({ user, onClick,isOnline, active,typing }) =>{ 
  const [lastMessage,setLastMessage]=useState(user?.lastMessage);
  const [unseenCount,setUnseenCount]=useState(user?.unseenMessageCount);
  useEffect(()=>{
    setLastMessage(user?.lastMessage);
    setUnseenCount(user?.unseenMessageCount);
  },[user]);
  return (
  <div
    className={`flex justify-between items-center p-4 pl-2 sm:pl-4 cursor-pointer ${
      active ? 'bg-gray-800' : 'hover:bg-gray-700'
    }`}
    onClick={onClick}
  >
    <div className="flex items-center justify-center relative w-full">
      <div className="flex p-1 min-w-[60px]">
      <img
        src={user.profileimg}
        alt="profile"
        className="rounded-full w-10 h-10"
      />
      {isOnline && (
        <div className="flex flex-col-reverse relative right-3">
          <span className="bg-white p-0.5 rounded-full">
            <FaCircle className="w-2 h-2 bg-white p-0.5" style={{color:"white",border:"3px solid green",borderRadius:"50%"}}/>
          </span>  
        </div>
      )}
      </div>
      
      <div className="flex flex-col  w-full">
        <div className="flex justify-between">
          <h4 className="font-semibold text-white">{user.name}</h4>
          <span className={`text-xs mt-1`} style={{color:unseenCount>0 ?"greenyellow" :"gray"}}>{lastMessage?.time}</span>
        </div>
          <div className="flex justify-between pr-1">
          {typing ? <p className=" text-sm" style={{color:"greenyellow"}}>Typing...</p>:<p className="text-sm text-gray-400">{lastMessage?.content?.image ? <span className="flex"><FaRegImages className="mr-2 mt-1"/> Image </span>: <span className={`truncate block w-[215px] sm:w-[245px] overflow-hidden text-ellipsis whitespace-nowrap`}>{lastMessage?.content?.text}</span>}</p>}
      
          {unseenCount>0 && <span className="text-xs text-white rounded-full" style={{
            backgroundColor:"green",
            padding:"2px 6px 2px 6px"      
          }}>{unseenCount} </span>}
          </div>
      </div>
    </div>
  </div>
);
}
const Sidebar = ({ users, onUserSelect, selectedUserId, searchQuery, setSearchQuery, usersTyping,userOnlineStatus}) => (
  <div className="flex flex-col w-full h-full border-r border-gray-700 bg-gray-900">
    <div className="px-4 py-4  pb-5 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center bg-gray-600 rounded-lg px-2 py-1">
        <FaSearch className="text-white mr-1 ml-1" />
        <input
          type="text"
          className="flex-1 bg-transparent text-white focus:outline-none p-1"
          placeholder="Search following..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>

    <div className="flex-1 overflow-y-auto">
      {users
        .filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((user) => (
          <Link to={`/message/${user?._id}`}>
          <UserListItem
            key={user._id}
            user={user}
            onClick={() => onUserSelect(user)}
            active={selectedUserId === user._id}
            isOnline={userOnlineStatus[user._id]}
            typing={usersTyping[user._id]}
          />
          </Link>
        ))}
    </div>
  </div>
);

export {Sidebar,UserListItem};

