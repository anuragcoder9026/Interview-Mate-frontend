import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import React-Quill styles
import { MdClose, MdPostAdd } from 'react-icons/md'; // Modern icons
import { FaImage, FaCalendarAlt, FaPen } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import user from "../assets/images/user.png";
import { useUserContext } from "../context/usercontext"; // Import the context

const CreatePost = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [isEventPopupOpen, setIsEventPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const { userdata } = useUserContext(); // Access the userdata here

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPostContent(''); // Clear content when closing
    setMediaFile(null); // Clear media file when closing
  };

  const handlePost = () => {
    // Add your post handling logic here
    toast.success('Post created successfully!');
    handleClosePopup(); // Close the popup after posting
  };

  const handleMediaChange = (event) => {
    setMediaFile(event.target.files[0]);
  };

  const handleEventPopupOpen = () => {
    setIsEventPopupOpen(true);
  };

  const handleEventPopupClose = () => {
    setIsEventPopupOpen(false);
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
            src={userdata && userdata.profileimg ? userdata.profileimg :user}
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
          <button className="flex items-center" onClick={handleOpenPopup}>
            <FaImage className="w-5 h-5 text-blue-600" />
            <span className="ml-2">Media</span>
          </button>
          <button className="flex items-center" onClick={handleEventPopupOpen}>
            <FaCalendarAlt className="w-5 h-5 text-yellow-600" />
            <span className="ml-2">Event</span>
          </button>
          <button className="flex items-center" onClick={handleOpenPopup}>
            <FaPen className="w-5 h-5 text-red-600" />
            <span className="ml-2">Write article</span>
          </button>
        </div>

        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative w-full m-2 max-w-md sm:max-w-lg md:max-w-3xl p-1 sm:p-4 bg-white rounded-lg shadow-lg">
              <button
                className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full p-2"
                onClick={handleClosePopup}
              >
                <MdClose className="w-6 h-6" />
                <span className="sr-only">Close popup</span>
              </button>
              <div className="p-1 sm:p-5">
                <div className="text-center">
                  <p className="mb-3 text-2xl font-semibold text-slate-900">
                    Create a Post
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Share your thoughts with others.
                  </p>
                </div>
                <div className="flex p-0.5 mb-20 sm:mb-12">
                  <ReactQuill
                    value={postContent}
                    onChange={setPostContent}
                    className="w-full h-64 mt-4"
                    placeholder="What's on your mind?"
                  />
                </div>
                <div className="flex items-center mb-2 justify-end space-x-4">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleMediaChange}
                    className="hidden"
                    id="media-upload"
                  />
                  <label
                    htmlFor="media-upload"
                    className="px-4 py-2 text-white bg-black rounded-full text-sm md:text-base flex items-center cursor-pointer"
                  >
                    <FaImage className="inline w-4 h-4 mr-1" />
                    Media
                  </label>
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

        {isEventPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative w-full m-2 max-w-md sm:max-w-lg md:max-w-3xl p-1 sm:p-4 bg-white rounded-lg shadow-lg">
              <button
                className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full p-2"
                onClick={handleEventPopupClose}
              >
                <MdClose className="w-6 h-6" />
                <span className="sr-only">Close popup</span>
              </button>
              <div className="p-1 sm:p-5">
                <div className="text-center">
                  <p className="mb-3 text-2xl font-semibold text-slate-900">
                    Create an Event
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Share your upcoming event with others.
                  </p>
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Event Title"
                    className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="date"
                    className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                  />
                  <textarea
                    placeholder="Event Details"
                    className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                    rows="4"
                  />
                </div>
                <div className="flex items-center justify-end space-x-4">
                  <button
                    className="px-4 py-2 text-white bg-blue rounded-full text-sm md:text-base flex items-center"
                    onClick={handleEventPopupClose}
                  >
                    Create Event
                  </button>
                  <button
                    className="px-4 py-2 text-gray-500 bg-gray-200 rounded-full text-sm md:text-base"
                    onClick={handleEventPopupClose}
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


