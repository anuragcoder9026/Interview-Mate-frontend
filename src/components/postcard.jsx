import React, { useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

import toast, { Toaster } from 'react-hot-toast';
function CustomCard() {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [loading, setLoading] = useState(false);

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

  return (

     <div className="relative flex flex-col mt-6 text-white bg-gray-800 shadow-md border border-gray-400 bg-clip-border rounded-xl w-96 p-5">

      <div className="relative h-56 mx-4 mt-1 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40  ">
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"
          alt="card-image"
          className=" object-cover w-full h-full"
        />
      </div>
      <div className="p-6">
        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          UI/UX Review Check
        </h5>
        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
          The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main nightlife in Barcelona.
        </p>
      </div>
      <div className="p-6 pt-0">
        <button
          className=""
          type="button"
        >
          Read More
        </button>
      </div>
    </div>
  );
}

export default CustomCard;
