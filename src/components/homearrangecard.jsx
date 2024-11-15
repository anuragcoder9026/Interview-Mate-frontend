import React from "react";
import CustomCard from "./postcard"; // Adjust the path as necessary
import { useState ,useEffect} from 'react'
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { useUserContext } from "../context/usercontext";
import EventCard from "./eventCard";
function CardGrid() {
 const {posts,events}= useUserContext();
 const [state,SetState]=useState('blogs');
 const handleState=(data)=>{
   SetState(data);
 }
  return (
    <div className="bg-slate-200 p-2 sm:p-8">
      <div className="relative flex items-center pt-4">
        <h1 className={`p-2 px-3 cursor-pointer text-3xl sm:text-4xl font-serif font-semibold text-gray-800 mr-4 ${state === 'blogs' && 'bg-white'}`} onClick={()=>handleState('blogs')}>
          Blogs
        </h1>

        <hr className="border-t-2 border-gray-300 w-full sm:w-3/3" />
        
        <h1 className={`p-2 px-3 text-3xl cursor-pointer sm:text-4xl font-serif font-semibold text-gray-800 ml-4 ${state === 'events' && 'bg-white'}`} onClick={()=>handleState('events')}>
          Events
        </h1>
      </div>
      <div className="relative flex flex-wrap justify-center gap-3 pt-6 pb-6">
       {
        state === 'blogs' && 
        posts?.map((item,index)=><CustomCard post={item}/>)
       }
       {
        state === 'events' && 
        events?.map((item,index)=><EventCard event={item} saveStae="Save"/>)
       }
      </div>
      
    </div>
  );
}

export default CardGrid;
