import React from "react";
import CustomCard from "./postcard"; // Adjust the path as necessary
import user from "../assets/images/user.png";
import ProfileBg from "../assets/images/college_bg.jpg";
import { FiUserPlus } from 'react-icons/fi';
import { useState } from "react";
function NetworkGrid() {
    const [grow,setGrow]=useState(true);
    
  return (
    <div className="p-1 sm:p-3 sm:pt-0">
      {/* Top section with Grow and Catch up buttons */}
      <div className="bg-white border p-6 rounded-lg border-gray-300 pb-0">
        <div className="flex">
          <button
            className="px-4 py-2 text-sm font-medium "
            style={{ borderBottom:grow? "2px solid green":"none", color: grow?"green":"gray" }}
            onClick={()=>setGrow(true)}
          >
            Grow
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 border-b-2"
          style={{ borderBottom:!grow? "2px solid green":"none",color: !grow?"green":"gray" }}
          onClick={()=>setGrow(false)}
          >
            Catch up
          </button>
        </div>
      </div>

      {/* Invitations Section */}
      <div className="mt-4">
        <div className="bg-white border rounded-lg border-gray-300">
          <div className="flex justify-between px-4 py-3 items-center mb-4 border-b">
            <h4 className="text-gray">Invitations</h4>
            <button className="text-sm font-semibold">Manage</button>
          </div>

          {/* Invitation Card */}
          <div className="flex flex-col sm:flex-row items-center justify-between border rounded-lg p-4 mb-6 mx-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Newsletter • Monthly</p>
                <p className="text-sm font-medium">
                  Microsoft invited you to subscribe to The Monthly Tech-In
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end mt-4 sm:mt-0">
              <button className="text-sm text-gray-500 font-semibold mr-4">
                Ignore
              </button>
              <button className="px-5 py-1 text-blue border-2 font-semibold border-blue rounded-full focus:outline-none">
                Accept
              </button>
            </div>
          </div>
        </div>

        {/* People You May Know Section */}
        <div className="mt-4 p-4 bg-white border rounded-lg border-gray-300">
          <h4 className="text-gray-600  mb-2">
            People you may know from Dr B R Ambedkar National Institute of Technology, Jalandhar
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="border rounded-lg  relative">
                <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Profile Background Image */}
                <div className="relative w-full">
                  <div
                    style={{
                      backgroundImage: `url(${ProfileBg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "4rem", // Equal to h-24
                    }}
                    className="w-full rounded-t-lg"
                  ></div>

                  {/* Profile Picture */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                    <img
                      src={user}
                      alt="Profile"
                      className="w-20 h-20 rounded-full border-4 border-white"
                    />
                  </div>
                </div>

                {/* Profile Info */}
                <h3 className="text-sm font-medium text-center mt-12 mb-1">
                  Anurag Singh
                </h3>
                <p className="text-xs text-gray-500 text-center mb-2">
                  Student 
                </p>
                <div className="flex items-center justify-center mb-2 px-2 gap-2">
                  
                  <img
                      src={user}
                      alt="Profile"
                      className="w-6 h-6 rounded-full border border-white"
                    />
                  
                  <span className="text-xs text-gray-500">
                    Alok Kumar 23 mutual connections
                  </span>
                </div>
                <div className="flex justify-center my-4 w-full">
                    <div className="flex w-[80%]  justify-center py-1 text-blue border-2 font-semibold border-blue rounded-full ">
                      <FiUserPlus className="mt-1 mr-3"/>
                      <button className="focus:outline-none"> Connect</button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* See All Button */}
        <div className="text-center mt-4">
          <button className="text-sm text-blue-500 font-medium">
            See all
          </button>
        </div>
      </div>
    </div>
  );
}

export default NetworkGrid;
