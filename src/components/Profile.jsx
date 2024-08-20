import React, { useState } from "react";
import { FaUserGraduate, FaBriefcase, FaTools } from "react-icons/fa";
import user from "../assets/images/user.png";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { CgMoreO } from "react-icons/cg";
const ProfileSection = () => {
  // State management for "Read More" toggles
  const [isAboutExpanded, setAboutExpanded] = useState(false);
  const [isExperienceExpanded, setExperienceExpanded] = useState(false);
  const [isSkillsExpanded, setSkillsExpanded] = useState(false);
  const followers = [
    { id: 1, src: "path/to/follower1.png" },
    { id: 2, src: "path/to/follower2.png" },
    { id: 3, src: "path/to/follower3.png" },
    // Add more followers as needed
  ];

  const [activeTab, setActiveTab] = useState("posts"); // Default active tab
  const handleClick = (tab) => {
    setActiveTab(tab);
  };

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
                        src="https://c4.wallpaperflare.com/wallpaper/383/633/300/sybil-kailena-davina-e-sybille-y-sybil-a-hd-wallpaper-preview.jpg"
                        alt="User Profile"
                    />
                </div>
            </div>

        {/* User Details */}
        <div className="flex flex-col justify-center  mt-16 ml-6 mr-2">
          <h2 className="text-2xl font-semibold">Bibhuti Ranjan</h2>
          {/* Bio Section */}
          <div className="mt-4 w-1/1 sm:w-1/2">
            <p className="text-gray-700 italic">
              "Aspiring software engineer with a keen interest in web
              technologies and cloud computing. Constantly learning and
              improving my skills, with a goal to contribute to impactful
              projects in the tech industry."
            </p>
          </div>

          <p className="text-black font-semibold mt-2">
            3rd Year CSE Student at NIT Jalandhar
          </p>
          <p className="text-gray-500 mt-2">Jalandhar, India </p>
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
              style={{ borderRadius: "18px" }}
            >
              Follow +{" "}
            </p>
            <p
              className="hidden sm:block px-4 py-1.5 bg-gray-200 text-blue border border-blue font-semibold  hover:bg-gray-300 mb-2 hover:cursor-pointer"
              style={{ borderRadius: "18px" }}
            >
              Message
            </p>
            <p
              className="hidden sm:block px-6 py-1.5 bg-gray-200 text-gray-800 border border-black  hover:bg-gray-300 mb-2 hover:cursor-pointer"
              style={{ borderRadius: "18px" }}
            >
              More
            </p>
            <BiMessageRoundedDetail className="block sm:hidden text-4xl text-blue mt-1 ml-3 mr-3 hover:cursor-pointer " />
            <CgMoreO className="block sm:hidden text-3xl text-gray-500 mt-1 ml-6 hover:cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="w-full mt-2 max-w-4xl">
        {/* About Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-2">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-gray-700">
            {isAboutExpanded
              ? `I am a final-year Computer Science Engineering student at NIT Jalandhar with a passion for software development and web technologies. I have developed several projects using modern web frameworks like React.js, and I have a strong foundation in algorithms and data structures. In my spare time, I enjoy contributing to open-source projects and learning about the latest trends in technology.`
              : `I am a final-year Computer Science Engineering student at NIT Jalandhar with a passion for software development and web technologies...`}
          </p>
          <button
            onClick={() => setAboutExpanded(!isAboutExpanded)}
            className="text-blue-600 hover:underline mt-2"
          >
            {isAboutExpanded ? "Show Less" : "Read More"}
          </button>
        </div>

        {/* Education Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-2">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <FaUserGraduate className="mr-2" /> Education
          </h3>
          <div className="text-gray-700">
            <p className="font-semibold">
              B.Tech in Computer Science Engineering
            </p>
            <p>NIT Jalandhar, 2022 - 2026</p>
          </div>
        </div>

        {/* Experience Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-2">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <FaBriefcase className="mr-2" /> Experience
          </h3>
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

        {/* Activity Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-2">
          <h3 className="text-lg font-semibold">Activity</h3>
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
      </div>
    </div>
  );
};

export default ProfileSection;
