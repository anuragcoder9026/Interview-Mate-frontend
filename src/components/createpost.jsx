import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import React-Quill styles
import { MdClose, MdPostAdd } from 'react-icons/md'; // Modern icons
import { FaImage, FaCalendarAlt, FaPen } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import user from "../assets/images/user.png";

const CreatePost = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [postContent, setPostContent] = useState('');

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPostContent(''); // Clear content when closing
  };

  const handlePost = () => {
    // Add your post handling logic here
    toast.success('Post created successfully!');
    handleClosePopup(); // Close the popup after posting
  };

  return (
    <>
      <Toaster />
      <div className="relative flex flex-col items-center w-full p-4 bg-slate-200 rounded-lg shadow-lg">
        <div
          className="flex items-center w-full p-3 bg-gray-100 rounded-full cursor-pointer"
          onClick={handleOpenPopup}
        >
          <img
            className="w-10 h-10 rounded-full"
            src={user} // Replace with your profile image URL
            alt="Profile"
          />
          <input
            type="text"
            placeholder="Start a post, try writing with AI"
            className="flex-grow p-2 ml-3 bg-transparent outline-none cursor-pointer"
            readOnly
          />
        </div>

        <div className="flex justify-around w-full mt-3">
          <button className="flex items-center">
            <FaImage className="w-5 h-5 text-blue-600" />
            <span className="ml-2">Media</span>
          </button>
          <button className="flex items-center">
            <FaCalendarAlt className="w-5 h-5 text-yellow-600" />
            <span className="ml-2">Event</span>
          </button>
          <button className="flex items-center">
            <FaPen className="w-5 h-5 text-red-600" />
            <span className="ml-2">Write article</span>
          </button>
        </div>

        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative w-full max-w-md sm:max-w-lg md:max-w-3xl p-4 bg-white rounded-lg shadow-lg">
              <button
                className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full p-2"
                onClick={handleClosePopup}
              >
                <MdClose className="w-6 h-6" />
                <span className="sr-only">Close popup</span>
              </button>
              <div className="p-5">
                <div className="text-center">
                  <p className="mb-3 text-2xl font-semibold text-slate-900">
                    Create a Post 
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Share your thoughts with others.
                  </p>
                </div>
                <ReactQuill
                  value={postContent}
                  onChange={setPostContent}
                  className="w-full h-64 mt-4"
                  placeholder="What's on your mind?"
                />
                <div className="flex justify-end mt-12 space-x-4 ">
                  <button
                    className="px-4 py-2 text-white bg-blue rounded-full text-sm md:text-base flex items-center"
                    onClick={handlePost}
                  >
                    <MdPostAdd className="inline w-4 h-4 mr-1" />
                    Post
                  </button>
                  <button
                    className="px-4 py-2 text-gray-500 bg-gray-200 rounded-full text-sm md:text-base"
                    onClick={handleClosePopup}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreatePost;
