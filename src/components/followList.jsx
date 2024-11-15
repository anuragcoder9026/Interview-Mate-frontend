import React, { useEffect, useState } from 'react';
import MenageNetworkCard from "../components/ManageNetworkCard";
import NetworkGrid from './NetworkGrid';
import ShowFollowers from './showFollowers';
import user from "../assets/images/user.png";
import ProfileBg from "../assets/images/college_bg.jpg";
import { FaUserFriends } from "react-icons/fa"; 
import { Link, useParams } from 'react-router-dom';
import axios from "axios"
import { useUserContext } from '../context/usercontext';
import {BACKEND_URL} from "../../url"
const FollowList = () => {
    const [grow,setGrow]=useState(false);
    const [followers,setFollowers]=useState();
    const [followings,setFollowings]=useState();
    const [profile,setProfile]=useState();
    const {username}=useParams();
    const {userdata} = useUserContext();
    const shortenString = (len,str) => str?.length > len ? str.slice(0, len) + "...   " : str;
    useEffect(()=>{
        const getProfile = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/users/get-profile/${username}`,{
                  withCredentials: true
              });
                setProfile(res.data);
              } catch (error) {
                console.error('Error fetching data:', error);
              }
        };
        const getFollowerList = async () => {
                try {
                    const res = await axios.get(`${BACKEND_URL}/api/users/get-followers-list/${username}`,{
                      withCredentials: true
                  });
                    console.log(res);
                    
                    setFollowers(res.data);
                  } catch (error) {
                    console.error('Error fetching data:', error);
                  }
        };    

        const getFollowingList = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/users/get-followings-list/${username}`,{
                  withCredentials: true
              });
                setFollowings(res.data);
              } catch (error) {
                console.error('Error fetching data:', error);
              }
    };    
        getProfile();
        getFollowerList();
        getFollowingList();
    },[]);

    const toggleFollowers=(followerId,username,isFollow)=>{
        setFollowers((followers) =>
            followers.map((follower) =>
                follower._id === followerId
                ? { 
                    ...follower, 
                      isFollow: !follower.isFollow 
                  }
                : follower
            )
          );
          handleSetFollow(username,isFollow);
    }
    const toggleFollowings=(followingId,username,isFollow)=>{
        setFollowings((followings) =>
            followings.map((following) =>
                following._id === followingId
                ? { 
                    ...following, 
                      isFollow: !following.isFollow 
                  }
                : following
            )
          );
          handleSetFollow(username,isFollow);
    }

    const handleSetFollow=async(username,isFollow)=>{
        try {
            const jsonFormData = JSON.stringify({username,follow:isFollow ? "Following":"Follow" });  
            const res = await axios.post(`${BACKEND_URL}/api/users/follow`, jsonFormData, {
              headers: {
                'Content-Type': 'application/json'
              },
              withCredentials: true
            });
          } catch (error) {
              console.log(error);
          }
    }
  return (
    <div className="bg-gray-100 flex justify-center p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl lg:space-x-1 space-y-4 lg:space-y-0 gap-0 sm:gap-5">

      <div >
       <div className="w-full lg:max-w-[300px] rounded-lg overflow-hidden shadow-lg bg-white border border-gray-300">
        <div className="relative w-full">
        <div
          style={{
            backgroundImage: `url(${profile?.coverImage || ProfileBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "6rem", // Equal to h-24
          }}
          className="w-full"
        ></div>
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <img src={profile?.profileimg ? profile.profileimg :user}  alt="Profile" className="w-20 h-20 rounded-full border-4 border-white"/>
        </div>
      </div>

      <div className="pt-14 pb-4 text-center">
        <h2 className="text-xl font-semibold"><Link to={`/${profile?.username}`}>{profile?.name}</Link></h2>
        <Link to={`/${profile?.username}`} className="text-gray-600 text-sm mt-1 px-5 block">
          {profile?.intro?.headline}
       </Link>
      </div>
            <div className="border-t border-b border-gray-200 px-5 mb-2">
              <div className="flex justify-between px-4 py-2 gap-4">
                <div>
                  <span className="text-gray-600 text-sm">Followers</span>
                  <p className="text-blue-500 font-semibold text-center">{profile?.followers?.length}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Followings</span>
                  <p className="text-blue-500 font-semibold text-center">{profile?.following?.length}</p>
                </div>
              </div>
            </div>
      </div>
    </div>

        <div className="flex-grow flex flex-col space-y-4 ">

            <div className="bg-white border p-6 rounded-lg border-gray-300 pb-0">
              <div className="flex">
                <button
                className="px-4 py-2 text-sm font-medium "
                style={{ borderBottom:grow? "2px solid green":"none", color: grow?"green":"gray" }}
                 onClick={()=>setGrow(true)}
                >
               Followers
               </button>
               <button className="px-4 py-2 text-sm font-medium text-gray-500 border-b-2"
               style={{ borderBottom:!grow? "2px solid green":"none",color: !grow?"green":"gray" }}
               onClick={()=>setGrow(false)}
               >
            Followings
              </button>
            </div>
          </div>
            
            <div className="flex bg-white flex-col rounded-lg p-6 border border-gray-300">
                {grow ? followers?.map((follower)=>
                <div className="flex item-start mb-6">
                  
                     <img src={follower?.profileimg ? follower.profileimg : user} className="h-10 w-10 rounded-full mr-4"/>
                 
                <div className="flex flex-col w-full sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-4 border-b-gray-300">
                    <div className="flex flex-col w-full">
                      <Link to={`/${follower?.username}`} className="text-sm font-medium">{follower?.name}</Link>
                      <p className="text-xs text-gray-500">{follower?.intro?.tagline}</p>
                      <p className="text-sm text-black">{shortenString(130,follower?.intro?.headline)}</p>
                      <p className="text-sm text-gray-500">{follower?.intro?.city} , {follower?.intro?.country}</p>
                      {userdata?._id !== follower?._id && 
                      <p className="flex text-sm text-gray-700"> <FaUserFriends className="mr-2 mt-1" /> {follower?.mutualConnections} mutual connections </p>
                       }
                    </div>
                    {userdata?._id !== follower?._id &&
                    <button className="px-5 py-1 text-blue border-2 font-semibold border-blue rounded-full focus:outline-none" onClick={()=>toggleFollowers(follower?._id,follower?.username,follower?.isFollow)}>{follower?.isFollow ? 'Following' : 'Follow'}
                   </button>
                     }
                </div>
            </div>):

followings?.map((following)=>
    <div className="flex item-start mb-6">
      
         <img src={following?.profileimg ? following.profileimg : user} className="h-10 w-10 rounded-full mr-4"/>
     
    <div className="flex flex-col w-full sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-4 border-b-gray-300">
        <div className="flex flex-col w-full">
          <Link to={`/${following?.username}`} className="text-sm font-medium">{following?.name}</Link>
          <p className="text-xs text-gray-500">{following?.intro?.tagline}</p>
          <p className="text-sm text-black">{shortenString(130,following?.intro?.headline)}</p>
          <p className="text-sm text-gray-500">{following?.intro?.city} , {following?.intro?.country}</p>
          {userdata?._id !== following?._id && 
            <p className="flex text-sm text-gray-700"> <FaUserFriends className="mr-2 mt-1" /> {following?.mutualConnections} mutual connections </p>
           }
        </div>
        {userdata?._id !== following?._id &&
        <button className="px-5 py-1 text-blue border-2 font-semibold border-blue rounded-full focus:outline-none" onClick={()=>toggleFollowings(following?._id,following?.username,following?.isFollow)}>{following?.isFollow ? 'Following' : 'Follow'}
       </button>
         }
    </div>
</div>)
            
        }
            </div>

        </div>


      </div>
    </div>
  );
};

export default FollowList;
