import { useEffect, useState } from "react";
import user from "../assets/images/user.png";
import axios from "axios";
import { Link } from "react-router-dom";
import {BACKEND_URL} from "../../url"
 const ShowFollowers=()=>{
    const [grow,setGrow]=useState(false);
    const [followers,setFollowers]=useState([1,2,3,4,5]);
    const [followings,setFollowings]=useState([1,2,3,4]);

    useEffect(()=>{
      const getUserFollowers=async()=>{
        try {
          const res = await axios.get(`${BACKEND_URL}/api/users/get-user-followers`, {
            withCredentials: true,
          });
          setFollowers(res.data);
         } catch (error) {
          console.log(error);
         }
      }
      const getUserFollowings=async()=>{
        try {
          const res = await axios.get(`${BACKEND_URL}/api/users/get-user-followings`, {
            withCredentials: true,
          });
          setFollowings(res.data);
         } catch (error) {
          console.log(error);
         }
      }
      getUserFollowers();
      getUserFollowings();
    },[])
    return (
        <div className="w-full lg:w-[300px]  pb-2 rounded-lg overflow-hidden  bg-white border border-gray-300 mb-4 ">
        <aside className="w-full bg-white rounded-lg">
        <div className="bg-white border p-6 pt-2 border-gray-300 pb-0">
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
           
           {grow &&
             <div className="flex flex-col gap-4 py-3 max-h-[400px] overflow-y-scroll scrollbar-thin">
                {
             followers?.map((follower)=>
                <>
                <div className="flex items-center ml-2">
                   <img src={follower?.profileimg ? follower.profileimg : user} className="h-10 w-10 rounded-full mr-3"/>
                <div>
                  <Link to={`/${follower?.username}`} className="text-sm font-medium">
                   {follower?.name}
                  </Link>
                  <p className="text-sm text-gray-500">{follower?.intro?.tagline}</p>
                </div>
              </div>
              <hr/>
              </>
             )
            }
             </div>
           }

            {!grow &&
            <div className="flex flex-col gap-4 py-3 max-h-[400px] overflow-y-scroll scrollbar-thin">{
             followings?.map((following)=>
                <>
                <div className="flex items-center ml-2">
                   <img src={following?.profileimg ? following.profileimg : user} className="h-10 w-10 rounded-full mr-3"/>
                 <div>
                  <Link to={`/${following?.username}`} className="text-sm font-medium">
                   {following?.name}
                  </Link>
                  <p className="text-sm text-gray-500">{following?.intro?.tagline}</p>
                </div>
              </div>
                <hr/>
                </>
             )
            }
             </div>
           }
        </aside>
      </div>
    )
 }

 export default ShowFollowers;