import React from "react";

function CustomCard() {
 

  return (
    <div className="relative w-96">
      <div
        className={`relative flex flex-col text-white bg-gray-800 shadow-md border border-gray-400 bg-clip-border rounded-xl p-2 sm:p-4 sm:pt-5 transition-all duration-300 ${
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
        <div className=" p-3 sm:p-6">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            UI/UX Review Check
          </h5>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main nightlife in Barcelona
          </p>
        </div>
        <div className="flex pr-0 p-4 sm:p-6 pt-0 justify-between">
          <div className="flex items-center justify-center">
            <button className="bg-blue p-2 py-1 sm:p-2 sm:px-3 " type="button">
              Read More
            </button>
            <BiSolidLike className="text-2xl sm:text-3xl mx-3" />
            <p className="mt-1">238</p>
          </div>
          <div className="flex items-center float-left mr-3">
            <FaRegComment
              className="text-1xl sm:text-2xl mt-1 cursor-pointer"
              onClick={handleCommentBox}
            />
          </div>
        </div>
     

}

export default CustomCard;
