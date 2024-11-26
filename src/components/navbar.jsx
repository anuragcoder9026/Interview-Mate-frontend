import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import user from "../assets/images/user.png";
import SearchBar from "./searbar";
import { useUserContext } from "../context/usercontext"; // Import the context
import LoginPopup from "./sigin";
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { AiFillHome, AiFillContacts } from "react-icons/ai"; // Home and Contact icons
import { BsFillChatDotsFill } from "react-icons/bs"; // Chatbot icon
import { MdQuiz, MdDashboard } from "react-icons/md"; // Quiz and Dashboard icons
import { IoMdMail } from "react-icons/io"; // Message icon
import { FaUsers } from "react-icons/fa"; // My Network icon
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {BACKEND_URL} from "../../url"
import socket from "../../socket";
import { IoMdMicrophone } from 'react-icons/io';
export default function NavBar() {
  const [isNavBarToggled, setIsNavBarToggled] = useState(false);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] =
    useState(false);
  const { userdata,unseenMessageCount,unseenNotificationCount } = useUserContext();
  const handleProfileClick = () => {
      setIsProfileDropdownVisible(!isProfileDropdownVisible);
  };
  
  const navigate = useNavigate();

      const logout = async (e) => {
        e.preventDefault();
        try { 
            const res = await axios.get(`${BACKEND_URL}/api/users/logout`,{
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true // Include this line to allow cookies
            });
            console.log(res);
            socket.off();
            window.location.href="https://alokthakur490.github.io/Interview-Mate-frontend/";
        } catch (err) {
            console.log(err);
        }
    };

  const handleBars = () => {
    setIsProfileDropdownVisible(false);
    setIsNavBarToggled(!isNavBarToggled);
  };
  
  return (
    <>
      <div className="flex justify-between p-4 pl-2 pr-2 md:hidden bg-black text-white">
        <FaBars className="pl-2 mt-2 size-8" onClick={handleBars} />
        <div className="flex justify-center px-2 sm:px-5 py-2">
          <SearchBar />
        </div>
        {userdata &&
        <div className="flex items-center pr-5">
          <a id="brand" className="flex items-center">
            <img
              className="flex mr-1 w-10 h-10 p-0 rounded-full ring-2 ring-white"
              src={userdata?.profileimg ? userdata.profileimg : user}
              alt="Profile"
              onClick={handleProfileClick} // Trigger the dropdown or popup on click
              style={{ cursor: "pointer" }} // Add a pointer cursor to indicate it's clickable
            />
          </a>
          {isProfileDropdownVisible && (
            <div className="absolute top-10 mr-1 right-0  p-2 rounded z-50 mt-14">
              <div className="bg-black text-white w-64 p-6 rounded-lg relative">
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 text-gray-400 rounded-full p-2 hover:bg-gray-700 transition"
                  onClick={handleProfileClick}
                >
                  <AiOutlineClose size={24} />
                </button>

                {/* Profile Icon and Greeting */}
                <div className="flex flex-col items-center">
                  {userdata && userdata.profileimg ? (
                    <img
                      src={userdata.profileimg}
                      className=" ml-3 mr-4 w-14 h-14 rounded-full ring-4 ring-white"
                    />
                  ) : (
                    <FaUserCircle size={64} className="text-gray-400" />
                  )}
                  <h2 className="mt-4 text-xl font-semibold">
                    Hi, {userdata.name}
                  </h2>
                </div>

                {/* Profile and Sign Out Options */}
                <div className="mt-4">
                  <Link
                    to="/profile"
                    className="flex items-center w-full text-left p-2 rounded-lg hover:bg-gray-700 transition"
                    onClick={handleProfileClick}
                  >
                    <FaUserCircle size={20} className="mr-3" />
                    <span>Profile</span>
                  </Link>
                  <button
                    className="flex items-center w-full text-left p-2 rounded-lg mt-4 hover:bg-gray-700 transition"
                    onClick={logout}
                  >
                    <MdExitToApp size={20} className="mr-3" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        }
      </div>
      <div
        className={`flex md:hidden flex-col bg-black text-white pl-4 transition-all duration-300 ease-out`}
        style={{height:!isNavBarToggled ? '0px' :'202px'}}
      >
        {isNavBarToggled && (
          <>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-bold text-xl font-Poppins hover:cursor-pointer ${
                  isActive ? "text-white" : "text-gray-500 hover:text-white"
                }`
              }
              onClick={() => setIsNavBarToggled(false)} // Shrink menu when clicked
            >
              Home
            </NavLink>

            <NavLink
              to="/quizapp"
              className={({ isActive }) =>
                `font-bold text-xl font-Poppins hover:cursor-pointer ${
                  isActive ? "text-white" : "text-gray-500 hover:text-white"
                }`
              }
              onClick={() => setIsNavBarToggled(false)} // Shrink menu when clicked
            >
              Quiz
            </NavLink>

            <NavLink
              to="/chatbot"
              className={({ isActive }) =>
                `font-bold text-xl font-Poppins hover:cursor-pointer ${
                  isActive ? "text-white" : "text-gray-500 hover:text-white"
                }`
              }
              onClick={() => setIsNavBarToggled(false)} // Shrink menu when clicked
            >
              Chatbot
            </NavLink>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `font-bold text-xl font-Poppins hover:cursor-pointer ${
                  isActive ? "text-white" : "text-gray-500 hover:text-white"
                }`
              }
              onClick={() => setIsNavBarToggled(false)} // Shrink menu when clicked
            >
              Dashboard
            </NavLink>

            <NavLink
              to={`/message/all`}
              className={({ isActive }) =>
                `font-bold text-xl font-Poppins hover:cursor-pointer ${
                  isActive ? "text-white" : "text-gray-500 hover:text-white"
                }`
              }
              onClick={() => setIsNavBarToggled(false)} // Shrink menu when clicked
            >
              Message
            </NavLink>

              <NavLink
              to="/interview"
              className={({ isActive }) =>
                `font-bold text-xl font-Poppins hover:cursor-pointer ${
                  isActive ? "text-white" : "text-gray-500 hover:text-white"
                }`
              }
              onClick={() => setIsNavBarToggled(false)} // Shrink menu when clicked
            >
            InterviewAI
            </NavLink>

            <NavLink
              to="/mynetwork"
              className={({ isActive }) =>
                `font-bold text-xl font-Poppins hover:cursor-pointer ${
                  isActive ? "text-white" : "text-gray-500 hover:text-white"
                }`
              }
              onClick={() => setIsNavBarToggled(false)} // Shrink menu when clicked
            >
              My Network
            </NavLink>
          </>
        )}
      </div>
      <div className="justify-between bg-black justify-items-center text-white py-2 hidden md:flex">
        <Link to="/">
          <img className="px-4" src={logo} height={20} width={170} alt="Logo" />
        </Link>

        <div className="flex items-center justify-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `p-4 rounded-2xl font-bold text-2xl font-Poppins hover:cursor-pointer flex flex-col items-center justify-center ${
                isActive ? "text-white" : "text-zinc-400 hover:text-white"
              }`
            }
          >
            <AiFillHome size={30} /> {/* Home Icon */}
            <span className="text-sm text-zinc-400">Home</span>{" "}
            {/* Small gray text */}
          </NavLink>

          {/* Chatbot NavLink */}
          <NavLink
            to="/chatbot"
            className={({ isActive }) =>
              `p-4 rounded-2xl font-bold text-2xl font-Poppins hover:cursor-pointer flex flex-col items-center justify-center ${
                isActive ? "text-white" : "text-zinc-400 hover:text-white"
              }`
            }
          >
            <BsFillChatDotsFill size={30} /> {/* Chatbot Icon */}
            <span className="text-sm text-zinc-400">Chatbot</span>{" "}
            {/* Small gray text */}
          </NavLink>

          {/* Quiz NavLink */}
          <NavLink
            to="/quizapp"
            className={({ isActive }) =>
              `p-4 rounded-2xl font-bold text-2xl font-Poppins hover:cursor-pointer flex flex-col items-center justify-center ${
                isActive ? "text-white" : "text-zinc-400 hover:text-white"
              }`
            }
          >
            <MdQuiz size={30} /> {/* Quiz Icon */}
            <span className="text-sm text-zinc-400">Quiz</span>{" "}
            {/* Small gray text */}
          </NavLink>

      {userdata && <>
          <NavLink
            to={`/message/all`}
            className={({ isActive }) =>
              `p-4 rounded-2xl font-bold text-2xl font-Poppins hover:cursor-pointer flex flex-col items-center justify-center ${
                isActive ? "text-white" : "text-zinc-400 hover:text-white"
              }`
            }
          >
        <div className="relative inline-block">
            <IoMdMail size={30} />
            {unseenMessageCount> 0 &&
            <span className="absolute top-0 right-0 text-xs text-white rounded-full" style={{ backgroundColor: 'red',padding: '2px 6px',transform: 'translate(50%, -30%)',}}> {unseenMessageCount}
            </span>
           }
        </div>
            <span className="text-sm text-zinc-400">Message</span>{" "}
          </NavLink>

        
          <NavLink
            to="/mynetwork"
            className={({ isActive }) =>
              `p-4 rounded-2xl font-bold text-2xl font-Poppins hover:cursor-pointer flex flex-col items-center justify-center ${
                isActive ? "text-white" : "text-zinc-400 hover:text-white"
              }`
            }
          >
        <div className="relative inline-block">
            <FaUsers size={30} />
            {unseenNotificationCount>0 &&
            <span className="absolute top-0 right-0 text-xs text-white rounded-full" style={{ backgroundColor: 'red',padding: '2px 6px',transform: 'translate(50%, -30%)',}}> {unseenNotificationCount}
            </span>
            }
        </div>
            <span className="text-sm text-zinc-400">My Network</span>{" "}
          </NavLink>

          <NavLink
                to="/interview"
                className={({ isActive }) =>
                  `p-4 rounded-2xl font-bold text-2xl font-Poppins hover:cursor-pointer flex flex-col items-center justify-center ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                  }`
                }
              >
                <IoMdMicrophone size={30} />{" "}
                {/* Use the appropriate icon for Voice Interview */}
                <span className="text-sm text-zinc-400">
                  InterviewAI
                </span>{" "}
              </NavLink>

            <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `p-4 rounded-2xl font-bold text-2xl font-Poppins hover:cursor-pointer flex flex-col items-center justify-center ${
                isActive ? "text-white" : "text-zinc-400 hover:text-white"
              }`
            }
          >
            <MdDashboard size={30} />
            <span className="text-sm text-zinc-400">Dashboard</span>{" "}
          </NavLink>
          </>
      }
          {userdata &&
          <div className="flex items-center pr-5 relative">
            <img
              className="hidden md:flex ml-3 mr-4 w-11 h-11 rounded-full ring-2 ring-white"
              src={userdata && userdata.profileimg ? userdata.profileimg : user}
              alt="Profile"
              onClick={handleProfileClick} // Trigger the dropdown or popup on click
              style={{ cursor: "pointer" }} // Add a pointer cursor to indicate it's clickable
            />
            {isProfileDropdownVisible && (
              <div className="absolute top-10 mr-1 right-0  p-2 rounded z-50 mt-14">
                <div className="bg-black text-white w-64 p-6 rounded-lg relative">
                  {/* Close Button */}
                  <button
                    className="absolute top-4 right-4 text-gray-400 rounded-full p-2 hover:bg-gray-700 transition"
                    onClick={handleProfileClick}
                  >
                    <AiOutlineClose size={24} />
                  </button>

                  {/* Profile Icon and Greeting */}
                  <div className="flex flex-col items-center">
                    {userdata && userdata.profileimg ? (
                      <img
                        src={userdata.profileimg}
                        className=" ml-3 mr-4 w-14 h-14 rounded-full ring-4 ring-white"
                      />
                    ) : (
                      <FaUserCircle size={64} className="text-gray-400" />
                    )}
                    <h2 className="mt-4 text-xl font-semibold">
                      Hi, {userdata.name}
                    </h2>
                  </div>

                  {/* Profile and Sign Out Options */}
                  <div className="mt-4">
                    <Link
                      to="/profile"
                      className="flex items-center w-full text-left p-2 rounded-lg hover:bg-gray-700 transition"
                    >
                      <FaUserCircle size={20} className="mr-3" />
                      <span>Profile</span>
                    </Link>
                    <button
                      className="flex items-center w-full text-left p-2 rounded-lg mt-4 hover:bg-gray-700 transition"
                      onClick={logout}
                    >
                      <MdExitToApp size={20} className="mr-3" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          }
        </div>
      </div>
    </>
  );
}
