import React, { useState } from "react";
import { FaUserGraduate, FaBriefcase, FaTools } from "react-icons/fa";
import user from "../assets/images/user.png";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { CgMoreO } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/usercontext"; // Import the context
import collegeLogo from "../assets/images/LogoNIT.png";
import { MdOutlineEdit } from "react-icons/md";
import EditIntroForm from "./editIntro";
import { useSelector } from "react-redux";
import EditAboutForm from "./editAbout";
const ProfileSection = () => {
  // State management for "Read More" toggles
  const [isAboutExpanded, setAboutExpanded] = useState(false);
  const [isExperienceExpanded, setExperienceExpanded] = useState(false);
  const [isSkillsExpanded, setSkillsExpanded] = useState(false);
  const [isFollow,setFollow]=useState(true);
  const followers = [
    { id: 1, src: "path/to/follower1.png" },
    { id: 2, src: "path/to/follower2.png" },
    { id: 3, src: "path/to/follower3.png" },
    // Add more followers as needed
  ];
  const shortenString = str => str.length > 130 ? str.slice(0, 130) + "..." : str;
  const [activeTab, setActiveTab] = useState("posts"); 
  const handleClick = (tab) => {
    setActiveTab(tab);
  };
  const userIntro=useSelector(store=>store.userIntro);
  const userAbout=useSelector(store=>store.userAbout);
  const userEducation=useSelector(store=>store.userEducation);
  
  const { userdata } = useUserContext(); 
  const [editPopup,setEditPopup]=useState(false);
  const [aboutPopup,setAboutPopup]=useState(false);
  const closeEditpopup=(data)=>{
    setEditPopup(data);
  }
  const closeAboutpopup=(data)=>{
    setAboutPopup(data);
  }
    return (
        <div className="flex flex-col items-center w-full bg-slate-200 p-2">
            {/* Profile Header Section */}
            <div className=' w-full max-w-4xl bg-white pb-5 rounded-lg'>
            <div className="relative w-full bg-blue-700 h-48 rounded-lg mb-12 bg-white">
                <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
             
                    alt="Background"
                />
                <div className="absolute bottom-[-50px] left-6  w-32 h-32 rounded-full bg-white p-2 shadow-md">
                    <img
                        className="w-full h-full rounded-full object-cover"
                        src={userdata? userdata?.profileimg : user}
                        alt="User Profile"
                    />
                </div>
                <div className="flex justify-end px-8 mt-4">
                  <span className="hover:bg-gray-200 p-1.5" style={{borderRadius:"50%"}}
                  onClick={()=>setEditPopup(true)}>
                  <MdOutlineEdit className="text-3xl text-gray-700 hover:cursor-pointer"/>
                  </span>
                </div>
            </div>

        {/* User Details */}
        <div className="flex flex-col justify-center  mt-16 ml-6 mr-2">
          <h2 className="text-2xl font-semibold">
          {userdata && userdata.name
                ? ` ${userdata.name}`
                : "Bibhuti Ranjan"}
          </h2>
          {/* Bio Section */}
          <div className="mt-4 w-1/1 flex gap-4 flex-col sm:flex-row mr-3">
            <p className="text-gray-700 w-1/1 sm:w-1/2 mr-2">
            {userIntro?.headline}
            </p>
            <div className="flex gap-4 w-1/1 sm:w-1/2">
              <img src={collegeLogo} alt="" className="h-8 w-8 mt-2"/>
              <p>
              {userIntro.education}
              </p>
            </div>
          </div>

          <p className="text-black font-semibold mt-2">
            {userIntro.tagline}
          </p>
          <p className="text-gray-500 mt-2">{userIntro.city} {userIntro.country} </p>
          <p className="text-gray-500 mt-2">
            <b>1000+</b> Follower • <b>500+</b> Following
          </p>

          <div className="flex items-center my-4">
            {followers.map((follower, index) => (
              <img
                key={follower.id}
                src={user}
                className={`w-10 h-10 rounded-full border-2 border-white ${
                  index !== 0 ? "-ml-4" : ""
                }`}
              />
            ))}
            <p className="text-gray-500 ml-1 mr-2 text-sm">
              Followed by <b>Alok Kumar,Bibhuti Ranjan</b> and 122 others{" "}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-wrap space-x-2 sm:space-x-4">
            <p
              className="px-4 py-1.5 text-white  bg-blue mb-2 hover:cursor-pointer"
              style={{ borderRadius: "18px" }} onClick={()=>setFollow(!isFollow)}
            >
                {isFollow?"Follow+ ":"✓ Following"}
              
            </p>
            
            <Link
              to='/message'
              className="hidden sm:block px-4 py-1.5 bg-gray-200 text-blue border border-blue font-semibold  hover:bg-gray-300 mb-2 hover:cursor-pointer"
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
            <Link to="/message"><BiMessageRoundedDetail className="block sm:hidden text-4xl text-blue mt-1 ml-3 mr-3 hover:cursor-pointer " /></Link>
            <CgMoreO className="block sm:hidden text-3xl text-gray-500 mt-1 ml-6 hover:cursor-pointer" />
          </div>
        </div>
      </div>
      
      {editPopup&& <EditIntroForm closeEditpopup={closeEditpopup}/>}
      <div className="w-full mt-2 max-w-4xl">
        
        {/* About Section */}
        <div className="bg-white p-6 pt-3 rounded-lg shadow-md mb-2">
        <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-semibold">About</h3>
             <span className="hover:bg-gray-200 p-1.5" style={{borderRadius:"50%"}}
             onClick={()=>setAboutPopup(true)}>
                  <MdOutlineEdit className="text-3xl text-gray-700 hover:cursor-pointer"/>
             </span>
        </div>
          <p className="text-gray-700">
            {isAboutExpanded
              ? userAbout?.about
              : shortenString(userAbout?.about)
              }
          </p>
          <button
            onClick={() => setAboutExpanded(!isAboutExpanded)}
            className="text-blue-600 hover:underline mt-2"
          >
            {isAboutExpanded ? "Show Less" : "Read More"}
          </button>
        </div>
        {aboutPopup && <EditAboutForm closeAboutpopup={closeAboutpopup}/>}

            {/* Activity Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-2">
        <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-semibold">Activity</h3>
             <button className="px-5 py-1 text-blue border-2 font-semibold border-blue rounded-full focus:outline-none hover:bg-gray-100">Create Post</button>
        </div>

          <p className="text-gray-500 font-semibold mb-2">858 Followers</p>
          <p
            className="px-4 py-1.5 bg-gray-200 text-gray-700 border border-gray-400 hover:bg-gray-300 mb-2 hover:cursor-pointer"
            style={{ borderRadius: "18px", width: "120px" }}
          >
            ✓ Following
          </p>

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
              <h4 className="font-semibold mb-2">Recent Activity</h4>
              <ul className="space-y-4">
                <li className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="Post Thumbnail"
                      className="w-12 h-50 "
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      Aakash Parihar posted this
                    </p>
                    <p className="text-sm text-gray-500">1 hour ago</p>
                    <p className="mt-2 text-gray-700">
                      We write our thoughts to entertain people but there are
                      people like Manohar Batra who copy our posts...
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <span className="text-blue-500">👍 108</span>
                      <span className="text-blue-500">💬 35 comments</span>
                    </div>
                  </div>
                </li>
                <hr />
                <li className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="Post Thumbnail"
                      className="w-12 h-25"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      Aakash Parihar posted this
                    </p>
                    <p className="text-sm text-gray-500">16 hours ago</p>
                    <p className="mt-2 text-gray-700">
                      Do you know? Why the background of this mail is black??
                      Because it's Blackmail.
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <span className="text-blue-500">👍 68</span>
                      <span className="text-blue-500">💬 7 comments</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* See All Activity Link */}
            <div className="text-center">
              <a href="#" className="text-blue-600 hover:underline">
                See all activity
              </a>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-2">
        <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <FaUserGraduate className="mr-2" /> Education
             </h3>
             <span className="hover:bg-gray-200 p-1.5" style={{borderRadius:"50%"}}>
                  <MdOutlineEdit className="text-3xl text-gray-700 hover:cursor-pointer"/>
             </span>
        </div>
         {
         userEducation.map((item,index)=>
           <div className="flex">
               <img src={item.image} style={{width:"48px",height:"48px",marginRight:"5px"}}/>
              <div className="text-gray-700 w-full">
                    <p className="font-bold">
                        {item.institute}
                    </p>
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
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
            <FaBriefcase className="mr-2" /> Experience
             </h3>
             <span className="hover:bg-gray-200 p-1.5" style={{borderRadius:"50%"}}>
                  <MdOutlineEdit className="text-3xl text-gray-700 hover:cursor-pointer"/>
             </span>
        </div>
          <div className="text-gray-700">
            <p className="font-semibold">Salesforce Internship</p>
            <p>May 2025 - July 2025</p>
            <p className="mt-2">
              {isExperienceExpanded
                ? `Worked on various projects involving Salesforce platform and tools, contributing to the development of innovative cloud-based solutions. My responsibilities included developing custom applications using Apex, Visualforce, and Lightning components, as well as integrating Salesforce with third-party APIs. I also gained experience in deploying applications on the Salesforce AppExchange and worked closely with the QA team to ensure high-quality deliverables.`
                : `Worked on various projects involving Salesforce platform and tools, contributing to the development of innovative cloud-based solutions...`}
            </p>
            <button
              onClick={() => setExperienceExpanded(!isExperienceExpanded)}
              className="text-blue-600 hover:underline mt-2"
            >
              {isExperienceExpanded ? "Show Less" : "Read More"}
            </button>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-2">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <FaTools className="mr-2" /> Skills
          </h3>
          <div className="text-gray-700">
            <p className="font-semibold">Programming Languages:</p>
            <p>
              {isSkillsExpanded
                ? "JavaScript, Python, Java, C++, SQL, R"
                : "JavaScript, Python, Java..."}
            </p>
            {isSkillsExpanded && (
              <>
                <p className="mt-4 font-semibold">Web Technologies:</p>
                <p>React.js, Node.js, Express, MongoDB, HTML, CSS</p>
                <p className="mt-4 font-semibold">Tools & Platforms:</p>
                <p>Git, Docker, Jenkins, AWS, Salesforce, Firebase</p>
              </>
            )}
            <button
              onClick={() => setSkillsExpanded(!isSkillsExpanded)}
              className="text-blue-600 hover:underline mt-2"
            >
              {isSkillsExpanded ? "Show Less" : "Read More"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileSection;
