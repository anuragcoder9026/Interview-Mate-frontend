import React, { useState ,useRef,useEffect} from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaRegComment,FaBookmark, FaShareAlt, FaLink, FaEyeSlash, FaUserSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs"; // Three dots icon
import toast, { Toaster } from "react-hot-toast";
import Sparkle from "react-sparkle";
import user from "../assets/images/user.png";
import { Link } from "react-router-dom";

function CustomCard({ url }) {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // State for showing the popup menu

  const handleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Comment submitted successfully!");
      setLoading(false);
      setShowCommentBox(false);
    }, 2000);
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleLikeClick = () => {
    setShowSparkle(true);
    setLiked(!liked);
    setTimeout(() => setShowSparkle(false), 2000);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu); // Toggle the menu visibility
  };
  const popupRef = useRef(null); 

  // Function to close the popup if clicked outside
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowMenu(false); // Close the popup
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleInput = (e) => {
    e.target.style.height = 'auto'; // Reset height to auto first
    e.target.style.height = `${e.target.scrollHeight}px`; // Set the height to its scrollHeight
  };
  return (
    <div className="relative w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <div className="flex justify-between p-2 px-4 border-b border-gray-300">
         <div className="flex">
              <img src={user} alt="" className="w-5 h-5 rounded-full"/>
              <span style={{fontSize:"13px",marginLeft:"8px"}}>Anurag singh Liked this</span> 
         </div>
          <BsThreeDots className="text-2xl hover:cursor-pointer" onClick={toggleMenu}/>
      </div>
      {/* Profile Header */}
      <div className="flex p-4 border-b border-gray-200">
        <img className="w-14 h-14 rounded-full mr-4" src={user} alt="User" />
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <h4 className="flex items-center text-lg font-semibold">
              Anurag Singh
            </h4>
            <button
              className={`ml-auto text-sm font-bold mr-1 sm:mr-2 ${
                isFollowing ? "text-gray-500" : "text-blue"
              }`}
              onClick={toggleFollow}
            >
              {isFollowing ? "Following" : "Follow +"}
            </button>

          </div>
          <p className="text-sm text-gray-600">
            4th year student at NIT Jalandhar
          </p>
        </div>
      </div>

      {/* Post Date */}
      <p className="text-sm text-gray-500 px-4 py-2">Posted on 18 Aug 2024</p>

      {/* Image Section */}
      <div className="w-full bg-gray-100">
        <img className="w-full h-40 sm:h-96 object-cover" src={url} alt="Post" />
      </div>

      {/* Description Section */}
      <div className="px-4 py-3">
        <p className="text-base text-gray-800">
          🌱 <span className="font-semibold">Learning Experience:</span> Working
          on this project was an incredible journey of discovery and growth. I
          delved deep into full-stack development, learning how to integrate
          various technologies to create a cohesive and best...
          <Link
            to={`/post`}
            className="text-blue ml-1 cursor-pointer hover:underline"
            onClick={() => window.scrollTo(0, 0)}
          >
            Read More
          </Link>
        </p>
      </div>

      {/* Like and Comment Section */}
      <div className="flex justify-between items-center px-4 py-2 border-t border-gray-200">
        <Link to={`/post`} className="text-sm text-gray-600 cursor-pointer hover:text-sky-500">
          Liked by alok and 18 others
        </Link>
        <Link to={`/post`} className="text-sm text-gray-600 cursor-pointer hover:text-sky-500">
          18 comments
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center px-4 py-2 border-t border-gray-200 bg-gray-50">
        <div className="flex">
          <button
            className="flex items-center text-gray-600 hover:text-blue"
            onClick={handleLikeClick}
          >
            {showSparkle && liked && (
              <Sparkle
                color="blue"
                count={30}
                minSize={7}
                maxSize={12}
                overflowPx={10}
                fadeOutSpeed={15}
              />
            )}
            <BiSolidLike
              className="text-2xl"
              style={{ color: `${liked ? "blue" : "grey"}` }}
            />
          </button>
          <span className="ml-2">Like</span>
        </div>
        <button
          className="flex items-center text-gray-600 hover:text-blue"
          onClick={handleCommentBox}
        >
          <FaRegComment className="text-xl" />
          <span className="ml-2">Comment</span>
        </button>
      </div>

      {/* Comment Box */}
      {showCommentBox && (
        <div className="w-full bg-white border-t border-gray-200 shadow-lg p-2">
          <div className="w-full border border-gray-300 bg-gray-100 p-2" style={{ borderRadius: '20px' }}>
      <textarea
        className="w-full px-3 py-1 resize-none focus:outline-none bg-gray-100"
        rows="1"
        placeholder="Write a comment..."
        onInput={handleInput} // Add onInput handler
        style={{ overflow: 'hidden', height: 'auto' }} // Ensure no scrollbar is shown
      />
      <div className="flex justify-end items-center mt-0 gap-2">
        {loading ? (
          <div role="status" className="flex items-center justify-center">
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-gray-200 animate-spin fill-blue"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 43.9971 10.1075C47.9447 9.46289 52.0084 9.42229 55.9868 10.0028C60.9606 10.7362 65.7193 12.5736 70.0066 15.3922C74.2938 18.2109 78.027 21.9514 80.9518 26.4295C83.3896 30.0409 85.2606 34.028 86.4296 38.2227C87.1346 40.5837 89.5423 41.9122 91.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <>
          <button
            className="px-5 py-1 text-white bg-gray-400 hover:bg-gray-500 rounded-full focus:outline-none"
            onClick={handleCommentBox}>Cancel</button> 
          <button
            className="px-5 py-1 text-white bg-blue rounded-full focus:outline-none"
            onClick={handleSubmit}>Submit</button>
          </>
        )}
      </div>
    </div>


         
        </div>
      )}

      {/* Popup menu */}
      {showMenu && (
        <div className="absolute right-2 top-16 bg-white shadow-lg border border-gray-200 rounded-lg py-2 w-[95%] sm:w-[350px] h-[300px] z-50 text-gray-600"
        ref={popupRef}
        >
        <ul>
          <li className="px-4 py-4 hover:bg-gray-100 cursor-pointer flex items-center">
            <FaBookmark className="mr-4" />
            Save
          </li>
          <li className="px-4 py-4 hover:bg-gray-100 cursor-pointer flex items-center">
            <FaShareAlt className="mr-4" />
            Share
          </li>
          <li className="px-4 py-4 hover:bg-gray-100 cursor-pointer flex items-center">
            <FaLink className="mr-4" />
            Copy link to post
          </li>
          <li className="px-4 py-4 hover:bg-gray-100 cursor-pointer flex items-center">
            <FaEyeSlash className="mr-4" /> 
            Not interested
          </li>
          <li className="px-4 py-4 hover:bg-gray-100 cursor-pointer flex items-center">
            <FaUserSlash className="mr-4" /> 
            Unfollow
          </li>
        </ul>
      </div>
      )}

      <Toaster />
    </div>
  );
}

export default CustomCard;
