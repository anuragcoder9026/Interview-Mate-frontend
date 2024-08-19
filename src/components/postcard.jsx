import React, { useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaRegComment, FaShareAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';

function CustomCard() {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

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

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  return (
    <div className="relative w-96">
      <div
        className={`relative flex flex-col text-black bg-custom shadow-md border border-none bg-clip-border rounded-xl p-2 sm:p-4 sm:pt-5 transition-all duration-300 ${
          showCommentBox ? "z-10 opacity-80" : "z-20 opacity-100"
        }`}
      >
        <div className="relative h-56 mx-2 sm:mx-4 mt-1 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
          <img
            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
            alt="card-image"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-3 sm:p-6">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            UI/UX Review Check
          </h5>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main nightlife in Barcelona
            <span className="pl-2 text-blue">Read more..</span>
          </p>
        </div>
        <div className="flex pr-0 p-4 sm:p-6 pt-0 justify-between items-center">
          <div className="flex items-center">
            <BiSolidLike className="text-2xl sm:text-3xl mx-3" />
            <p className="mt-1">238</p>
          </div>
          <div className="flex items-center">
            <FaRegComment
              className="text-1xl sm:text-2xl mt-1 cursor-pointer"
              onClick={handleCommentBox}
            />
          </div>
          <div
            className="p-4 cursor-pointer text-gray-700 hover:text-gray-900"
            onClick={toggleShareOptions}
          >
            <FaShareAlt className="text-xl" />
          </div>
        </div>
      </div>

      {/* Comment Box */}
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
            className="self-end bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            type="button"
            onClick={handleSubmit}
          >
            {loading ? (
              <div>Submitting....</div> 
            ) : (
              "Submit"
            )}
          </button>
        </div>
      )}

      {/* Share Options Slider */}
      {showShareOptions && (
        <div
          className="absolute right-0 top-full mt-2 p-4 bg-white border rounded-lg shadow-lg flex flex-col items-start space-y-2 z-40"
        >
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            <FaShareAlt className="text-xl mr-2" /> Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
            <FaShareAlt className="text-xl mr-2" /> Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
            <FaShareAlt className="text-xl mr-2" /> Instagram
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
            <FaShareAlt className="text-xl mr-2" /> LinkedIn
          </a>
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
