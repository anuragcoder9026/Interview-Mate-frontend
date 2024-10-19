import React, { useState } from "react";
import { FaUserFriends, FaAddressBook, FaUsers, FaUsersCog, FaCalendarAlt, FaFileAlt, FaNewspaper, FaHashtag } from "react-icons/fa"; // Import icons from react-icons
import { IoIosArrowUp,IoIosArrowDown } from "react-icons/io";

const MenageNetworkCard = () => {
  const [show,setShow]=useState(false);
  return (
    <div style={{ position: 'sticky', top: '10px' }} className="sm:mb-12">
      <div className="w-full lg:w-[300px] rounded-lg overflow-hidden  bg-white border border-gray-300">
        <aside className="w-full bg-white rounded-lg">
           <div className="flex justify-between border-b p-4 pb-1">
          <h2 className="text-lg font-semibold">Manage my network</h2>
          {show?<span className="p-3  hover:bg-gray-200 hover:cursor-pointer" style={{borderRadius:"50%"}} onClick={()=>setShow(!show)}><IoIosArrowUp  className=""/></span>:<span className="p-3 rounded-full hover:bg-gray-200 hover:cursor-pointer" onClick={()=>setShow(!show)}><IoIosArrowDown  className=""/></span>}
          </div> 
          {
            show&&<ul className="py-2">
            {/* Connections */}
            <li className="flex justify-between items-center p-3 hover:bg-gray-300 hover:cursor-pointer">
              <button className="flex items-center text-gray-700 ">
                <FaUserFriends className="mr-2" /> Connections
              </button>
              <span className="text-gray-500">1,070</span>
            </li>
            {/* Contacts */}
            <li className="flex justify-between items-center p-3 hover:bg-gray-300 hover:cursor-pointer">
              <button className="flex items-center text-gray-700 ">
                <FaAddressBook className="mr-2" /> Contacts
              </button>
              <span className="text-gray-500">230</span>
            </li>
            {/* Following & Followers */}
            <li className="flex justify-between items-center p-3 hover:bg-gray-300 hover:cursor-pointer">
              <button className="flex items-center text-gray-700 ">
                <FaUsers className="mr-2" /> Following & Followers
              </button>
              <span className="text-gray-500">15</span>
            </li>
            {/* Group */}
            <li className="flex justify-between items-center p-3 hover:bg-gray-300 hover:cursor-pointer">
              <button className="flex items-center text-gray-700 ">
                <FaUsersCog className="mr-2" /> Group
              </button>
              <span className="text-gray-500">1</span>
            </li>
            {/* Events */}
            <li className="flex justify-between items-center p-3 hover:bg-gray-300 hover:cursor-pointer">
              <button className="flex items-center text-gray-700 ">
                <FaCalendarAlt className="mr-2" /> Events
              </button>
              <span className="text-gray-500">5</span>
            </li>
            {/* Pages */}
            <li className="flex justify-between items-center p-3 hover:bg-gray-300 hover:cursor-pointer">
              <button className="flex items-center text-gray-700 ">
                <FaFileAlt className="mr-2" /> Pages
              </button>
              <span className="text-gray-500">15</span>
            </li>
            {/* Newsletters */}
            <li className="flex justify-between items-center p-3 hover:bg-gray-300 hover:cursor-pointer">
              <button className="flex items-center text-gray-700 ">
                <FaNewspaper className="mr-2" /> Newsletters
              </button>
              <span className="text-gray-500">8</span>
            </li>
            {/* Hashtag */}
            <li className="flex justify-between items-center p-3 hover:bg-gray-300 hover:cursor-pointer">
              <button className="flex items-center text-gray-700 ">
                <FaHashtag className="mr-2" /> Hashtag
              </button>
              <span className="text-gray-500">1</span>
            </li>
          </ul>
         }
        </aside>
      </div>
    </div>
  );
};

export default MenageNetworkCard;
