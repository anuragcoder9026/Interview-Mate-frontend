import React, { useState,useEffect } from 'react';
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import React-Quill styles
import { MdClose, MdPostAdd } from 'react-icons/md'; // Modern icons
import { FaImage, FaCalendarAlt, FaPen } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import user from "../assets/images/user.png";
import { useUserContext } from "../context/usercontext"; // Import the context
import axios from "axios"
import { SiGooglegemini } from "react-icons/si";
import { GenerateAiPost } from './getAiPost';
import ClockTimePicker from './clockTime';
import {BACKEND_URL} from "../../url"
const CreatePost = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  const [postContent, setPostContent] = useState('');
  const [title,setTitle]=useState('');
  const [isEventPopupOpen, setIsEventPopupOpen] = useState(false);
  const [isImage,setIsImage]=useState(false);
  const [aiPost,setAiPost]=useState('');
  const handleIsImage=()=>{
    setPostImage({ url: null, name: '' });
    setImageFile(null); 
    setIsImage(false);
  }

  const { userdata } = useUserContext(); // Access the userdata here

  const handleClosePopup = () => {
    setTitle(null);
    setPostImage({ url: null, name: '' });
    setImageFile(null); 
    setIsImage(false);
    setIsPopupOpen(false);
    setPostContent(''); // Clear content when closing
  };

  const handlePost = async() => {
    const postData={postId:defaultPost ? defaultPost._id :null, title:title,content:postContent,postImage:imageFile ?imageFile : defaultPost? defaultPost.postImage : null,imageExistType:imageFile?1:defaultPost?.postImage ? 2 : 3};
    console.log(postData);
    setIsPostLoading(true); 
    try {
      const res = await axios.post(`${BACKEND_URL}/api/posts/publish-post`, postData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          },
          withCredentials: true // Include this line to allow cookies
      });
      console.log(res);
      if(res.status===200){
        toast.success('Post created successfully!');
        setIsPostLoading(false); 
      }
     } catch (error) {
      setIsPostLoading(false); 
      toast.error('something went wrong');
      console.log(error);
     }
     handleClosePopup(); 
  };



  const [postImage, setPostImage] = useState({ url: null, name: '' });
  const [defaultPost,setDefaultPost]=useState(null);
  const [imageFile,setImageFile]=useState(null);

  const handleMediaChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
          const name = file.name;
              if (postImage.url) URL.revokeObjectURL(postImage.url); 
              setPostImage({ url, name });
              setIsImage(true);
              setImageFile(file);
      }
  };    
  const [isLoading,setIsLoading]=useState(false);
  const [isPostLoading,setIsPostLoading]=useState(false);
  const [isEventLoading,setIsEventLoading]=useState(false);
  const handleAiPost=async()=>{
    setIsLoading(true); 
    const res=await GenerateAiPost(aiPost);
    setPostContent(res);
    setIsLoading(false); 
    setIsPopupOpen(true)
  }
  const [eventDate,setEventDate]=useState(new Date().toISOString().split('T')[0]);
  const [eventTitle,setEventTitle]=useState('');
  const [eventDetails,setEventDetails]=useState('');
  const [time, setTime] = useState(dayjs(new Date().toISOString().split('T')[0])); 

  const handleDate=(e)=>{
    setEventDate(e.target.value);
    setTime(dayjs(e.target.value))
  }
  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };

  const handleEventPopupOpen = () => {
    setIsEventPopupOpen(true);
  };

  const handleEventPopupClose = () => {
    setIsEventPopupOpen(false);
  };
  const handleEventSubmit = async() => {
    setIsEventLoading(true); 
    const eventData = JSON.stringify({title:eventTitle,detail:eventDetails,time:time.format('YYYY-MM-DDTHH:mm:ss.SSSZ')});  
    console.log(eventData);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/event/create-event`, eventData, {
          headers: {
              'Content-Type': 'application/json'
          },
          withCredentials: true // Include this line to allow cookies
      });
      console.log(res);
      if(res.status===200){
        toast.success('Event created successfully!');
        setIsEventLoading(false); 
      }
     } catch (error) {
      toast.error('something went wrong');
      setIsEventLoading(false); 
      console.log(error);
     }
     handleClosePopup(); 
  };
  return (
    <>
      <Toaster />
      <div className="relative flex flex-col items-center w-full p-4 bg-slate-200 rounded-lg shadow-lg">
        <div
          className="flex items-center w-full p-3 bg-gray-100 rounded-full"
         
        >
          <img
            className="w-10 h-10 rounded-full"
            src={userdata && userdata.profileimg ? userdata.profileimg :user}
            alt="Profile"
          />
          <input
            type="text"
            placeholder="Start a post, try writing with AI"
            className="flex-grow p-1 ml-1 sm:p-2 sm:ml-3 bg-transparent outline-none text-xs sm:text-sm"
            value={aiPost}
            onChange={(e) => setAiPost(e.target.value)} 
          />
          <span className="hover:bg-gray-300 hover:cursor-pointer p-2 pr-1 rounded-full" onClick={handleAiPost}>
          {isLoading ? <div className="w-8 h-8 border-4 border-blue border-t-transparent rounded-full animate-spin mr-2 mt-1"></div>:<SiGooglegemini className="text-blue text-1xl sm:text-2xl  mr-1"/>}
          </span>
        </div>

        <div className="flex justify-around w-full mt-3">
          <button className="flex items-center" onClick={handleOpenPopup}>
            <FaImage className="w-5 h-5 text-blue-600 text-xs" />
            <span className="ml-2 hidden sm:flex">Media</span>
          </button>
          <button className="flex items-center" onClick={handleEventPopupOpen}>
            <FaCalendarAlt className="w-5 h-5 text-yellow-600 text-xs" />
            <span className="ml-2 hidden sm:flex">Event</span>
          </button>
          <button className="flex items-center" onClick={handleOpenPopup}>
            <FaPen className="w-5 h-5 text-red-600 text-xs" />
            <span className="ml-2 hidden sm:flex">Write article</span>
          </button>
        </div>

        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
            <div className="relative w-full m-2 max-w-md sm:max-w-lg md:max-w-3xl p-1 sm:p-4 bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-scroll">
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
                <textarea class="w-full text-3xl outline-none resize-none p-2 bg-transparent" rows="1"
                placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
                {isImage &&
               <div class="relative inline-block ">
                     <img 
                     src={postImage?.url}
                     alt="Image with close icon"
                     class="w-full h-auto object-contain"
                   />
                   <button 
                     className="text-white bg-black bg-opacity-80 rounded-full p-1 px-2.5"
                     style={{position:"absolute",top:"-16px",right:"-14px"}} 
                     onClick={handleIsImage}
                     aria-label="Close"
                   >
                     ✕
                   </button>
                 </div>
               }
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
                  {isPostLoading ? <div className="w-8 h-8 border-4 border-blue border-t-transparent rounded-full animate-spin mr-2 mt-1"></div>:  <button
                    className="px-4 py-2 text-white bg-blue rounded-full text-sm md:text-base flex items-center"
                    onClick={handlePost}
                  >
                    <MdPostAdd className="inline w-4 h-4 mr-1" />
                    Post
                  </button>}
                
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
                  <p className="mt-2 mb-4 text-sm text-slate-600">
                    Share your upcoming event with others.
                  </p>
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Event Title"
                    className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                    value={eventTitle}
                    onChange={(e)=>setEventTitle(e.target.value)}
                    required
                  />
                  <input
                    type="date"
                    className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                    value={eventDate}
                    onChange={handleDate}
                    required
                  />
                  <div className="mb-2">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoItem>
          <MobileTimePicker 
            value={time} 
            onChange={handleTimeChange} 
            required
          />
        </DemoItem>
      </LocalizationProvider>
    </div>
                  <textarea
                    placeholder="Event Details"
                    className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                    rows="4"
                    value={eventDetails}
                    onChange={(e)=>setEventDetails(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-end space-x-4">
                {isEventLoading ? <div className="w-8 h-8 border-4 border-blue border-t-transparent rounded-full animate-spin mr-2 mt-1"></div>:   <button
                   type='submit'
                    className="px-4 py-2 text-white bg-blue rounded-full text-sm md:text-base flex items-center"
                    onClick={handleEventSubmit}
                  >
                    Create Event
                  </button>}
                

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


