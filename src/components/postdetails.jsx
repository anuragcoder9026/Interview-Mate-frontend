import React, { useEffect, useState } from 'react';
import { FaComment } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { BiSolidLike } from 'react-icons/bi';
import user from '../assets/images/user.png'; // Path to user image
import { IoClose } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';
import { useUserContext } from '../context/usercontext';
import axios from "axios"
import { timeAgo } from '../utils/dateAgo';
import { useDispatch, useSelector } from 'react-redux';
import { userFollowingAction } from "../store/userFollowing";
import toast, { Toaster } from "react-hot-toast";
import {BACKEND_URL} from "../../url"
const PostDetail = () => {
  const dispatch=useDispatch();
  const userFollowing = useSelector(store => store.userFollowing);

  const {postId}=useParams();
  const [yourPost,setYourPost]=useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState();
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [post,setPost]=useState();
  const {userdata} = useUserContext();
  const [likesCount,setLikesCount]=useState();
  const [commentCount,setCommentCount]=useState();

 const settingFollowLiked=()=>{
  let follow=userFollowing?.includes(post?.postUser?._id);
    setIsFollowing(follow);
    let isLiked=false;
    post?.likes?.forEach((item,index)=>{
      if(item._id==userdata?._id){
        isLiked=true;
        return;
      }
    });
    setLiked(isLiked); 
 } 

 useEffect(()=>{
  settingFollowLiked();
 },[post])

 useEffect(()=>{
  const getPost = async()=>{
    try {
      const res = await axios.get(`${BACKEND_URL}/api/posts/get-post`, {
        params: {postId},
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true 
      });
      setPost(res.data);
      setYourPost(userdata?._id === res.data?.postUser?._id);
      setLikesCount(res.data.likes?.length);
      setCommentCount(res.data.comments?.length)
    } catch (error) {
      console.log(error);
    }
  }
  const getPostComments = async()=>{
    try {
      const res = await axios.get(`${BACKEND_URL}/api/posts/get-post-comments`, {
        params: {postId},
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true 
      });
      setComments(res.data);
      console.log(res.data);
      
    } catch (error) {
      console.log(error);
    }
  }
  getPost();
  getPostComments();
 },[])

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async() => {
    if (comment.trim()) {
      setLoading(true);
      try {
        const res = await axios.post(`${BACKEND_URL}/api/posts/set-comment`,{comment}, {
          params: {postId},
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true 
        });
        toast.success("Comment submitted successfully!");
        setCommentCount((commentCount)=>commentCount+1);
        setComments([{
          commentUser:{
            intro:{
              tagline:userdata?.intro?.tagline,
            },
            name:userdata?.name,
            profileimg:userdata?.profileimg,
            username:userdata?.username,
            _id:userdata?._id
          },
          content:comment,
          date:new Date(),
          post:post?._id
        },...comments]);
        setLoading(false);
        setShowCommentBox(false);
        setComment('');
      } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong!");
        setLoading(false);
        setComment('');
        setShowCommentBox(false);
      }
    }
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

  const handleLikeClick = async () => {
    setLikesCount((likesCount)=>liked ?likesCount-1 : likesCount+1);
    setLiked(!liked);
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

  const openLikesModal = () => {setShowLikesModal(true);};
  const closeLikesModal = () => {setShowLikesModal(false);};
  const handleCancel = () => {setShowCommentBox(false);};
  
  return (
    <div className="flex justify-center bg-black/20">
    <div className="relative w-full max-w-4xl  p-3 bg-white rounded-lg shadow-lg mt-3 mb-5 pt-0 border-gray">
      <div className="flex p-3 border-b border-gray-200">
        <img className="w-14 h-14 rounded-full mr-3" src={post?.postUser?.profileimg ? post.postUser.profileimg: user} alt="User" />
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <h4 className="flex items-center text-lg font-semibold">{post?.postUser?.name}</h4>
            {!yourPost && userdata &&
            <button
              className={`ml-auto text-sm font-semibold mr-1 sm:mr-2 ${isFollowing ? 'text-gray-500' : 'text-blue-500'}`}
              onClick={toggleFollow}
            >
              {isFollowing ? 'Following' : 'Follow +'}
            </button>
          }
          </div>
          <p className="text-sm text-gray-600">{post?.postUser?.intro?.tagline}</p>
        </div>
      </div>
      {/* Post Content */}
      <div className="mb-4">
        <h2 className="text-3xl font-bold mb-2">{post?.title}</h2>
      </div>
      {/* Post Image */}
      {post?.postImage && (
        <div className="mb-4 bg-gray-100">
          <img
            src={post?.postImage}
            alt="Post"
            className="w-full h-auto sm:h-96 object-contain"
          />
        </div>
      )}
      <div className="text-gray-700 mb-4 p-0 md:px-4"
          dangerouslySetInnerHTML={{ __html: post?.content}}
        />
      {/* Like & Comment Section */}
      {userdata &&
      <div className="flex items-center justify-between mb-4">
        <button
          className="relative flex items-center text-gray-500 hover:text-gray-900"
          onClick={handleLikeClick}
        >
          <BiSolidLike className="text-2xl" style={{ color: `${liked ? 'blue' : 'grey'}` }} />
          <span>Like</span>
        </button>
        <button
          className="flex items-center text-gray-500 hover:text-gray-900"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <FaComment className="w-5 h-5 mr-1" />
          <span>Comment</span>
        </button>
      </div>
          }
      {/* Like and Comment Counts */}
      <div className="flex items-center justify-between mb-4 text-gray-500">
        <div onClick={openLikesModal} className="cursor-pointer hover:text-gray-900">
          {likesCount} Likes
        </div>
        <div>{commentCount} Comments</div>
      </div>
{/* Comments */}
{showCommentBox && (
  <div className="p-2 bg-gray-100 rounded-lg shadow-md">
    <div className="flex items-start mb-3">
      <img className="w-6 h-6 rounded-full bg-gray-400 mr-2" src={post?.postUser?.profileimg ? post.postUser.profileimg: user} alt="User" />
      <textarea
        value={comment}
        onChange={handleCommentChange}
        rows="3"
        placeholder="Add a comment..."
        className="flex-grow p-1 border rounded-lg focus:outline-none"
      />
    </div>
    <div className="flex justify-end">
      {loading ?  <div className="w-8 h-8 border-4 border-blue border-t-transparent rounded-full animate-spin mr-2 mt-1"></div> : <button
        onClick={handleCommentSubmit}
        className="bg-blue text-white py-2 px-3 rounded-lg flex items-center hover:bg-blue-700 mr-2"
      >
        <IoMdSend className="w-5 h-5 mr-1" />
        Send
      </button>}
      <button
        onClick={handleCancel}
        className="bg-gray-300 text-black py-2 px-3 rounded-lg flex items-center hover:bg-gray-400"
      >
        Cancel
      </button>
    </div>
  </div>
)}

      {/* Display Comments */}
      <div className="mt-6">
        <div className="text-lg font-semibold mb-2">Comments:</div>
        <div className="space-y-4">
          {comments?.map((comment,index) => (
            <div key={comment?._id} className="flex items-start p-2 border-b border-gray-200 gap-3">
              <Link to={`/${comment?.commentUser?.username}`}>
              <img className="w-10 h-10 rounded-full bg-gray-400 mr-3" src={comment?.commentUser?.profileimg ? comment.commentUser.profileimg : user} alt="User" />
              </Link>
              <div className="flex flex-col w-full">
              <div className="flex flex-col justify-between w-full">
               <div className="flex justify-between">
               <Link to={`/${comment?.commentUser?.username}`}>
               <p className="text-black-700 font-bold">{comment?.commentUser?.name}</p>
               </Link>
               <p className="text-gray-600 " style={{fontSize:"14px"}}>{timeAgo(comment?.date)}</p>
              </div> 
              <p className="text-gray-500" style={{fontSize:"13px"}}>{comment?.commentUser?.intro?.tagline}</p>
              </div>
              <p className="text-gray-900">{comment?.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Likes Modal */}
      {showLikesModal && (
        <div className="p-2 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
          <div className="bg-white rounded-lg w-full max-w-md mx-auto p-6 shadow-lg max-h-[50vh] overflow-y-scroll">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-lg">People who liked this post</h4>
              <button onClick={closeLikesModal}>
                <IoClose className="text-xl" />
              </button>
            </div>
            <div className="space-y-4">
              {post?.likes?.map((reaction, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <img className="w-12 h-12 rounded-full bg-gray-400" src={reaction?.profileimg ? reaction.profileimg :user} alt="User" />
                  <div>
                    <Link to={`/${reaction?.username}`}>
                    <span className="text-gray-900 font-medium">{reaction?.name}</span>
                    </Link>
                    <p className="text-gray-600 text-sm">{reaction?.intro?.tagline}</p>
                    <p className="text-gray-500 text-xs">{reaction?.intro?.city} {reaction?.intro?.country}</p>
                  </div>
                </div>
              ))}
              
            </div>
          </div>
        </div>
      )}
    </div>
    <Toaster />
    </div>
  );
};

export default PostDetail;
