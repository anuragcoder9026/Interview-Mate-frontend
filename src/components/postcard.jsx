import React, { useState ,useRef,useEffect} from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaRegComment,FaBookmark, FaShareAlt, FaLink, FaEyeSlash, FaUserSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs"; // Three dots icon
import toast, { Toaster } from "react-hot-toast";
import Sparkle from "react-sparkle";
import user from "../assets/images/user.png";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "../context/usercontext";
import axios from "axios"
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { userFollowingAction } from "../store/userFollowing";
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebookF,FaCircle } from "react-icons/fa";
import {BACKEND_URL} from "../../url"
function CustomCard({ post }) {
  const dispatch=useDispatch();
  const userFollowing = useSelector(store => store.userFollowing);

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [yourPost,setYourPost]=useState(false);
  const [showMenu, setShowMenu] = useState(false); 
  const {userdata,OnlineStatus} = useUserContext();
 
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const shortenString = str => str.length > 530 ? str.slice(0, 530) + "...   " : str;
  const handleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };

  const toggleFollow = async () => {
    if(isFollowing)dispatch(userFollowingAction.handleDeleteFollowing(post?.postUser?._id));
    else dispatch(userFollowingAction.handleAddUserFollowing(post?.postUser?._id));
    setIsFollowing(!isFollowing);
    try {
      const jsonFormData = JSON.stringify({username:post?.postUser?.username,follow:isFollowing?"Following":"Follow"});  
      const res = await axios.post(`${BACKEND_URL}/api/users/follow`, jsonFormData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
    } catch (error) {
        console.log(error);
    }
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
    let follow=userFollowing?.includes(post?.postUser?._id);
    setIsFollowing(follow);
    setYourPost(userdata?._id === post?.postUser?._id);
    let isLiked=false;
    post?.likes?.forEach((item,index)=>{
      if(item._id==userdata?._id){
        isLiked=true;
        return;
      }
    });
    setLiked(isLiked); 
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const [comment,setComment]=useState();
  const [commentCount,setCommentCount]=useState(post?.comments.length);
  const [likesCount,setLikesCount]=useState(post?.likes.length);
  const handleInput = (e) => {
    e.target.style.height = 'auto'; // Reset height to auto first
    e.target.style.height = `${e.target.scrollHeight}px`; // Set the height to its scrollHeight
  };
  
  const handleLikeClick = async() => {
    setLikesCount((likesCount)=>liked ?likesCount-1 : likesCount+1);
    setLiked((liked)=>!liked);

    try {
      const res = await axios.get(`${BACKEND_URL}/api/posts/set-like`, {
        params: {postId:post?._id},
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true 
      });
      console.log(res);
    } catch (error) {
      console.log(error);
      
    }
  };

  const handleSubmit =async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/posts/set-comment`,{comment}, {
        params: {postId:post?._id},
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true 
      });
      toast.success("Comment submitted successfully!");
      setCommentCount((commentCount)=>commentCount+1);
      setLoading(false);
      setShowCommentBox(false);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
      setLoading(false);
      setShowCommentBox(false);
    }
  };

  const handleSavePost = async() =>{
    try {
      const jsonData = JSON.stringify({postId:post?._id,save:'Save'});  
      const res = await axios.post(`${BACKEND_URL}/api/posts/save-post`,jsonData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true 
      });
      toast.success("Post Saved successfully!");
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  }

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
    copyToClipboard(`http://localhost:5173/Interview-Mate-frontend/post/${post?._id}`);
    toast.success("post linked copied.")
  }
  const location=useLocation();
  const handleWhatsappClick = () => {
    const message = `Check this post on Interview Mate: https://localhost:5173/Interview-Mate-frontend/post/${post?._id}`;
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
};

  const handleFacebookClick = () => {
    const message = `Check this post on Interview Mate: https://localhost:5173/Interview-Mate-frontend/post/${post?._id}`;
    const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(message)}`;
    window.open(facebookURL, '_blank');
  };

  const [isShareVisible, setIsShareVisible] = useState(false);

  const handleShareClick = () => {
    setIsShareVisible(!isShareVisible);
  };
  return (
    <div className="relative w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      {userdata &&<div className="flex justify-between p-2 px-4 border-b border-gray-300">
         <div className="flex">
              {post?.likes?.length>0 ? <img src={post?.likes[0].profileimg || user}  className="w-5 h-5 rounded-full"/> : <span></span>}
              <span style={{fontSize:"13px",marginLeft:"8px"}}>{post?.likes?.length>0 ? `${post?.likes[0].name} Liked This` : '' }</span> 
         </div>
          {userdata && <BsThreeDots className="text-2xl hover:cursor-pointer" onClick={toggleMenu}/>}
      </div>
}
      {/* Profile Header */}
      <div className="flex p-2 sm:p-4 border-b gap-2 border-gray-200">
        <div className="flex flex-col " style={{position:"relative"}}>
        <img className="w-14 h-14 rounded-full mr-4" src={post?.postUser?.profileimg || user} alt="User" />{
          (OnlineStatus[post?.postUser?._id] || post.postUser._id===userdata?._id ) &&
          <span className="absolute bottom-[12px] right-[2px] sm:bottom-[8px] sm:right-[6px] lg:bottom-[2px] lg:right-[9px] bg-white p-0.5 rounded-full " >
            <FaCircle className="w-3 h-3 bg-white p-0.5" style={{color:"white",border:"3px solid green",borderRadius:"50%"}}/>
          </span>  
        }
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <Link to={`/${post?.postUser?.username}`}>
            <h4 className="flex items-center text-lg font-semibold">
             {post?.postUser?.name}
            </h4>
            </Link>
            {userdata && !yourPost &&
            <button
              className={`ml-auto text-sm font-bold mr-1 sm:mr-2 ${
                isFollowing ? "text-gray-500" : "text-blue"
              }`}
              onClick={toggleFollow}
            >
              {isFollowing ? "Following" : "Follow +"}
            </button>
           }
          </div>
          <p className="text-sm text-gray-600">
            {post?.postUser?.intro?.tagline}
          </p>
        </div>
      </div>

      {/* Post Date */}
      <p className="text-sm text-gray-500 px-4 py-2">Posted on {formatDate(post?.date)}</p>

      {/* Image Section */}
      {
        post?.postImage && <div className="w-full bg-gray-100">
        <img className="w-full h-auto sm:h-96 object-contain" src={post?.postImage} alt="Post" />
      </div>
      }

      {/* Description Section */}
      <div className="px-4 py-3">
        <p className="text-base text-gray-800">
        <div className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: shortenString(post?.content)}}
        />
          <Link
            to={`/post/${post?._id}`}
            className="text-blue ml-1 cursor-pointer hover:underline"
            onClick={() => window.scrollTo(0, 0)}
          >
            Read More
          </Link>
        </p>
      </div>

      {/* Like and Comment Section */}
      <div className="flex justify-between items-center px-4 py-2 border-t border-gray-200">
        <Link to={`/post/${post?._id}`} className="text-sm text-gray-600 cursor-pointer hover:text-sky-500">
          {/* Liked by alok and 18 others */}
          Liked by {likesCount} People
        </Link>
        <Link to={`/post/${post?._id}`} className="text-sm text-gray-600 cursor-pointer hover:text-sky-500">
          {commentCount} comments
        </Link>
      </div>

      {/* Action Buttons */}
      {userdata && <div className="flex justify-between items-center px-4 py-2 border-t border-gray-200 bg-gray-50">
        <div className="flex">
          <button
            className="flex items-center text-gray-600 hover:text-blue"
            onClick={handleLikeClick}
          >
            <BiSolidLike className="text-2xl"
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
        }
      {/* Comment Box */}
      {showCommentBox && (
        <div className="w-full bg-white border-t border-gray-200 shadow-lg p-2">
          <div className="w-full border border-gray-300 bg-gray-100 p-2" style={{ borderRadius: '20px' }}>
      <textarea
        className="w-full px-3 py-1 resize-none focus:outline-none bg-gray-100"
        rows="1"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onInput={handleInput} // Add onInput handler
        style={{ overflow: 'hidden', height: 'auto' }} // Ensure no scrollbar is shown
      />
      <div className="flex justify-end items-center mt-0 gap-2">
        {loading ? (
          <div className="w-8 h-8 border-4 border-blue border-t-transparent rounded-full animate-spin mr-2 mt-1"></div>
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
      {showMenu &&
        <div className="absolute right-2 top-16 bg-white shadow-lg border border-gray-200 rounded-lg py-2 w-[95%] sm:w-[350px] z-50 text-gray-600"
        ref={popupRef}
        >
        <ul>
          <li className="px-4 py-4 hover:bg-gray-300 cursor-pointer flex items-center" onClick={handleSavePost}>
            <FaBookmark className="mr-4" />
            Save
          </li>
          <li className="px-4 py-4 hover:bg-gray-300 cursor-pointer flex items-center"
           onClick={handleShareClick}>
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
          {!yourPost && <>
          <li className="px-4 py-4 hover:bg-gray-300 cursor-pointer flex items-center">
            <FaEyeSlash className="mr-4" /> 
            Not interested
          </li>
          <li className="px-4 py-4 hover:bg-gray-300 cursor-pointer flex items-center" onClick={toggleFollow}>
            {isFollowing ?<FaUserSlash className="mr-4" /> :<FaUser className="mr-4"/>}
            {isFollowing ? 'Unfollow' : 'Follow'}
          </li>
          </>
        }
        </ul>
      </div>
      }

      <Toaster />
    </div>
  );
}

export default CustomCard;
