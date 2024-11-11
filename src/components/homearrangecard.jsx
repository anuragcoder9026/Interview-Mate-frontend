import React from "react";
import CustomCard from "./postcard"; // Adjust the path as necessary
import { useState ,useEffect} from 'react'
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { useUserContext } from "../context/usercontext";
function CardGrid() {
 const {posts}= useUserContext();
  return (
    <div className="bg-slate-200 p-2 sm:p-8">
      <div className="relative flex items-center pt-4">
        <h1 className="pl-2 sm:pl-4 md:pl-6 lg:pl-8 text-3xl sm:text-4xl font-serif font-semibold text-gray-800 mr-4">
          Blogs
        </h1>

        <hr className="border-t-2 border-gray-300 w-full sm:w-3/3" />
      </div>
      <div className="relative flex flex-wrap justify-center gap-3 pt-6 pb-6">
       {
        posts?.map((item,index)=><CustomCard post={item}/>)
       }
      </div>
      
    </div>
  );
}

export default CardGrid;
