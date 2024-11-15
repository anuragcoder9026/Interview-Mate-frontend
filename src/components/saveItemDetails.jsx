import React, { useEffect,useState } from 'react';
import { FaRegComment,FaBookmark, FaShareAlt, FaLink, FaEyeSlash, FaUserSlash } from "react-icons/fa";
import user from "../assets/images/user.png"
import { BsThreeDots } from "react-icons/bs";
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { timeAgo } from '../utils/dateAgo';
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios"
import {BACKEND_URL} from "../../url"
const  SavedItemDetails = ({savedPost,onUnSave}) => {
  const [showMenu, setShowMenu] = useState(false); 
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const popupRef = useRef(null);
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowMenu(false); 
    }
  };
 useEffect(()=>{
  document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
 },[]);
 const shortenString = str => str.length > 330 ? str.slice(0, 330) + "...   " : str;
 function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
      .then(() => {
          console.log('Text copied to clipboard:', text);
      })
      .catch(err => {
          console.error('Failed to copy text: ', err);
      });
}
 const handleCopylink = async ()=>{
  copyToClipboard(`http://localhost:5173/Interview-Mate-frontend/post/${savedPost?._id}`);
  toast.success("post linked copied.")
}
 const handleWhatsappClick = () => {
  const message = `Check this post on Interview Mate: https://localhost:5173/Interview-Mate-frontend/post/${savedPost?._id}`;
  const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');
};

const handleFacebookClick = () => {
  const message = `Check this post on Interview Mate: https://localhost:5173/Interview-Mate-frontend/post/${savedPost?._id}`;
  const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(message)}`;
  window.open(facebookURL, '_blank');
};

const [isShareVisible, setIsShareVisible] = useState(false);

const handleShareClick = () => {
  setIsShareVisible(!isShareVisible);
};

const handleSavePost = async() =>{
  try {
    const jsonData = JSON.stringify({postId:savedPost?._id,save:'Unsave'});  
    const res = await axios.post(`${BACKEND_URL}/api/posts/save-post`,jsonData, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true 
    });
    toast.success("Post UnSaved successfully!");
    onUnSave(savedPost?._id);
  } catch (error) {
    toast.error("Something Went Wrong!");
  }
}
  return (
    <div className="relative w-full p-4 bg-white border border-gray-300 rounded-lg shadow-md mb-2">
        <div className="flex mb-4">
        <img
          src={savedPost?.postUser?.profileimg ? savedPost.postUser.profileimg :user} // replace with actual profile picture URL
          alt="Profile"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div className="w-[90%]">
          <div className="flex justify-between items-center">
            <Link to={`/${savedPost?.postUser?.username}`} className="font-semibold">{savedPost?.postUser?.name}</Link>
            <span className="hover:bg-gray-300 p-2 rounded-full mr-4 sm:mr-0" onClick={toggleMenu}>
            <BsThreeDots className="text-2xl hover:cursor-pointer " />
            </span>
          </div>
          <p className="text-gray-500" style={{fontSize:"13px"}}>{savedPost?.postUser?.tagline}</p>
          <p className="text-sm text-gray-600 max-w-xl  overflow-hidden text-ellipsis whitespace-nowrap">{savedPost?.postUser?.headline}</p>
          <p className="text-gray-500 text-xs">{timeAgo(savedPost?.date)} • <span>🌍</span></p>
        </div>
        </div>
     
      <Link to={`/post/${savedPost?._id}`} className="flex flex-col">
      <div className="flex">
        {savedPost?.postImage &&
             <img src={savedPost?.postImage} className="w-14 h-14 md:w-24 md:h-24 mr-3 rounded-lg"/>} 
        <div className="text-gray-700 "
          dangerouslySetInnerHTML={{ __html: shortenString(savedPost?.content)}}
        />
      </div>
        <p className="flex justify-end"><Link to={`/post/${savedPost?._id}`} className="hover:text-blue hover:cursor-pointer">...see More</Link></p>
    
      </Link>
      
      {showMenu &&
        <div className="absolute right-2 top-16 bg-white shadow-lg border border-gray-200 rounded-lg py-2 w-[95%] sm:w-[250px] z-50 text-gray-600"
        ref={popupRef}
        >
        <ul>
          <li className="px-4 py-4 hover:bg-gray-300 cursor-pointer flex items-center" onClick={handleSavePost}>
            <FaBookmark className="mr-4" />
            Unsave
          </li>
          <li className="px-4 py-4 hover:bg-gray-300 cursor-pointer flex items-center" onClick={handleShareClick}>
            <FaShareAlt className="mr-4" />
            Share
          </li>
          <li>
          {isShareVisible && (
        <div className="px-4 py-2 bg-gray-100 text-black flex flex-col rounded-md space-y-2">
          <button 
            className="flex items-center hover:bg-gray-200 px-2 py-2 rounded" 
            onClick={handleWhatsappClick}
          >
            <BsWhatsapp className="mr-4 " style={{color:"green"}}/>
            WhatsApp
          </button>
          <button 
            className="flex items-center hover:bg-gray-200 px-2 py-2 rounded" 
            onClick={handleFacebookClick}
          >
            <FaFacebookF className="mr-4" style={{color:"blue"}}/>
            Facebook
          </button>
        </div>
      )}
          </li>
          <li className="px-4 py-4 hover:bg-gray-300 cursor-pointer flex items-center" onClick={handleCopylink}>
            <FaLink className="mr-4" />
            Copy link to post
          </li>
         
          <li className="px-4 py-4 hover:bg-gray-300 cursor-pointer flex items-center">
            <FaEyeSlash className="mr-4" /> 
            Not interested
          </li>
        </ul>
      </div>
      }
        <Toaster/>
    </div>
  );
}

export default SavedItemDetails;
