import React, { useEffect } from 'react';
import MenageNetworkCard from "../components/ManageNetworkCard";
import NetworkGrid from './NetworkGrid';
import { useState } from "react";
import { FaUserFriends, FaAddressBook, FaUsers, FaUsersCog, FaCalendarAlt, FaFileAlt, FaNewspaper, FaHashtag } from "react-icons/fa"; // Import icons from react-icons
import { IoIosArrowUp,IoIosArrowDown } from "react-icons/io";
import user from "../assets/images/user.png";
import ProfileBg from "../assets/images/college_bg.jpg";
import { FiUserPlus } from 'react-icons/fi';
import SavedItemDetails from './saveItemDetails';
import {BACKEND_URL} from "../../url"
import axios from "axios";
import EventCard from './eventCard';
const SavedItems = () => {
    const [state,setState]=useState('post');
    const [savedPosts,setSavedPosts]=useState();
    const [savedEvents,setSavedEvents]=useState();
    const handleDeleteSavedPost = (id) => {
        const updatedSavedPosts = savedPosts.filter(savedPost => savedPost._id !== id);
        setSavedPosts(updatedSavedPosts);
    };
    const handleDeleteSavedEvent = (id) => {
      const updatedSavedEvents = savedEvents.filter(savedEvent => savedEvent._id !== id);
      setSavedEvents(updatedSavedEvents);
  };
    useEffect(()=>{
        getAllSavedPosts();
        getAllSavedEvents();
    },[]);
 
    const getAllSavedEvents = async () =>{
        try {
         const response = await axios.get(`${BACKEND_URL}/api/event/get-all-savedevent`, {
           withCredentials: true,
         });
        setSavedEvents(response.data);
        } catch (error) {
         console.log(error);
        }
     }

     const getAllSavedPosts = async () =>{
      try {
       const response = await axios.get(`${BACKEND_URL}/api/posts/get-all-savedpost`, {
         withCredentials: true,
       });
       setSavedPosts(response.data.savedPosts);
      } catch (error) {
       console.log(error);
      }
   }

  return (
    <div className="bg-gray-100 flex justify-center px-0 pt-4 min-h-[60vh]">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl lg:space-x-1 space-y-4 lg:space-y-0">
        <div className="lg:flex-shrink-0 px-2" >
        <div style={{ position: 'sticky', top: '10px' }} className="sm:mb-12">
      <div className="w-full lg:w-[300px] rounded-lg overflow-hidden  bg-white border border-gray-300">
        <aside className="w-full bg-white rounded-lg py-3 flex flex-col">
          <h2 className="text-lg font-semibold border-b-2  px-4 pb-2">My Items</h2>
          <div className="flex justify-between py-2 px-3 mb-2 border-b-2 border-b-gray" style={{borderLeft:"5px solid blue"}}>
          <p className="text-blue hover:underline cursor-pointer" onClick={()=>setState('post')}>Saved Post and Article</p><span>{savedPosts?.length}</span></div>
          <div className="flex justify-between py-2 px-3 border-b-2 border-t-2 " style={{borderLeft:"5px solid blue",}}>
           <p className="text-blue hover:underline cursor-pointer" onClick={()=>setState('event')}>Saved Events </p><span>{savedEvents?.length}</span> </div>
        </aside>
      </div>
      </div>
        </div>


        <div className="flex-grow flex flex-col space-y-4 px-0">
          <div className="px-1 sm:px-1">
          <div className="p-1 sm:p-3 sm:pt-0">
      <div className="bg-white border p-4 rounded-lg border-gray-300" >
        {state==='post' && <div className="flex text-2xl">Saved Posts</div>}
        {state==='event' && <div className="flex text-2xl ml-1">Saved Events</div>}
      </div>

      <div className="mt-4">
             {state==='post' &&
        <div className="mt-4 p-1 py-3 bg-white border rounded-lg border-gray-300">
           {savedPosts?.length>0 ? <div className="flex flex-col">
         {savedPosts?.map((savedPost)=><SavedItemDetails savedPost={savedPost} onUnSave={handleDeleteSavedPost}/>)}    
          </div> : <h1 className="text-4xl p-5">No Saved Posts</h1>} 
        </div>
             }

             { state==='event' && 
               <div className="mt-4 p-3 py-3 bg-white border rounded-lg border-gray-300">
                {savedEvents?.length>0 ? <div className="flex flex-col gap-4">
                {savedEvents?.map((item,index)=><EventCard event={item} saveStae="Unsave" onUnSave={handleDeleteSavedEvent}/>)}</div> : <h1 className="text-4xl p-5">No Saved Events</h1>} 
              </div>
             }

      </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedItems;
