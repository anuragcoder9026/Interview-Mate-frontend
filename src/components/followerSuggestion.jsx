import { useState } from "react";
import axios from "axios";
import user from "../assets/images/user.png";
import ProfileBg from "../assets/images/college_bg.jpg";
import { Link } from "react-router-dom";
import { FiUserPlus } from 'react-icons/fi';
import {BACKEND_URL} from "../../url"
const FollowerSuggestion=({suggestion})=>{
    const [isFollowing,setIsFollowing]=useState(false);
    const toggleFollow = async () => {
      setIsFollowing(!isFollowing);
      try {
        const jsonFormData = JSON.stringify({username:suggestion?.username,follow:isFollowing?"Following":"Follow"});  
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
    
    return(
        <div key={suggestion._id} className="flex flex-col justify-between border border-gray-300 rounded-lg  relative w-[190px] ">
            
        <div className="relative w-full">
          <div
            style={{
              backgroundImage: `url(${suggestion?.coverImage ? suggestion.coverImage : ProfileBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "4rem", // Equal to h-24
            }}
            className="w-full rounded-t-lg"
          ></div>

          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
            <img
              src={suggestion?.profileimg ? suggestion.profileimg :user}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white"
            />
          </div>
        </div>

        {/* Profile Info */}
        <h3 className="text-sm font-medium text-center mt-12 mb-1">
        <Link to={`/${suggestion?.username}`}>
          {suggestion?.name }
        </Link>
        </h3>
        <p className="text-xs text-gray-500 text-center mb-2">
          {suggestion?.intro?.tagline}
        </p>
        {
         suggestion?.mutualCount>0 && 
        <div className="flex items-center justify-center mb-2 px-2 gap-2">
        
          <img
              src={suggestion?.mutualConnection?.profileimg || user}
              alt="Profile"
              className="w-6 h-6 rounded-full border border-white"
            />
          
            <span className="text-xs text-gray-800">
              {suggestion?.mutualConnection?.name} {suggestion?.mutualCount>1 && `and ${suggestion?.mutualCount-1} other`} mutual connections
            </span>
          
        </div>
        }
        <div className="flex justify-center my-4 w-full ">
            <div className="flex w-[80%]  justify-center py-1 text-blue border-2 font-semibold border-blue rounded-full " onClick={toggleFollow}>
              <FiUserPlus className="mt-1 mr-3"/>
              <button className="focus:outline-none">{!isFollowing?'Follow':'Following'}</button>
           </div>
        </div>
      </div>
    );
}
export default FollowerSuggestion;