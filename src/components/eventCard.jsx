'use client'
import React, { useState, useEffect,useRef } from 'react'
import { FaUser, FaCalendar, FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa'
import { FaRegComment,FaBookmark, FaShareAlt, FaLink, FaEyeSlash, FaUserSlash } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import user from "../assets/images/user.png";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/usercontext';
import {BACKEND_URL} from "../../url";
import socket from "../../socket";
const EventCard = ({event,saveStae,onUnSave}) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isEventStarted, setIsEventStarted] = useState(event?.status==='live')
  const {userdata}=useUserContext();
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
  copyToClipboard(`http://localhost:5173/Interview-Mate-frontend/post/${event?._id}`);
  toast.success("post linked copied.")
}
 const handleWhatsappClick = () => {
  const message = `Check this post on Interview Mate: https://localhost:5173/Interview-Mate-frontend/post/${event?._id}`;
  const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');
};

const handleFacebookClick = () => {
  const message = `Check this post on Interview Mate: https://localhost:5173/Interview-Mate-frontend/post/${event?._id}`;
  const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(message)}`;
  window.open(facebookURL, '_blank');
};


const [isShareVisible, setIsShareVisible] = useState(false);

const handleShareClick = () => {
  setIsShareVisible(!isShareVisible);
};


const handleSaveEvent = async() =>{
  try {
    const jsonData = JSON.stringify({eventId:event?._id,save:saveStae});  
    const res = await axios.post(`${BACKEND_URL}/api/event/save-event`,jsonData, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true 
    });
    toast.success( `Event ${saveStae}d successfully!`);
    if(saveStae==='Unsave')onUnSave(event?._id);
  } catch (error) {
    toast.error("Something Went Wrong!");
  }
}
const [timeDiffNeg,setTimeDiffNeg]=useState(false);
useEffect(()=>{
  const difference = new Date(event?.time).getTime() - new Date().getTime();
  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)
    setTimeLeft({ days, hours, minutes, seconds })
  }
  else{
    setTimeDiffNeg(true);
  }
},[])

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const eventTime = new Date(event?.time).getTime()
      const difference = eventTime - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeDiffNeg(true)
        clearInterval(timer)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, []) 

  const CountdownUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  )
  const navigate=useNavigate();
  const handleJoinNow=()=>{
    if(event?.status!=='scheduled' && timeDiffNeg){
      //socket.emit('joinEvent', { eventId:event?._id, userId: userdata?._id});
      navigate(`/event-chat/${event?._id}`)
     }
  }

  const handleLiveNow=()=>{
     if(timeDiffNeg){
      //socket.emit('liveEvent', { eventId:event?._id, userId: userdata?._id});
      navigate(`/event-chat/${event?._id}`)
     }
  }

  

  return (
    <div className="relative w-full overflow-hidden bg-white rounded-lg border border-gray-300 shadow-lg">
      
      <div className="h-3 bg-gradient-to-r from-purple to-pink" />
      <div className="flex items-center gap-4 p-4 pb-2 gap-2">
        <div className="relative w-12 h-12">
          <img
            src={event?.eventAdmin?.profileimg || user}
            alt={event?.eventAdmin?.name}
            className="w-10 h-10 rounded-full mr-3"
          />
        </div>
        <div className="w-[90%]">
          <h2 className="text-xl font-bold">{event?.title}</h2>
          <p className="text-sm text-gray-600">Hosted by {event?.eventAdmin?.name}</p>
        </div>
          <span className="hover:bg-gray-300 p-2 rounded-full " onClick={toggleMenu}>
            <BsThreeDots className="text-2xl hover:cursor-pointer " />
            </span>
      </div>
      <div className="px-4 py-2">
        <p className="mb-4 text-sm text-gray-600">{event?.detail}</p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <FaCalendar className="text-blue-500" />
            <time dateTime={event?.time} className="text-gray-600">
              {new Date(event?.time).toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' })}
            </time>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaMapMarkerAlt className="text-red-500" />
            <span className="text-gray-600">Online - Interview Mate</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaUsers className="text-yellow-500" />
            <span className="text-gray-600">{event?.interested?.length} People intrested</span>
          </div>
        </div>
        {!timeDiffNeg &&
        <div className="bg-gray-200 rounded-lg p-4 ">
          <h3 className="text-center text-sm font-semibold mb-2">
            Time Remaining
          </h3>
         
            <div className="flex justify-between">
              <CountdownUnit value={timeLeft.days} label="Days" />
              <CountdownUnit value={timeLeft.hours} label="Hours" />
              <CountdownUnit value={timeLeft.minutes} label="Minutes" />
              <CountdownUnit value={timeLeft.seconds} label="Seconds" />
            </div>
        
        </div>
        }
      </div>
      {event?.eventAdmin?._id === userdata?._id  && 
        <div className="bg-gray-50 px-4 py-3">
          <button className="w-full py-2 px-4 bg-gradient-to-r from-purple to-pink text-white font-semibold rounded-md  hover:from-pink hover:to-purple transition-all duration-300" onClick={handleLiveNow}>
            {event?.status==='live' ? "Live" : event?.status==='ended' ? 'event has ended' : timeDiffNeg ? "Go live" : "Yet to start"}
          </button>
        </div>
      }

      {event?.eventAdmin?._id !== userdata?._id  &&         
      <div className="bg-gray-50 px-4 py-3">
        <button className="w-full py-2 px-4 bg-gradient-to-r from-purple to-pink text-white font-semibold rounded-md  hover:from-pink hover:to-purple transition-all duration-300" onClick={handleJoinNow}>
          {event?.status==='live' ? "Join Now" : event?.status==='ended' ? 'event has ended' : timeDiffNeg ? "Starting Soon" : "Set Reminder"}
        </button>
      </div>
      }


      {showMenu &&
        <div className="absolute right-2 top-16 bg-white shadow-lg border border-gray-200 rounded-lg py-2 w-[95%] sm:w-[250px] z-50 text-gray-600"
        ref={popupRef}
        >
        <ul>
          {saveStae &&
          <li className="px-4 py-4 hover:bg-gray-300 cursor-pointer flex items-center" onClick={handleSaveEvent}>
            <FaBookmark className="mr-4" />
            {saveStae}
          </li>
          }
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
  )
}

export default EventCard;
