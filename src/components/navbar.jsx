import React, {useState} from "react";
import { FaArrowDown, FaArrowUp, FaBars } from "react-icons/fa";
import logo from '../assets/images/logo.png'

export default function NavBar() {
  const [isNavBarToggled, setIsNavBarToggled] = useState(false);

  return (
    <>
      <div className="flex justify-between p-4 pl-2 pr-2  md:hidden bg-black text-white ">
        <FaBars
          className="size-6"
          onClick={() => setIsNavBarToggled(!isNavBarToggled)}
        ></FaBars>
        <div
          className="flex gap-1 items-center"
          onClick={() => setIsNavBarToggled(!isNavBarToggled)}
        >
          <h1>MENU</h1>
          {isNavBarToggled ? (
            <FaArrowUp className="size-5"></FaArrowUp>
          ) : (
            <FaArrowDown className="size-5"></FaArrowDown>
          )}
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
       <img  className="px-4 " src = {logo} height={10} width={170}/>
       

        <div className="flex items-center justify-center h-10 mt-3">
        <a
          href="#rules"
          className=" p-4 rounded-1xl place-items-center hover:bg-white hover:text-black hover:cursor-pointer font-bold text-2xl font-Poppins"
        >
          Home
        </a>
        <a
          href="#tracks"
          className="p-4 rounded-1xl hover:bg-white hover:text-black hover:cursor-pointer font-bold text-2xl font-Poppins"
        >
          Blog
        </a>
        <a
          href="#judges"
          className="p-4 rounded-1xl hover:bg-white hover:text-black hover:cursor-pointer font-bold text-2xl font-Poppins"
        >
          About
        </a>
        <a
          href="#faq"
          className="p-4 rounded-1xl hover:bg-white hover:text-black hover:cursor-pointer font-bold text-2xl font-Poppins"
        >
          Contact
        </a>
        </div>
      </div>
    </>
  );
}