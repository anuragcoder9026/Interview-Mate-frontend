import React, {useState} from "react";
import { FaArrowDown, FaArrowUp, FaBars } from "react-icons/fa";

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
      <div className="px-5 justify-between bg-white justify-items-center text-black p-2 hidden md:flex">
      <h1 className="text-black font-bold text-4xl font-Poppins"> Interview Mate</h1>
       

        <div>
        <a
          href="#rules"
          className="p-4 rounded-2xl hover:bg-white hover:text-black hover:cursor-pointer font-bold text-2xl font-Poppins"
        >
          HOME
        </a>
        <a
          href="#tracks"
          className="p-4 rounded-2xl hover:bg-white hover:text-black hover:cursor-pointer font-bold text-2xl font-Poppins"
        >
          BLOG
        </a>
        <a
          href="#judges"
          className="p-4 rounded-2xl hover:bg-white hover:text-black hover:cursor-pointer font-bold text-2xl font-Poppins"
        >
          ABOUT
        </a>
        <a
          href="#faq"
          className="p-4 rounded-2xl hover:bg-white hover:text-black hover:cursor-pointer font-bold text-2xl font-Poppins"
        >
          CONTACT
        </a>
        </div>
      </div>
    </>
  );
}