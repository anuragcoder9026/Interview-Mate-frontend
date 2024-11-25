import React, { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";
import FollowerSuggestion from "./followerSuggestion";
import user from "../assets/images/user.png";
import { IoIosNotifications } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/usercontext";
import { timeAgo } from "../utils/dateAgo";
import {BACKEND_URL} from "../../url"
import { MdDeleteOutline } from "react-icons/md";
function NetworkGrid() {
    const [grow,setGrow]=useState(true);
    const [suggestions,setSuggestions]=useState();
    const [followerNotifications,setFollowerNotifications]=useState([1,2,3]);
    const [postNotifications,setPostNotifications]=useState([1,2,3]);

    const [usernoti,setUserNoti]=useState(false);
    const {userdata,setUnseenNotificationCount}=useUserContext();
    const shortenString = (len,str) => str.length > len ? str.slice(0, len) + "...   " : str;
    function extractInnerText(htmlString) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      return doc.body.textContent.trim();
    }
    
    const [deletePopupIndex, setDeletePopupIndex] = useState(null);
  
    const handleFollow = async(data) => { 
      setFollowerNotifications((prevData) =>
        prevData.map((notification) =>
          notification._id === data._id
            ? { 
                ...notification, 
                actionUser: { 
                  ...notification.actionUser, 
                  isFollowing: !notification.actionUser.isFollowing 
                } 
              }
            : notification
        )
      );

      try {
        const jsonFormData = JSON.stringify({username:data.actionUser.username, follow:data.actionUser.isFollowing ? "Following":"Follow" });  
        const res = await axios.post(`${BACKEND_URL}/api/users/follow`, jsonFormData, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        if(res.status===200) handleNotificationRead(data,false,"/mynetwork");
      } catch (error) {
          console.log(error);
      }
    };
    const navigate=useNavigate();
  const handleNotificationRead=async(notification,isNavigate,navigateUrl)=>{
    try {
      const jsonFormData = JSON.stringify({notificationId:notification?._id});  
      const res = await axios.post(`${BACKEND_URL}/api/users/read-notification`, jsonFormData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if(res.status===200){
        if(!notification?.isRead)setUnseenNotificationCount((prev)=>prev-1);
        if(isNavigate)navigate(navigateUrl);
      }
    } catch (error) {
        console.log(error);
    }
  } 
  const deleteNotification=async(notificationId)=>{
    try {
      const jsonFormData = JSON.stringify({notificationId});  
      const res = await axios.post(`${BACKEND_URL}/api/users/delete-notification`, jsonFormData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
    } catch (error) {
        console.log(error);
    }
  }
  const deletefollowerNotification=(notificationId)=>{
       const updatedFollowerNotification=followerNotifications.filter((notification)=>notification._id!==notificationId);
       setFollowerNotifications(updatedFollowerNotification);
       deleteNotification(notificationId);
  }
  const deletepostNotification=(notificationId)=>{
    const updatedPostNotification=postNotifications.filter((notification)=>notification._id!==notificationId);
    setPostNotifications(updatedPostNotification);
    deleteNotification(notificationId);
}

    useEffect(()=>{
      const handleFollwerSuggestions = async() => {
        try {
          const res = await axios.get(`${BACKEND_URL}/api/users/get-follwer-suggestions`, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true 
          });
          setSuggestions(res.data.suggestions);
        } catch (error) {
          console.log(error);
        }
      };
      const handleFollwerNotification = async() => {
        try {
          const res = await axios.get(`${BACKEND_URL}/api/users/get-follower-notification`, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true 
          });
          setFollowerNotifications(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      const handlePostNotification = async() => {
        try {
          const res = await axios.get(`${BACKEND_URL}/api/users/get-post-notification`, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true 
          });
          setPostNotifications(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      handleFollwerSuggestions();
      handleFollwerNotification();
      handlePostNotification();
    },[])
  return (
    <div className="p-1 sm:p-3 sm:pt-0">
      {/* Top section with Grow and Catch up buttons */}
      <div className="bg-white border p-6 rounded-lg border-gray-300 pb-0">
        <div className="flex">
          <button
            className="px-4 py-2 text-sm font-medium "
            style={{ borderBottom:grow? "2px solid green":"none", color: grow?"green":"gray" }}
            onClick={()=>setGrow(true)}
          >
            Suggestions
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 border-b-2"
          style={{ borderBottom:!grow? "2px solid green":"none",color: !grow?"green":"gray" }}
          onClick={()=>setGrow(false)}
          >
            Notifications
          </button>
        </div>
      </div>

      {/* Invitations Section */}
      <div className="mt-4">
        {
          !grow ? 
          <div className="bg-white border rounded-lg border-gray-300">
          <div className="flex justify-between px-4 pt-3 items-center border-b">
            <div className="flex">
          <button
            className="px-4 py-2 text-sm font-medium "
            style={{ borderBottom:usernoti? "2px solid green":"none", color: usernoti?"green":"gray" }}
            onClick={()=>setUserNoti(true)}
          >
            Users
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 border-b-2"
          style={{ borderBottom:!usernoti? "2px solid green":"none",color: !usernoti?"green":"gray" }}
          onClick={()=>setUserNoti(false)}
          >
            Posts
          </button>
        </div>
            <button className="text-sm font-semibold">Manage</button>
          </div>

          {/* Invitation Card */}
          
            { usernoti ? 
              followerNotifications?.map((notification)=>
                <div className="flex flex-col">
              <div className="flex flex-col sm:flex-row  justify-between p-4 pr-2 mb-1" style={{backgroundColor:notification?.isRead ? "white" :"#E0F0FF"}}>
              <div className="flex items-center cursor-pointer" onClick={()=>handleNotificationRead(notification,true,`/${notification?.actionUser?.username}`)}>
                <span className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-2" >
                   <img src={notification?.actionUser?.profileimg || user} className="h-10 w-10 rounded-full"/>
                </span >
                <div >
                  <p className="text-gray-800 text-sm">
                    <span className="text-sm text-black font-medium">{notification?.actionUser?.name}</span> started following you  • <span>🌍 {timeAgo(notification?.createdAt)}</span>
                  </p>
                  <p className="text-sm text-gray-500">{notification?.actionUser?.intro?.tagline}</p>
                </div>
              </div>
              <div className="flex items-center justify-end mt-4 sm:mt-0">
                <button className="text-sm text-gray-500 font-semibold mr-4" onClick={()=>deletefollowerNotification(notification?._id)}>
                  Ignore
                </button>
                <button className="px-5 py-1 text-blue border-2 font-semibold border-blue rounded-full focus:outline-none" onClick={()=>handleFollow(notification)}>
                     {notification?.actionUser?.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
            </div>) :
               
               postNotifications?.map((notification, index) => (
                <div className="flex flex-col" key={notification._id}>
                  <div className="flex justify-between p-4 pr-2 mb-1" style={{ backgroundColor: notification?.isRead ? "white" : "#E0F0FF" }}>
                    <span
                      className="min-h-12 min-w-12 mr-2 sm:mr-4 cursor-pointer"
                      onClick={() => handleNotificationRead(notification, true, `/${notification?.actionUser?.username}`)}
                    >
                      <img src={notification?.actionUser?.profileimg || user} className="h-10 w-10 rounded-full border border-gray-400" />
                    </span>
                    <div className="flex justify-between w-full gap-2 sm:gap-5 cursor-pointer">
                      {notification?.type === 'comment' && userdata && (
                        <p className="text-sm w-full" onClick={() => handleNotificationRead(notification, true, `/post/${notification?.post?._id}`)}>
                          <span className="font-bold">{notification?.actionUser?.name}</span> commented on <span className="font-bold">{`${notification?.user?._id === userdata._id ? 'your' : notification?.user?.name}'s `}</span> post: {notification?.message !== 'undefined' ? notification.message : ''}
                        </p>
                      )}
                      {notification.type === 'like' && userdata && (
                        <p className="text-sm w-full" onClick={() => handleNotificationRead(notification, true, `/post/${notification?.post?._id}`)}>
                          <span className="font-bold">{notification?.actionUser?.name}</span> liked on <span className="font-bold">{`${notification?.user?._id === userdata?._id ? 'your' : notification?.user?.name}'s `}</span> post:&nbsp;
                          {shortenString(170, extractInnerText(notification?.post?.content))}
                        </p>
                      )}
                      {notification.type === 'post' && (
                        <p className="text-sm w-full" onClick={() => handleNotificationRead(notification, true, `/post/${notification?.post?._id}`)}>
                          <span className="font-bold">{notification?.actionUser?.name}</span> posted:&nbsp;
                          {shortenString(170, extractInnerText(notification?.post?.content))}
                        </p>
                      )}
                      <div className="flex flex-col gap-2 items-end pr-2 relative" style={{ minWidth: "70px" }}>
                        <span className="text-xs text-gray-500">{timeAgo(notification?.createdAt)}</span>
                        <span
                          className="h-10 w-10 hover:bg-gray-300 p-2 rounded-full relative"
                          onClick={() => setDeletePopupIndex(deletePopupIndex === index ? null : index)} // Toggle popup
                        >
                          <BsThreeDots className="text-2xl hover:cursor-pointer" />
                        </span>
                        {deletePopupIndex === index && (
                          <div className="absolute top-1/10 transform -translate-y-1/2  bg-white border border-gray-300 shadow-md p-2 rounded-md z-10">
                            <button
                              className="flex text-red-500 hover:text-red-700 text-sm px-2"
                              onClick={() => {
                                deletepostNotification(notification._id);
                                setDeletePopupIndex(null); // Close popup after deletion
                              }}
                            >
                              <MdDeleteOutline style={{color:"red",fontSize:"19px",marginTop:"1.5px",marginRight:"6px"}}/>Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
                 
            }
            {
              usernoti && followerNotifications.length === 0 &&<h1 className="text-lg font-medium p-4 pt-4">No Follower Notifications</h1> 
            }
            {
              !usernoti && postNotifications.length === 0 &&<h1 className="text-lg font-medium p-4 pt-4">No Post Notifications</h1> 
            }
        </div>:
         <div className="mt-4 p-4 bg-white border rounded-lg border-gray-300">
         <h4 className="text-gray-600  mb-2">
           People you may know from Dr B R Ambedkar National Institute of Technology, Jalandhar
         </h4>
         <div className="flex flex-wrap justify-center sm:justify-start gap-3">
           {suggestions?.map((suggestion)=> (
             <FollowerSuggestion suggestion={suggestion}/>
           ))}
         </div>
       </div>


        }
        
      </div>
    </div>
  );
}

export default NetworkGrid;
