import React, { useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';
import Sparkle from 'react-sparkle';
import user from "../assets/images/user.png";

function CustomCard() {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [liked,setLiked]=useState(false);
  const handleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success('Successfully Commented');
      setLoading(false);
      setShowCommentBox(false);
    }, 2000);
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleLikeClick = () => {
    setShowSparkle(true);
    setLiked(!liked);
    setTimeout(() => setShowSparkle(false), 2000); // Sparkle effect disappears after 2 seconds
  };

  return (
    <div className="relative w-96 border border-gray-300 rounded-lg shadow-lg p-4 bg-white">
      {/* Profile Header */}
      <div className="flex items-center w-full">
        <img className="w-12 h-12 rounded-full bg-gray-400 mr-3" src={user} alt="User" />
        <div className="flex p-2 flex-col w-full">
          <div className="flex justify-between">
            <h4 className="text-lg font-semibold">Anurag Singh</h4>
            <button
              className={`text-sm font-semibold ${isFollowing ? "text-gray-500" : "text-blue-500"}`}
              onClick={toggleFollow}
            >
              {isFollowing ? "Following" : "Follow +"}
            </button>
          </div>
          <p className="text-sm text-gray-600">4th year student at NIT Jalandhar</p>
        </div>
      </div>

      {/* Post Date */}
      <p className="text-sm text-gray-500 mt-3">posted on 18 aug 2024</p>

      {/* Image Section */}
      <div className="w-full h-48 bg-gray-400 mt-3 rounded-lg">
        <img className="h-full w-full" src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10" alt="" />
      </div>

      {/* Description Section */}
      <div className="mt-3">
        <p className="text-sm text-gray-800">
          🌱 <span className="font-semibold">Learning Experience:</span> Working on this project was an incredible journey of discovery and growth. I delved deep into full-stack development, learning how to integrate various technologies to create a cohesive and best........
          <span className="text-blue ml-1 cursor-pointer hover:underline">Read More</span>
        </p>
      </div>

      {/* Like and Comment Section */}
      <div className="flex justify-between items-center mt-3">
        <p className="text-sm text-gray-600">Liked by alok and 18 others</p>
        <p className="text-sm text-gray-600">18 comments</p>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-300">
        <button 
          className="relative flex items-center space-x-1 text-gray-600"
          onClick={handleLikeClick}
        >
          {showSparkle && liked &&  (
            <Sparkle 
              color="blue" 
              count={30} 
              minSize={7} 
              maxSize={12} 
              overflowPx={10} 
              fadeOutSpeed={15} 
            />
          )}
          <BiSolidLike className="text-2xl"  style={{color:`${liked?'blue':'grey'}`}}/>
          <span>Like</span>
        </button>
        <button 
          className="flex items-center space-x-1 text-gray-600 cursor-pointer"
          onClick={handleCommentBox}
        >
          <FaRegComment className="text-2xl"/>
          <span>Comment</span>
        </button>
      </div>

      {showCommentBox && (
        <div
          className={`absolute bottom-0 left-0 z-30 flex flex-col p-4 bg-gray-700 bg-opacity-95 rounded-b-lg w-full transform transition-transform duration-300 ease-in-out ${
            showCommentBox ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-white">Add a comment</p>
            <IoClose
              style={{ color: "white" }}
              className="text-2xl cursor-pointer"
              onClick={handleCommentBox}
            />
          </div>
          <textarea
            className="w-full p-2 my-2 text-gray-800 rounded-md resize-none focus:outline-none border-none"
            placeholder="Write a comment..."
          />
          <button
            className="self-end bg-blue-600 text-white p-2 rounded-md hover:bg-blue"
            type="button"
            onClick={handleSubmit}
          >
            {loading ? (
              <div> submitting....</div> 
            ) : (
              "Submit"
            )}
          </button>
        </div>
      )}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default CustomCard;
