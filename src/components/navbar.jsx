import React, {useState} from "react";
import { FaArrowDown, FaArrowUp, FaBars } from "react-icons/fa";
import logo from '../assets/images/logo.png'
import SearchBar from "./searbar";

export default function NavBar() {
  const [isNavBarToggled, setIsNavBarToggled] = useState(false);

  return (
    <>
      <div className="flex justify-between p-4 pl-2 pr-2  md:hidden bg-black text-white ">
        <FaBars
          className="size-6"
          onClick={() => setIsNavBarToggled(!isNavBarToggled)}
        ></FaBars>
        <div className="flex  justify-center px-5 py-2">
       <SearchBar/>
       </div>
        <div
          className="flex gap-1 items-center"
          onClick={() => setIsNavBarToggled(!isNavBarToggled)}
        >
        </div>
       </div>
      <div
        className={`flex md:hidden flex-col bg-black text-white pl-3.5 transition-all duration-300 ease-out ${
          !isNavBarToggled ? "h-0" : "h-52"
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
      <div className="justify-between bg-black justify-items-center text-white  py-2 hidden md:flex ">
       <img  className="px-4 " src = {logo} height={20} width={170}/>
       
       

        <div className="flex align-items-center justify-content-center">
        <a
          href="#rules"
          className=" p-4 rounded-2xl place-items-center hover:bg-white hover:text-black hover:cursor-pointer font-bold text-2xl font-Poppins"
        >
          Home
        </a>
        <a
          href="#tracks"
          className="p-4 rounded-2xl hover:bg-white hover:text-black hover:cursor-pointer font-bold text-2xl font-Poppins"
        >
          Blog
        </a>
        <a
          href="#judges"
          className="p-4 rounded-2xl hover:bg-white hover:text-black hover:cursor-pointer font-bold text-2xl font-Poppins"
        >
          About
        </a>
        <a
          href="#faq"
          className="p-4 rounded-2xl hover:bg-white hover:text-black hover:cursor-pointer font-bold text-2xl font-Poppins"
        >
          Contact
        </a>
        </div>
      </div>
    </>
  );
}