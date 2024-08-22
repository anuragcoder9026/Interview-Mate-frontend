import React, { useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';
import Sparkle from 'react-sparkle';
import user from "../assets/images/user.png";
import { Link } from "react-router-dom";

function CustomCard({ url }) {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success('Comment submitted successfully!');
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
    setTimeout(() => setShowSparkle(false), 2000);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      {/* Profile Header */}
      <div className="flex p-4 border-b border-gray-200">
        <img className="w-14 h-14 rounded-full mr-4" src={user} alt="User" />
      <div className="flex flex-col w-full">
        <div className="flex  justify-between">
          <h4 className="flex items-center text-lg font-semibold">Anurag Singh</h4>
        <button
          className={`ml-auto text-sm font-semibold mr-1 sm:mr-2 ${isFollowing ? "text-gray-500" : "text-blue-500"}`}
          onClick={toggleFollow}
        >
          {isFollowing ? "Following" : "Follow +"}
        </button>
        </div>
          <p className="text-sm text-gray-600">4th year student at NIT Jalandhar</p>
        </div>
      </div>

      {/* Post Date */}
      <p className="text-sm text-gray-500 px-4 py-2">Posted on 18 Aug 2024</p>

      {/* Image Section */}
      <div className="w-full bg-gray-100">
        <img className="w-full h-32 sm:h-96 object-cover" src={url} alt="Post" />
      </div>
      
      {/* Description Section */}
      <div className="px-4 py-3">
        <p className="text-base text-gray-800">
          🌱 <span className="font-semibold">Learning Experience:</span> Working on this project was an incredible journey of discovery and growth. I delved deep into full-stack development, learning how to integrate various technologies to create a cohesive and best...
          <Link to={`/post`} className="text-blue ml-1 cursor-pointer hover:underline">
            Read More
          </Link>
        </p>
      </div>

      {/* Like and Comment Section */}
      <div className="flex justify-between items-center px-4 py-2 border-t border-gray-200">
        <p className="text-sm text-gray-600">Liked by alok and 18 others</p>
        <p className="text-sm text-gray-600">18 comments</p>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-between items-center px-4 py-2 border-t border-gray-200 bg-gray-50">
        <button 
          className="flex items-center text-gray-600 hover:text-blue"
          onClick={handleLikeClick}
        >
          {showSparkle && liked && (
            <Sparkle 
              color="blue" 
              count={30} 
              minSize={7} 
              maxSize={12} 
              overflowPx={10} 
              fadeOutSpeed={15} 
            />
          )}
          <BiSolidLike className="text-2xl" style={{ color: `${liked ? 'blue' : 'grey'}` }} />
          <span className="ml-2">Like</span>
        </button>
        <button 
          className="flex items-center text-gray-600 hover:text-blue"
          onClick={handleCommentBox}
        >
          <FaRegComment className="text-xl" />
          <span className="ml-2">Comment</span>
        </button>
      </div>

      {/* Comment Box */}
      {showCommentBox && (
        <div
          className="absolute bottom-0 left-0 z-10 w-full bg-white border-t border-gray-200 shadow-lg p-4"
        >
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">Add a comment</p>
            <IoClose
              className="text-2xl cursor-pointer"
              onClick={handleCommentBox}
            />
          </div>
          <textarea
            className="w-full p-2 my-2 border rounded-md resize-none focus:outline-none"
            placeholder="Write a comment..."
          />
          <button
            className="self-end bg-blue text-white p-2 rounded-md hover:bg-blue-700"
            type="button"
            onClick={handleSubmit}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default CustomCard;
