import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import user from "../assets/images/user.png";
import SearchBar from "./searbar";
import LoginPopup from "./sigin";
import { Link } from "react-router-dom";
export default function NavBar() {
  const [isNavBarToggled, setIsNavBarToggled] = useState(false);
  const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false);

  const handleProfileClick = () => {
    setIsLoginPopupVisible(true); // Show the login popup when the profile image is clicked
  };

  const handleClosePopup = () => {
    setIsLoginPopupVisible(false); // Close the login popup
  };

  return (
    <>
      <div className="flex justify-between p-4 pl-2 pr-2 md:hidden bg-black text-white">
        <FaBars
          className="pl-2 mt-2 size-8"
          onClick={() => setIsNavBarToggled(!isNavBarToggled)}
        />

        <div className="flex justify-center px-2 sm:px-5 py-2">
          <SearchBar />
        </div>

        <div className="flex items-center pr-5">
          <a id="brand" className="flex items-center">
            <img
              className="flex mr-1 w-10 h-10 p-0 rounded-full ring-2 ring-white"
              src={user}
              alt="Profile"
              onClick={handleProfileClick} // Trigger the popup on click
              style={{ cursor: "pointer" }} // Add a pointer cursor to indicate it's clickable
            />
          </a>
        </div>
      </div>

      <div
        className={`flex md:hidden flex-col bg-black text-white pl-3.5 transition-all duration-300 ease-out ${
          !isNavBarToggled ? "h-0 opacity-0 " : "h-52 opacity-100"
        }`}
      >
        <a href="#about" className="font-bold text-lg font-Poppins">
          HOME
        </a>
        <a href="#schedule" className="font-bold text-lg font-Poppins">
          DASHBOARD
        </a>
        <a href="#prizes" className="font-bold text-lg font-Poppins">
          ABOUT
        </a>
        <a href="#rules" className="font-bold text-lg font-Poppins">
          CONTACT
        </a>
        <a href="#tracks" className="font-bold text-lg font-Poppins">
          AI
        </a>
        <a href="#judges" className="font-bold text-lg font-Poppins">
          NOTES
        </a>
        <a href="#faq" className="font-bold text-lg font-Poppins">
          FAQ
        </a>
      </div>

      <div className="justify-between bg-black justify-items-center text-white py-2 hidden md:flex">
        <img className="px-4" src={logo} height={20} width={170} alt="Logo" />

        <div className="flex align-items-center justify-content-center">
        <Link to="/" className="p-4 rounded-2xl hover:bg-white hover:text-black hover:cursor-pointer font-bold text-2xl font-Poppins">Home</Link>

        <Link to="" className="p-4 rounded-2xl hover:bg-white hover:text-black hover:cursor-pointer font-bold text-2xl font-Poppins">Blog</Link>

        <Link to="/dashboard" className="p-4 rounded-2xl hover:bg-white hover:text-black hover:cursor-pointer font-bold text-2xl font-Poppins">Dashboard</Link>

        <Link to="" className="p-4 rounded-2xl hover:bg-white hover:text-black hover:cursor-pointer font-bold text-2xl font-Poppins">Contact</Link>

          <div className="flex items-center pr-5">
            <img
              className="hidden md:flex ml-3 mr-4 w-11 h-11 rounded-full ring-2 ring-white"
              src={user}
              alt="Profile"
              onClick={handleProfileClick} // Trigger the popup on click
              style={{ cursor: "pointer" }} // Add a pointer cursor to indicate it's clickable
            />
          </div>
        </div>
      </div>

      {isLoginPopupVisible && <LoginPopup onClose={handleClosePopup} />} {/* Conditionally render the login popup */}
    </>
  );
}
