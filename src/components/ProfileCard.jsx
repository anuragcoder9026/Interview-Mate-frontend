import React, { useState } from "react";
import { FaBookmark } from "react-icons/fa"; // Import the bookmark icon
import ProfileBg from "../assets/images/college_bg.jpg";
import user from "../assets/images/user.png";
import { MdOutlineKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

const ProfileCard = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div style={{ position: 'sticky', top: '10px' }}>
    <div className="w-full lg:w-[300px] rounded-lg overflow-hidden shadow-lg bg-white border border-gray-300">
      {/* Profile Background Image */}
      <div className="relative w-full">
        {/* The background image inside a container with fixed height */}
        <div
          style={{
            backgroundImage: `url(${ProfileBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "6rem", // Equal to h-24
          }}
          className="w-full"
        ></div>
        {/* Profile Picture */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <img
            src={user} // Profile picture URL here
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white"
          />
        </div>
      </div>

      <div className="pt-14 pb-4 text-center">
        {/* Profile Name */}
        <h2 className="text-xl font-semibold"><Link to={"/profile"}> ANURAG SINGH </Link></h2>
        {/* Profile Description */}
        {/* <p className="text-gray-600 text-sm mt-1 px-5">
          Student at NIT Jalandhar | NITJ CSE 26 |
          Full stack Web Development | DSA
          Leetcode | Python | C | C++ | Java |
          Rajbhasa Club | #web #dsa #mern #sde
        </p> */}
        <Link
      to="./profile"
      className="text-gray-600 text-sm mt-1 px-5 block"
    >
      Student at NIT Jalandhar | NITJ CSE 26 |
      Full stack Web Development | DSA
      Leetcode | Python | C | C++ | Java |
      Rajbhasa Club | #web #dsa #mern #sde
    </Link>
      </div>

      {/* Content visible on small devices only */}
      <div className="lg:hidden">
        {showMore && (
          <>
            <div className="border-t border-b border-gray-200 px-5 mb-2">
              <div className="flex justify-between px-4 py-2">
                <div>
                  <span className="text-gray-600 text-sm">Profile viewers</span>
                  <p className="text-blue-500 font-semibold">60</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Post impressions</span>
                  <p className="text-blue-500 font-semibold">18</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-300 py-2 text-center border-t border-gray-200 mx-2 mb-3">
              <button className="bg-slate-300 hover:bg-slate-400 text-black font-bold text-sm py-2 px-3 rounded-full">
                Try Premium for ₹0
              </button>
            </div>

            <div className="border-t border-gray-200 py-3 px-5 flex items-center space-x-2">
              <FaBookmark className="text-gray-500 text-xl" />
              <span className="text-gray-700 font-semibold">Saved Items</span>
            </div>
          </>
        )}
      </div>

      {/* Content visible on large devices only */}
      <div className="hidden lg:block">
        <div className="border-t border-b border-gray-200 px-5 mb-2">
          <div className="flex justify-between px-4 py-2">
            <div>
              <span className="text-gray-600 text-sm">Profile viewers</span>
              <p className="text-blue-500 font-semibold">60</p>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Post impressions</span>
              <p className="text-blue-500 font-semibold">18</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-300 py-2 text-center border-t border-gray-200 mx-2 mb-3">
          <button className="bg-slate-300 hover:bg-slate-400 text-black font-bold text-sm py-2 px-3 rounded-full">
            Try Premium for ₹0
          </button>
        </div>

        <div className="border-t border-gray-200 py-3 px-5 flex items-center space-x-2">
          <FaBookmark className="text-gray-500 text-xl" />
          <span className="text-gray-700 font-semibold">Saved Items</span>
        </div>
      </div>
    </div>
    <div className="flex lg:hidden justify-center items-center mt-2 text-gray-800" onClick={() => setShowMore(!showMore)}>
          <span>{showMore ? 'Show Less' : 'Show More'}</span>
          {showMore ? <MdOutlineKeyboardArrowUp className="text-2xl mt-1" /> : <MdKeyboardArrowDown className="text-2xl mt-1" />}
        </div>
    </div>
  );
};

export default ProfileCard;
