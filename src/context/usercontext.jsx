// src/context/UserContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { userIntroAction } from "../store/userIntroSilice"; 
import { userAboutAction } from '../store/userAboutSlice';
import { userEducationAction } from '../store/userEducationSlice';
import { userExperienceAction } from '../store/userExperienceSlice';
import { userSkillAction } from '../store/userSkillSlice';
import { userFollowingAction } from "../store/userFollowing";
import socket from "../../socket";
import notificationSound from "../assets/notification.mp3";
// import notificationSound from "../assets/Recording.mp3";
// Create a context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const dispatch=useDispatch(); 
  const [userdata, setUserdata] = useState(null);
  const [posts,setPost] = useState();
<<<<<<< HEAD
  const [events,setEvents]=useState();
=======
>>>>>>> 9e904d66572461b92fa34095bfffcf0e07918051
  const [logout,setLogOut]=useState(false);
  const [unseenMessageCount,setUnseenMessageCount]=useState(0);
  const [unseenNotificationCount,setUnseenNotificationCount]=useState(null);
  const [OnlineStatus,setOnlineStatus]=useState({});
  const getAllPosts = async () =>{
     try {
      const response = await axios.get("http://localhost:3200/api/posts/get-all-post", {
        withCredentials: true,
      });
<<<<<<< HEAD
=======
      console.log("posts:",response.data);
>>>>>>> 9e904d66572461b92fa34095bfffcf0e07918051
      setPost(response.data);
      const initUserOnline = response.data.reduce((acc, post) => {
        acc[post.postUser._id] = post.postUser.online;
        return acc;
      }, {});
<<<<<<< HEAD
=======
      console.log("init:",initUserOnline);
      
>>>>>>> 9e904d66572461b92fa34095bfffcf0e07918051
      setOnlineStatus(initUserOnline);
     } catch (error) {
      console.log(error);
     }
  }
<<<<<<< HEAD
  const getAllEvents = async () =>{
    try {
     const response = await axios.get("http://localhost:3200/api/event/get-all-event", {
       withCredentials: true,
     });
     console.log("events:",response.data);
     setEvents(response.data);
    } catch (error) {
     console.log(error);
    }
 }
=======
>>>>>>> 9e904d66572461b92fa34095bfffcf0e07918051

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3200/login/success", {
        withCredentials: true,
      });
      setUserdata(response.data.user);
      socket.emit('join', response.data.user?._id);
      const notifications=response.data.user?.notifications.length;
      const readNotifications= response.data.user?.readNotifications.length;
      setUnseenNotificationCount(notifications-readNotifications);
      dispatch(userFollowingAction.handleInitFollowing(response.data.user.following));
      dispatch(userIntroAction.handleUserIntro(response.data.user.intro)); 
      dispatch(userAboutAction.handleUserAbout({about:response.data.user.about}));
      dispatch(userEducationAction.handleInitEducation(response.data.user.educations));
      dispatch(userExperienceAction.handleInitExperience(response.data.user.experiences));
      dispatch(userSkillAction.handleInitSkill(response.data.user.skills));
    } catch (error) {
      setLogOut(true);
      console.error(error);
    }
  };
  const handleUnseenMessagesCount=async()=>{
    try { 
      const res = await axios.get('http://localhost:3200/api/users/unseen-messages-count', {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      setUnseenMessageCount(res.data.unseenCount);
    } catch (error) {
        console.log(error);
    }
  }

  const [audio] = useState(new Audio(notificationSound));
  const [audioEnabled, setAudioEnabled] = useState(true); 
  useEffect(() => {
    getUsers();
    getAllPosts();
<<<<<<< HEAD
    getAllEvents();
=======
>>>>>>> 9e904d66572461b92fa34095bfffcf0e07918051
    handleUnseenMessagesCount();
    socket.on('TotalUnseenCount', ({TotalUnseenCount}) => {
      setUnseenMessageCount((prev)=>{
        console.log(TotalUnseenCount , prev);
         if(audioEnabled && TotalUnseenCount > prev)audio.play();
        return TotalUnseenCount;
      });
    });
    return () => {
      socket.off('TotalUnseenCount');
     };
  
  }, []);

  return (
<<<<<<< HEAD
    <UserContext.Provider value={{ userdata, setUserdata ,posts,setPost,logout,setLogOut,unseenMessageCount,setUnseenMessageCount,unseenNotificationCount,setUnseenNotificationCount,OnlineStatus,setOnlineStatus,events,setEvents}}>
=======
    <UserContext.Provider value={{ userdata, setUserdata ,posts,setPost,logout,setLogOut,unseenMessageCount,setUnseenMessageCount,unseenNotificationCount,setUnseenNotificationCount,OnlineStatus,setOnlineStatus}}>
>>>>>>> 9e904d66572461b92fa34095bfffcf0e07918051
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};