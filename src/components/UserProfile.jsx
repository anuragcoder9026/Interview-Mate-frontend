import React, { useEffect, useState } from "react";
import { FaUserGraduate, FaBriefcase, FaTools } from "react-icons/fa";
import user from "../assets/images/user.png";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { CgMoreO } from "react-icons/cg";
import { Link, useNavigate, useParams } from "react-router-dom";
import collegeLogo from "../assets/images/LogoNIT.png";
import axios from "axios";
import { useUserContext } from "../context/usercontext";
import { useDispatch, useSelector } from 'react-redux';
import { userFollowingAction } from "../store/userFollowing";
import { timeAgo } from "../utils/dateAgo";
import {BACKEND_URL} from "../../url"
const UserProfile = () => {
  const dispatch=useDispatch();
  const userFollowing = useSelector(store => store.userFollowing);
  
  const navigate=useNavigate();
  const [isAboutExpanded, setAboutExpanded] = useState(false);
  const authuser=useUserContext().userdata;
  const [isFollow,setFollow]=useState(true); 
  const handleExp = (index,newReadmore) => {
      setUserExperience((prevItems) =>
        prevItems.map((item, i) =>
            i === index ? { ...item, readmore: newReadmore } : item
    )
);
};
const [followers,setFollowers]=useState();
const [followersCount,setFollowersCount]=useState();
const shortenString = (len,str) => str.length > len ? str.slice(0, len) + "...   " : str;
const [activeTab, setActiveTab] = useState("posts"); 
const handleClick = (tab) => {
    setActiveTab(tab);
};
const {id}=useParams();
const [userdata,setUserData]=useState();
const [userIntro,setUserIntro]=useState();
const [userAbout,setUserAbout]=useState();
const [userEducation,setUserEducation]=useState([]);
const [userExperience,setUserExperience]=useState([]);
const [skills,setSkills]=useState([]);

useEffect(()=>{
 if(userFollowing?.includes(userdata?._id)){
    setFollow(false);
}
 else setFollow(true);
},[userdata])

 const [activityPosts,setActivityPost]=useState();
  const [activityComments,setActivityComments]=useState();
  useEffect(()=>{
    const getUserPosts =async()=>{
      try {
        const res = await axios.get(`${BACKEND_URL}/api/posts/get-activity-posts`,{
          params: {userId:userdata?._id},
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        setActivityPost(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    const getUserComments =async()=>{
      try {
        const res = await axios.get(`${BACKEND_URL}/api/posts/get-activity-comments`,{
          params: {userId:userdata?._id},
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        setActivityComments(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    if(userdata)getUserPosts();
    if(userdata)getUserComments();
  },[userdata]);

  useEffect(() => {
    const getProfile = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/users/get-profile/${id}`,{
              withCredentials: true
          });
          
          if (response.status === 200) {
              const user=response.data;
              setUserData(user);
              setUserAbout(user.about);
              setUserIntro(user.intro);
              setUserEducation(user.educations);
              setUserExperience(user.experiences);
              setSkills(user.skills);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        const getFollowerSummary =async()=>{
          try {
            const res = await axios.get(`${BACKEND_URL}/api/users/get-followers-summary`,{
              params: {username:id},
              headers: {
                'Content-Type': 'application/json'
              },
              withCredentials: true
            });
            console.log(res);
            
            setFollowers(res.data.followers);
            setFollowersCount(res.data.totalFollowers);
          } catch (error) {
            console.log(error);
          }
        }
        if(authuser?.username!==id){
          getProfile();
          getFollowerSummary();
        }
        else navigate("/profile");
      },[]);

      const handleFollow=async()=>{
        if(!isFollow)dispatch(userFollowingAction.handleDeleteFollowing(userdata?._id));
        else dispatch(userFollowingAction.handleAddUserFollowing(userdata?._id));
        setFollow((isFollow)=>!isFollow);
        try {
          const jsonFormData = JSON.stringify({username:userdata.username,follow:!isFollow?"Following":"Follow"});  
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
        userdata && <div className="flex flex-col items-center w-full bg-slate-200 p-2">
            {/* Profile Header Section */}
            <div className=' w-full max-w-4xl bg-white pb-5 rounded-lg'>
            <div className="relative w-full bg-blue-700 h-48 rounded-lg mb-12 bg-white">
                <img
                    className="w-full h-full object-cover"
                    src={userdata?.coverImage}
             
                    alt="Background"
                />
                <div className="absolute bottom-[-50px] left-6  w-32 h-32 rounded-full bg-white p-2 shadow-md">
                    <img
                        className="w-full h-full rounded-full object-cover"
                        src={userdata? userdata?.profileimg : user}
                        alt="User Profile"
                    />
                </div>
            </div>

        {/* User Details */}
        { <div className="flex flex-col justify-center  mt-16 ml-6 mr-2">
          <h2 className="text-2xl font-semibold">
          {userdata?.name}
          </h2>
          {/* Bio Section */}
          <div className="mt-4 w-1/1 flex gap-4 flex-col sm:flex-row mr-3">
            <p className="text-gray-700 w-1/1 sm:w-1/2 mr-2">
            {userIntro?.headline}
            </p>
            <div className="flex gap-4 w-1/1 sm:w-1/2">
              {userIntro?.education && <img src={collegeLogo} alt="" className="h-8 w-8 mt-2"/>}
              <p>
              {userIntro?.education}
              </p>
            </div>
          </div>

          <p className="text-black font-semibold mt-2">
            {userIntro?.tagline}
          </p>
          <p className="text-gray-500 mt-2">{userIntro?.city} {userIntro?.country} </p>
          <p className="text-blue mt-2">
          <Link to={`/follow-list/${userdata?.username}`} className="cursor-pointer hover:underline">{userdata?.followers.length} Follower</Link> <span className="text-gray-500"> • </span> <Link to={`/follow-list/${userdata?.username}`} className="cursor-pointer hover:underline">{userdata?.following.length} Following</Link>
          </p>
           {
          <div className="flex items-center my-4">
          {followers?.map((follower, index) => (
               <img
                key={index}
                src={follower?.profileimg ? follower.profileimg : user}
                className={`w-10 h-10 rounded-full border-2 border-gray-200 -ml-2 first:ml-0`}
                alt={`${index + 1}`}
              />
            ))}
             {followersCount &&
            <p className="text-gray-500 ml-1 mr-2 text-sm">
              Followed by 
              {followersCount === 1 ? <b>{` ${followers[0]?.name}`}</b> : followersCount === 2 ? <b>{` ${followers[0]?.name} and ${followers[1]?.name} `}</b> : followersCount > 2 ? <b>{` ${followers[0]?.name} , ${followers[1]?.name} and ${followersCount-2} others`}</b> :''}
              
            </p>
            }
          </div>
}
          {/* Action Buttons */}
          <div className="mt-4 flex flex-wrap space-x-2 sm:space-x-4">
            <button
              className={`px-4 py-1.5 text-white  bg-blue mb-2 hover:cursor-pointer ${!authuser? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
              style={{ borderRadius: "18px" }} onClick={handleFollow}
            >
                {isFollow?"Follow+ ":"✓ Following"}
              
            </button>
            
            <Link
              to={`/message/${userdata?._id}`}
              className={`hidden sm:block px-4 py-1.5 bg-gray-200 text-blue border border-blue font-semibold  hover:bg-gray-300 mb-2 hover:cursor-pointer${!authuser? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
              style={{ borderRadius: "18px" }}
            >
              Message
            </Link>
            <p
              className="hidden sm:block px-6 py-1.5 bg-gray-200 text-gray-800 border border-black  hover:bg-gray-300 mb-2 hover:cursor-pointer"
              style={{ borderRadius: "18px" }}
            >
              More
            </p>
            <Link to={`/message/${userdata?._id}`} className={`${!authuser? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}> <BiMessageRoundedDetail className="block sm:hidden text-4xl text-blue mt-1 ml-3 mr-3 hover:cursor-pointer " /></Link>
            <CgMoreO className="block sm:hidden text-3xl text-gray-500 mt-1 ml-6 hover:cursor-pointer" />
          </div>
        </div>
      }
      </div>
      
      <div className="w-full mt-2 max-w-4xl">
        
        {/* About Section */}
        <div className="bg-white p-6 pt-3 rounded-lg shadow-md mb-2">
             <h3 className="text-lg font-semibold">About</h3>
        {userAbout && <>
          <div className="text-gray-700"
          dangerouslySetInnerHTML={{ __html:  isAboutExpanded
            ? userAbout
            : shortenString(130,userAbout)}}
        />
          <button
            onClick={() => setAboutExpanded(!isAboutExpanded)}
            className="text-blue-600 hover:underline mt-2"
          >
            {isAboutExpanded ? "Show Less" : "Read More"}
          </button>
        </>}
         
        </div>

            {/* Activity Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-2">
        <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-semibold">Activity</h3>
        </div>

          <p className="text-blue cursor-pointer font-semibold mb-2">{userFollowing?.length} Followers</p>
          {
            ! isFollow &&
          <p
            className="px-4 py-1.5 bg-gray-200 text-center text-gray-700 border border-gray-400 hover:bg-gray-300 mb-2 hover:cursor-pointer"
            style={{ borderRadius: "18px", width: "120px" }}
          >
            ✓ Following
          </p>
          }

          <div className="mt-4 flex flex-wrap space-x-1 sm:space-x-4">
            <p
              style={{ borderRadius: "18px" }}
              className={`${
                activeTab === "posts"
                  ? "text-white bg-[#01754f] px-3 py-1 hover:cursor-pointer"
                  : "text-gray-500 bg-white px-2 py-1 border border-gray-300 hover:cursor-pointer"
              }`}
              onClick={() => handleClick("posts")}
            >
              posts
            </p>
            <p
              style={{ borderRadius: "18px" }}
              className={`${
                activeTab === "comments"
                  ? "text-white bg-[#01754f] px-3 py-1 hover:cursor-pointer"
                  : "text-gray-500 bg-white px-2 py-1 border border-gray-300 hover:cursor-pointer"
              }`}
              onClick={() => handleClick("comments")}
            >
              Comments
            </p>
            <p
              style={{ borderRadius: "18px" }}
              className={`${
                activeTab === "images"
                  ? "text-white bg-[#01754f] px-3 py-1 hover:cursor-pointer"
                  : "text-gray-500 bg-white px-2 py-1  border border-gray-300 hover:cursor-pointer"
              }`}
              onClick={() => handleClick("images")}
            >
              Images
            </p>
          </div>
          <div className="text-gray-700">
            {/* Recent Posts */}
            <div className="mb-6">
              <h4 className="font-semibold mb-4 mt-2">Recent Activity</h4>
              
              {
                activeTab === "posts" &&
                <div className="flex flex-col space-y-4">
                  {
                activityPosts?.map((post)=>
                <>
                    <Link to={`/post/${post?._id}`} className="flex space-x-4">
                  <div className="flex-shrink-0">

                    <img
                      src={post?.postImage ? post.postImage :"https://via.placeholder.com/50"}
                      className="w-12 h-50 "
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                    {userdata?.name} posted this
                    </p>
                    <p className="text-sm text-gray-500">{timeAgo(post?.date)}</p>
                    <div className="mt-2 text-gray-700"
                    dangerouslySetInnerHTML={{ __html:shortenString(250,post?.content)}}
                    />
                   
                    <div className="flex space-x-2 mt-2">
                      <span className="text-blue-500">👍 {post?.likes?.length}</span>
                      <span className="text-blue-500">💬 {post?.comments?.length}</span>
                    </div>
                  </div>
                </Link>
                <hr />
                </>)
                  }
                </div>
              }

               {
                activeTab === "comments" &&
                <div className="flex flex-col space-y-4">
                  {
                activityComments?.map((comment)=>
                <>
                    <Link to={`/post/${comment?.post}`} className="flex space-x-4">
                  <div className="flex flex-col">
                    <p className=" text-sm text-gray-500">
                      <span className="font-semibold text-gray-600"> {userdata?.name}</span> commented this • <span>🌍</span> {timeAgo(comment?.date)}
                    </p>
                    <p className="mt-2 text-black">
                     {comment?.content}
                    </p>
                  </div>
                </Link>
                <hr />
                </>)
                  }
                </div>
              }

              {
                activeTab === "images" &&
                <div className="flex flex-1 flex-wrap gap-4">
                  {
                activityPosts?.map((post)=> 
                  post.postImage && <img src={post.postImage} className="rounded-lg w-50 h-50 border-2" alt="" style={{width:"200px",height:"200px",}}/>
                )
                  }
                </div>
              }
             
            </div>

  
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-2">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <FaUserGraduate className="mr-2" /> Education
             </h3>
         {userEducation &&
         userEducation?.map((item,index)=>
           <div className="flex mb-2">
               <img src={item.image} style={{width:"48px",height:"48px",marginRight:"5px"}}/>
              <div className="text-gray-700 w-full">
                    <div className="flex  items-center">
                    <p className="font-bold">
                        {item.institute}
                    </p>
                    </div>
                    <p>{item.course} - {item.field}</p>
                    <p style={{fontSize:"13px"}}>{item.start_year} - {item.end_year}</p>
                    <p>{item.grade}</p>
             </div>
        </div>
         )
         }
          
        </div>

        {/* Experience Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-2">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
            <FaBriefcase className="mr-2" /> Experience
             </h3>
        {userExperience &&
          userExperience.map((item,index)=>
          <div className="flex mb-2 ">
          <img src={item.image} style={{width:"48px",height:"48px",marginRight:"5px"}}/>
         <div className="text-gray-700 w-full border-b border-b-1 pb-2">
               <div className="flex  items-center">
                  <p className="font-bold">{item.title}</p>
               </div>
               <p>{item.company} . {item.emp_type}</p>
               <p style={{fontSize:"13px"}}>{item.start_month} {item.start_year} - {item.end_month} {item.end_year}</p>
               <p style={{fontSize:"15px"}}>{item.location} · {item.loc_type}</p>
               <div className="mt-2 text-gray-700" 
               dangerouslySetInnerHTML={{ __html:  item.readmore ? item.description
               : shortenString(130,item.description)}}
               />
              <span className="mr-4 float-right text-black hover:cursor-pointer hover:underline" style={{fontSize:"13px"}} onClick={()=>handleExp(index,!item.readmore)}>{item.readmore ? "Show Less" : "Read More"}
             </span>
              
        </div>
         </div>)
        }
        
        </div>

        {/* Skills Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-2">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <FaTools className="mr-2" /> Skills
          </h3>
          <div className="flex flex-wrap gap-4 mt-6">
            {skills?.map((item,index)=><Link to="#" className="px-5 py-1 text-black-500 border-2 font-semibold border-black-600 rounded-full focus:outline-none hover:bg-gray-100"> {item}</Link>)}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
