import React from "react";
import { FaSearch,} from 'react-icons/fa';
const UserListItem = ({ user, onClick, active }) => (
  <div
    className={`flex justify-between items-center p-4 cursor-pointer ${
      active ? 'bg-gray-800' : 'hover:bg-gray-700'
    }`}
    onClick={onClick}
  >
    <div className="flex items-center">
      <img src={user.profileImg} alt="profile" className="rounded-full w-10 h-10 mr-4" />
      <div>
        <h4 className="font-semibold text-white">{user.name}</h4>
        <p className="text-sm text-gray-400">{user.lastMessage}</p>
      </div>
    </div>
    <span className="text-xs text-gray-500">{user.time}</span>
  </div>
);


const Sidebar = ({ users, onUserSelect, selectedUserId, searchQuery, setSearchQuery }) => (
  <div className="flex flex-col h-full border-r border-gray-700 bg-gray-900">
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
          <UserListItem
            key={user.id}
            user={user}
            onClick={() => onUserSelect(user)}
            active={selectedUserId === user.id}
          />
        ))}
    </div>
  </div>
);

export {Sidebar,UserListItem};

