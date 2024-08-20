import React, { useState } from 'react';
import { FaUserGraduate, FaBriefcase, FaTools } from 'react-icons/fa';
import user from '../assets/images/user.png';

const ProfileSection = () => {
    // State management for "Read More" toggles
    const [isAboutExpanded, setAboutExpanded] = useState(false);
    const [isExperienceExpanded, setExperienceExpanded] = useState(false);
    const [isSkillsExpanded, setSkillsExpanded] = useState(false);

    return (
        <div className="flex flex-col items-center w-full bg-slate-200 p-6">
            {/* Profile Header Section */}
            <div className="relative w-full bg-blue-700 h-48 rounded-lg mb-12">
                <img
                    className="w-full h-full object-cover rounded-lg"
                    src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
                    alt="Background"
                />
                <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full bg-white p-2 shadow-md">
                    <img
                        className="w-full h-full rounded-full object-cover"
                        src={user}
                        alt="User Profile"
                    />
                </div>
            </div>

            {/* User Details */}
            <div className="flex flex-col justify-center items-center text-center mt-16">
                <h2 className="text-2xl font-semibold">Anurag Singh</h2>
                {/* Bio Section */}
                <div className="mt-4 px-4 w-1/1 sm:w-1/2">
                    <p className="text-gray-700 italic">
                        "Aspiring software engineer with a keen interest in web technologies and cloud computing. Constantly learning and improving my skills, with a goal to contribute to impactful projects in the tech industry."
                    </p>
                </div>

                <p className="text-black font-semibold">3rd Year CSE Student at NIT Jalandhar</p>
                <p className="text-gray-500 mt-2">Jalandhar, India </p>
                <p className="text-gray-500 mt-2"><b>1000+</b> Follower • <b>500+</b> Following</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex space-x-4">
                <button className="px-4 py-2 text-white rounded-lg bg-blue">Follow + </button>
                <button className="px-4 py-2 bg-gray-200 text-blue border border-blue font-semibold  rounded-md hover:bg-gray-300">Message</button>
                <button className="px-4 py-2 bg-gray-200 text-gray-800 border border-black rounded-md hover:bg-gray-300">More</button>
            </div>

            {/* Profile Sections */}
            <div className="w-full mt-12 max-w-4xl">
                {/* About Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
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
                        {isAboutExpanded ? 'Show Less' : 'Read More'}
                    </button>
                </div>

                {/* Education Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center"><FaUserGraduate className="mr-2" /> Education</h3>
                    <div className="text-gray-700">
                        <p className="font-semibold">B.Tech in Computer Science Engineering</p>
                        <p>NIT Jalandhar, 2020 - 2024</p>
                    </div>
                </div>

                {/* Experience Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center"><FaBriefcase className="mr-2" /> Experience</h3>
                    <div className="text-gray-700">
                        <p className="font-semibold">Salesforce Internship</p>
                        <p>May 2023 - July 2023</p>
                        <p className="mt-2">
                            {isExperienceExpanded
                                ? `Worked on various projects involving Salesforce platform and tools, contributing to the development of innovative cloud-based solutions. My responsibilities included developing custom applications using Apex, Visualforce, and Lightning components, as well as integrating Salesforce with third-party APIs. I also gained experience in deploying applications on the Salesforce AppExchange and worked closely with the QA team to ensure high-quality deliverables.`
                                : `Worked on various projects involving Salesforce platform and tools, contributing to the development of innovative cloud-based solutions...`}
                        </p>
                        <button
                            onClick={() => setExperienceExpanded(!isExperienceExpanded)}
                            className="text-blue-600 hover:underline mt-2"
                        >
                            {isExperienceExpanded ? 'Show Less' : 'Read More'}
                        </button>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center"><FaTools className="mr-2" /> Skills</h3>
                    <div className="text-gray-700">
                        <p className="font-semibold">Programming Languages:</p>
                        <p>{isSkillsExpanded ? 'JavaScript, Python, Java, C++, SQL, R' : 'JavaScript, Python, Java...'}</p>
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
                            {isSkillsExpanded ? 'Show Less' : 'Read More'}
                        </button>
                    </div>
                </div>

                {/* Activity Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-lg font-semibold mb-2">Activity</h3>
                    <div className="text-gray-700">
                        {/* Recent Posts */}
                        <div className="mb-6">
                            <h4 className="font-semibold mb-2">Recent Activity</h4>
                            <ul className="space-y-4">
                                <li className="flex space-x-4">
                                    <div className="flex-shrink-0">
                                        <img src="https://via.placeholder.com/50" alt="Post Thumbnail" className="w-12 h-50 "/>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">Aakash Parihar posted this</p>
                                        <p className="text-sm text-gray-500">1 hour ago</p>
                                        <p className="mt-2 text-gray-700">We write our thoughts to entertain people but there are people like Manohar Batra who copy our posts...</p>
                                        <div className="flex space-x-2 mt-2">
                                            <span className="text-blue-500">👍 108</span>
                                            <span className="text-blue-500">💬 35 comments</span>
                    
                                        </div>
                                    </div>
                                </li>
                                <li className="flex space-x-4">
                                    <div className="flex-shrink-0">
                                        <img src="https://via.placeholder.com/50" alt="Post Thumbnail" className="w-12 h-25"/>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">Aakash Parihar posted this</p>
                                        <p className="text-sm text-gray-500">16 hours ago</p>
                                        <p className="mt-2 text-gray-700">Do you know? Why the background of this mail is black?? Because it's Blackmail.</p>
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
                            <a href="#" className="text-blue-600 hover:underline">See all activity</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfileSection;
