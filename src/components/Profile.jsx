import React, { useEffect, useState } from "react";
import { FaUserGraduate, FaBriefcase, FaTools } from "react-icons/fa";
import user from "../assets/images/user.png";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/usercontext"; // Import the context
import collegeLogo from "../assets/images/LogoNIT.png";
import { MdOutlineEdit } from "react-icons/md";
import EditIntroForm from "./editIntro";
import { useSelector } from "react-redux";
import EditAboutForm from "./editAbout";
import { AiOutlinePlus } from "react-icons/ai";
import EditEducationForm from "./editEducation";
import EditExperienceForm from "./editExperience";
import { useDispatch } from 'react-redux';
import { userExperienceAction } from '../store/userExperienceSlice';
import EditSkillsForm from "./editSkills";
import { FaShare, FaAngleRight ,FaAngleLeft } from "react-icons/fa6";
import axios from "axios"
import { timeAgo } from "../utils/dateAgo";
import { MdClose, MdPostAdd } from 'react-icons/md'; 
import ReactQuill from 'react-quill';
import { FaImage, FaCalendarAlt, FaPen } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { IoCameraOutline } from "react-icons/io5";
import EventCard from "./eventCard";
import {BACKEND_URL} from "../../url"
const ProfileSection = () => {
  const { userdata ,userEvents,setUserEvents} = useUserContext(); 
  const dispatch=useDispatch(); 
  // State management for "Read More" toggles
  const [isAboutExpanded, setAboutExpanded] = useState(false);
  const [followers,setFollowers]=useState();
  const [followersCount,setFollowersCount]=useState();
  const shortenString = (len,str) => str.length > len ? str.slice(0, len) + "...   " : str;
  const [activeTab, setActiveTab] = useState("posts"); 
  const handleClick = (tab) => {
    setActiveTab(tab);
  };
  const userIntro=useSelector(store=>store.userIntro);
  const userAbout=useSelector(store=>store.userAbout);
  const userEducation=useSelector(store=>store.userEducation);
  const userExperience=useSelector(store=>store.userExperience);
  const skills=useSelector(store => store.userSkill);
  const handleEpandExp=(data)=>{
    const {id,readmore}=data;
    dispatch(userExperienceAction.handleExpandExperience({id,readmore})); 
  } 

  const [introPopup,setIntroPopup]=useState(false);
  const [aboutPopup,setAboutPopup]=useState(false);
  const [eduPopup,setEduPopup]=useState(false);
  const [skillPopup,setSkillPopup]=useState(false);
  const [eid,setId]=useState(-1);
  const [expPopup,setExpPopup]=useState(false);
  const [expid,setExpId]=useState(-1);

  const closeIntroPopup=(data)=>{setIntroPopup(data);}
  const closeAboutpopup=(data)=>{setAboutPopup(data);}
  const closeEduPopup=(data)=>{ setEduPopup(data);}
  const closeExpPopup=(data)=>{ setExpPopup(data);}
  const closeSkillpopup=(data)=>{ setSkillPopup(data);}

  const handleAddEducation=()=>{
    setId(-1);
    setEduPopup(true);
  }
  const handleEditEducation=(data)=>{
    setId(data);
    setEduPopup(true);
  }
  const handleAddExperience=()=>{
    setExpId(-1);
    setExpPopup(true);
  }
  const handleEditExperience=(data)=>{
    setExpId(data);
    setExpPopup(true);
  }

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
      const getFollowerSummary =async()=>{
        try {
          const res = await axios.get(`${BACKEND_URL}/api/users/get-followers-summary`,{
            params: {username:userdata?.username},
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          });
          setFollowers(res.data.followers);
          setFollowersCount(res.data.totalFollowers);
        } catch (error) {
          console.log(error);
        }
      }
      const getUserEvents = async() => {
    
        try {
          const res = await axios.get(`${BACKEND_URL}/api/event/get-user-event`, {
              headers: {
                  'Content-Type': 'application/json'
              },
              withCredentials: true // Include this line to allow cookies
          });
          setEvents(res.data);
          setUserEvents(res.data);
         } catch (error) {
          console.log(error);
         }
      };
    

      getUserPosts();
      getUserComments();
      getUserEvents();
      getFollowerSummary();
      
  },[]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [title,setTitle]=useState('');
  const [isImage,setIsImage]=useState(false);
  const handleClosePopup = () => {
    setTitle(null);
    setPostImage({ url: null, name: '' });
    setImageFile(null); 
    setIsImage(false);
    setIsPopupOpen(false);
    setPostContent(''); // Clear content when closing
  };
  const handleIsImage=()=>{
    setPostImage({ url: null, name: '' });
    setImageFile(null); 
    setIsImage(false);
  }
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  const handlePost = async() => {
    const postData={postId:defaultPost ? defaultPost._id :null, title:title,content:postContent,postImage:imageFile ?imageFile : defaultPost? defaultPost.postImage : null,imageExistType:imageFile?1:defaultPost?.postImage ? 2 : 3};
    console.log(postData);
    
    try {
      const res = await axios.post(`${BACKEND_URL}/api/posts/publish-post`, postData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          },
          withCredentials: true // Include this line to allow cookies
      });
      console.log(res);
      if(res.status===200){
        toast.success('Post created successfully!');
        setActivityPost([res.data.post,...activityPosts])
      }
     } catch (error) {
      toast.error('something went wrong');
      console.log(error);
     }
     handleClosePopup(); 
  };
  const [postImage, setPostImage] = useState({ url: null, name: '' });
  const [defaultPost,setDefaultPost]=useState(null);
  const [imageFile,setImageFile]=useState(null);

  const handleMediaChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
          const name = file.name;
              if (postImage.url) URL.revokeObjectURL(postImage.url); 
              setPostImage({ url, name });
              setIsImage(true);
              setImageFile(file);
      }
  };    


  const [coverImage, setCoverImage] = useState({ url: null, name: '' });
  const [profileImage, setProfileImage] = useState({ url: null, name: '' });
  useEffect(() => {
      return () => {
          if (coverImage.url) URL.revokeObjectURL(coverImage.url);
          if (profileImage.url) URL.revokeObjectURL(profileImage.url);
      };
  }, [coverImage, profileImage]);

  const handleFileChange = async (event, imageType) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const name = file.name;
  
      if (imageType === 'cover') {
        if (coverImage.url) URL.revokeObjectURL(coverImage.url); 
        setCoverImage({ url, name });
        try {
          const formData = new FormData();
          formData.append('userCover', file);
  
          const res = await axios.post(`${BACKEND_URL}/api/users/user-cover-img`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            withCredentials: true // Include this line to allow cookies
          });
          if (res.status === 200) {
            toast.success("Cover Image uploaded successfully");
          }
        } catch (error) {
          console.log(error);
        }
      } else if (imageType === 'profile') {
        if (profileImage.url) URL.revokeObjectURL(profileImage.url); // Cleanup previous URL
        setProfileImage({ url, name });
        try {
          // Create a FormData object to handle file uploads
          const formData = new FormData();
          formData.append('userProfile', file);
  
          const res = await axios.post(`${BACKEND_URL}/api/users/user-profile-img`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            withCredentials: true // Include this line to allow cookies
          });
          if (res.status === 200) {
            toast.success("Profile Image uploaded successfully")
          }
        } catch (error) {
          console.log(error);
        }
        
      }
    }
  };

  const handleWhatsappClick = () => {
    const message = `See This Profile on Interview Mate: https://localhost:5173/Interview-Mate-frontend/${userdata?.username}`;
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
};

 const [currentIndex, setCurrentIndex] = useState(0);
  // Function to go to the next slide
  const [events,setEvents]=useState();
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events?.length);
  };

  // Function to go to the previous slide
  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events?.length) % events?.length);
  };

  
    return (
        userdata && <div className="flex flex-col items-center w-full bg-slate-200 p-2">
            {/* Profile Header Section */}
            <div className=' w-full max-w-4xl bg-white pb-5 rounded-lg'>
            <div className="relative w-full bg-blue-700 h-48 rounded-lg mb-12 bg-white">
               <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="cover-upload"
                    onChange={(e) => handleFileChange(e, 'cover')}
                  />
                   <label
                    htmlFor="cover-upload"
                    className="absolute top-5 right-5 cursor-pointer"
                  >
                    <IoCameraOutline className="text-white text-2xl font-bold cursor-pointer"/>
                  </label>
                <img
                    className="w-full h-full object-cover"
                    src={coverImage?.url || userdata?.coverImage || "https://images.unsplash.com/photo-1568605114967-8130f3a36994"}
                    alt="Background"
                />
                <div className="absolute bottom-[-50px] left-6  w-32 h-32 rounded-full bg-white p-2 shadow-md">
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="profile-upload"
                    onChange={(e) => handleFileChange(e, 'profile')}
                  />
                  <label
                    htmlFor="profile-upload"
                    className="cursor-pointer"
                  >
                    <img
                        className="w-full h-full rounded-full object-cover"
                        src={profileImage.url ||  userdata?.profileimg || user}
                    />
                  </label> 
                </div>
                <div className="flex justify-end px-8 mt-4">
                  <span className="hover:bg-gray-200 p-1.5" style={{borderRadius:"50%"}}
                  onClick={()=>setIntroPopup(true)}>
                  <MdOutlineEdit className="text-3xl text-gray-700 hover:cursor-pointer"/>
                  </span>
                </div>
            </div>

        {/* User Details */}
        { userIntro && <div className="flex flex-col justify-center  mt-16 ml-6 mr-2">
          <h2 className="text-2xl font-semibold">
          {userIntro?.name 
                ? ` ${userIntro.name}`
                : userdata?.name ? ` ${userdata.name}`:""}
          </h2>
          {/* Bio Section */}
          <div className="mt-4 w-1/1 flex gap-4 flex-col sm:flex-row mr-3">
            <p className="text-gray-700 w-1/1 sm:w-1/2 mr-2">
            {userIntro?.headline}
            </p>
            <div className="flex gap-4 w-1/1 sm:w-1/2">
              {userIntro?.education && <img src={collegeLogo} alt="" className="h-8 w-8 mt-2"/>}
              <p>
              {userIntro.education}
              </p>
            </div>
          </div>

          <p className="text-black font-semibold mt-2">
            {userIntro.tagline}
          </p>
          <p className="text-gray-500 mt-2">{userIntro.city} {userIntro.country} </p>
          <p className="text-blue mt-2">
          <Link to={`/follow-list/${userdata?.username}`} className="cursor-pointer hover:underline">{userdata?.followers.length} Follower</Link> <span className="text-gray-500"> • </span> <Link to={`/follow-list/${userdata?.username}`} className="cursor-pointer hover:underline">{userdata?.following.length} Following</Link>
          </p>
          {followersCount>0 && 
          <div className="flex items-center my-4">
          {followers?.map((follower, index) => (
               <img
                src={follower?.profileimg ? follower.profileimg : user}
                className={`w-10 h-10 rounded-full border-2 border-gray-200 -ml-2`}
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
            <p
              className="px-4 py-1.5 flex items-center gap-2 text-white  bg-blue mb-2 hover:cursor-pointer"
              style={{ borderRadius: "18px" }} 
              onClick={handleWhatsappClick}
            >
               <span>share</span>
               <FaShare style={{color:"white"}}/>
            </p>
            <p
              className=" px-6 py-1.5 bg-gray-200 text-gray-800 border border-black  hover:bg-gray-300 mb-2 hover:cursor-pointer"
              style={{ borderRadius: "18px" }}
            >
              More
            </p>
           
          </div>
        </div>
      }
      </div>
      
      {introPopup&& <EditIntroForm closeIntroPopup={closeIntroPopup}/>}
      <div className="w-full mt-2 max-w-4xl">
        
         {/*upcoming events */}
        
{events?.length>0 && 
  <div id="controls-carousel" className="relative w-full bg-white p-3 rounded-lg shadow-md mb-2">
  <h1 className="text-2xl font-medium mb-2 text-purple">Your Upcoming Events</h1>
  <div className=" rounded-lg">
    {events?.map((event, index) => (
      <div
        key={index}
        className={`transition-all duration-700 ease-in-out ${
          index === currentIndex ? 'block' : 'hidden'
        }`}
      >
        <EventCard event={event} />
      </div>
    ))}
  </div>

  <button
    type="button"
    className="absolute top-1/2 left-4 transform -translate-y-1/2 z-40 flex items-center justify-center p-2 bg-gray-700/50 rounded-full shadow-lg hover:bg-gray-700/70 focus:outline-none"
    onClick={goToPrev}
  >
    <FaAngleLeft className="text-white w-6 h-6" />
  </button>

  {/* Next Button */}
  <button
    type="button"
    className="absolute top-1/2 right-4 transform -translate-y-1/2 z-40 flex items-center justify-center p-2 bg-gray-700/50 rounded-full shadow-lg hover:bg-gray-700/70 focus:outline-none"
    onClick={goToNext}
  >
    <FaAngleRight className="text-white w-6 h-6" />
  </button>
</div>
}


        {/* About Section */}
        <div className="bg-white p-6 pt-3 rounded-lg shadow-md mb-2">
        <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-semibold">About</h3>
             <span className="hover:bg-gray-200 p-1.5" style={{borderRadius:"50%"}}
             onClick={()=>setAboutPopup(true)}>
                  <MdOutlineEdit className="text-3xl text-gray-700 hover:cursor-pointer"/>
             </span>
        </div>
        {userAbout?.about && <>
          <div className="text-gray-700"
          dangerouslySetInnerHTML={{ __html:  isAboutExpanded
            ? userAbout?.about
            : shortenString(130,userAbout?.about)}}
        />
          <button
            onClick={() => setAboutExpanded(!isAboutExpanded)}
            className="text-blue-600 hover:underline mt-2"
          >
            {isAboutExpanded ? "Show Less" : "Read More"}
          </button>
        </>}
         
        </div>
        {aboutPopup && <EditAboutForm closeAboutpopup={closeAboutpopup}/>}

            {/* Activity Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-2">
        <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-semibold">Activity</h3>
             <button className="px-5 py-1 text-blue border-2 font-semibold border-blue rounded-full focus:outline-none hover:bg-gray-100" onClick={handleOpenPopup}>Create Post</button>
        </div>

          <p className="text-blue cursor-pointer font-semibold mb-2">{userdata?.followers.length} Followers</p>
         

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
                      {userIntro?.name} posted this
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
                      <span className="font-semibold text-gray-600">{userIntro?.name}</span> posted this • <span>🌍</span> {timeAgo(comment?.date)}
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
               
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
            <div className="relative w-full m-2 max-w-md sm:max-w-lg md:max-w-3xl p-1 sm:p-4 bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-scroll">
              <button
                className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full p-2"
                onClick={handleClosePopup}
              >
                <MdClose className="w-6 h-6" />
                <span className="sr-only">Close popup</span>
              </button>
              <div className="p-1 sm:p-5">
                <div className="text-center">
                  <p className="mb-3 text-2xl font-semibold text-slate-900">
                    Create a Post
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Share your thoughts with others.
                  </p>
                </div>
                <textarea class="w-full text-3xl outline-none resize-none p-2 bg-transparent" rows="1"
                placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
                {isImage &&
               <div class="relative inline-block ">
                     <img 
                     src={postImage?.url}
                     alt="Image with close icon"
                     class="w-full h-auto object-contain"
                   />
                   <button 
                     className="text-white bg-black bg-opacity-80 rounded-full p-1 px-2.5"
                     style={{position:"absolute",top:"-16px",right:"-14px"}} 
                     onClick={handleIsImage}
                     aria-label="Close"
                   >
                     ✕
                   </button>
                 </div>
               }
                <div className="flex p-0.5 mb-20 sm:mb-12">
                  <ReactQuill
                    value={postContent}
                    onChange={setPostContent}
                    className="w-full h-64 mt-4"
                    placeholder="What's on your mind?"
                  />
                </div>
                <div className="flex items-center mb-2 justify-end space-x-4">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleMediaChange}
                    className="hidden"
                    id="media-upload"
                  />
                  <label
                    htmlFor="media-upload"
                    className="px-4 py-2 text-white bg-black rounded-full text-sm md:text-base flex items-center cursor-pointer"
                  >
                    <FaImage className="inline w-4 h-4 mr-1" />
                    Media
                  </label>
                  <button
                    className="px-4 py-2 text-white bg-blue rounded-full text-sm md:text-base flex items-center"
                    onClick={handlePost}
                  >
                    <MdPostAdd className="inline w-4 h-4 mr-1" />
                    Post
                  </button>
                  <button
                    className="px-4 py-2 text-gray-500 bg-gray-200 rounded-full text-sm md:text-base"
                    onClick={handleClosePopup}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Education Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-2">
        <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <FaUserGraduate className="mr-2" /> Education
             </h3>
             <span className="hover:bg-gray-200 p-1.5" style={{borderRadius:"50%"}} 
             onClick={handleAddEducation}>
             <AiOutlinePlus className="text-3xl text-gray-700 hover:cursor-pointer"/>
             </span>
        </div>
         {userEducation &&
         userEducation?.map((item,index)=>
           <div className="flex mb-2">
               <img src={item.image} style={{width:"48px",height:"48px",marginRight:"5px"}}/>
              <div className="text-gray-700 w-full">
                    <div className="flex  items-center">
                    <p className="font-bold">
                        {item.institute}
                    </p>
                    <span className="hover:bg-gray-200 p-1.5  ml-2" style={{borderRadius:"50%"}}
                    onClick={()=>handleEditEducation(index)}>
                    <MdOutlineEdit className="text-2xl text-gray-700 hover:cursor-pointer"/>
                    </span>
                    </div>
                    <p>{item.course} - {item.field}</p>
                    <p style={{fontSize:"13px"}}>{item.start_year} - {item.end_year}</p>
                    <p>{item.grade}</p>
             </div>
        </div>
         )
         }
          
        </div>
        {eduPopup&& <EditEducationForm closeEduPopup={closeEduPopup} id={eid}/>}

        {/* Experience Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-2">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
            <FaBriefcase className="mr-2" /> Experience
             </h3>
             <span className="hover:bg-gray-200 p-1.5" style={{borderRadius:"50%"}} 
             onClick={handleAddExperience}>
             <AiOutlinePlus className="text-3xl text-gray-700 hover:cursor-pointer"/>
             </span>
        </div>
        {userExperience &&
          userExperience?.map((item,index)=>
          <div className="flex mb-2 ">
          <img src={item.image} style={{width:"48px",height:"48px",marginRight:"5px"}}/>
         <div className="text-gray-700 w-full border-b border-b-1 pb-2">
               <div className="flex  items-center">
                  <p className="font-bold">{item.title}</p>
                  <span className="hover:bg-gray-200 p-1.5  ml-2" style={{borderRadius:"50%"}}
                  onClick={()=>handleEditExperience(index)}>
                  <MdOutlineEdit className="text-2xl text-gray-700 hover:cursor-pointer"/>
                  </span>
               </div>
               <p>{item.company} . {item.emp_type}</p>
               <p style={{fontSize:"13px"}}>{item.start_month} {item.start_year} - {item.end_month} {item.end_year}</p>
               <p style={{fontSize:"15px"}}>{item.location} · {item.loc_type}</p>
               <div className="mt-2 text-gray-700" 
               dangerouslySetInnerHTML={{ __html:  item.readmore ? item.description
               : shortenString(130,item.description)}}
               />
              <span className="mr-4 float-right text-black hover:cursor-pointer hover:underline" style={{fontSize:"13px"}}onClick={() => handleEpandExp({id:item._id,readmore:!(item.readmore)})}>{item.readmore ? "Show Less" : "Read More"}
             </span>
              
        </div>
         </div>)
        }
        
        </div>
        {expPopup&& <EditExperienceForm closeExpPopup={closeExpPopup} id={expid}/>}

        {/* Skills Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-2">
          <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <FaTools className="mr-2" /> Skills
          </h3>
          <span className="hover:bg-gray-200 p-1.5" style={{borderRadius:"50%"}} 
              onClick={()=>setSkillPopup(true)}>
             <AiOutlinePlus className="text-3xl text-gray-700 hover:cursor-pointer"/>
             </span>
          </div>   
          <div className="flex flex-wrap gap-4 mt-6">
            {skills?.map((item,index)=><Link to="#" className="px-5 py-1 text-black-500 border-2 font-semibold border-black-600 rounded-full focus:outline-none hover:bg-gray-100"> {item}</Link>)}
          </div>
          
        </div>
        {skillPopup&& <EditSkillsForm closeSkillpopup={closeSkillpopup}/>} 
      </div>
      <Toaster/>
    </div>
  );
};

export default ProfileSection;
