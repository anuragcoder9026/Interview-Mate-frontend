import React, { useState } from "react";
import user from "../assets/images/user.png";
import { FaChevronLeft } from "react-icons/fa"; // Importing icon for toggling
import CircularChart from "../utils/CircularChart";
import HorizontalBarChart from "../utils/HorizontalBarChart";
import ScrollChart from "../utils/scrollChart";
import { Link } from "react-router-dom";

const ResponsiveDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside
        className={`transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "w-full lg:w-1/5" : "h-25 lg:w-16"
        } bg-gradient-to-b from-indigo-600 to-purple-600 text-white p-4 lg:p-6 relative flex-shrink-0`}
      >
        {/* Toggle Button */}
        <button
          onClick={handleToggleSidebar}
          className="absolute top-2 right-2 p-2 bg-gray-800 rounded-full hover:bg-gray-700"
        >
          <FaChevronLeft
            className={`text-white transition-transform duration-300 ${
              isSidebarOpen ? "rotate-270 lg:rotate-180" : "rotate-90 lg:rotate-0"
            }`}
          />
        </button>

        {/* Sidebar Content */}
        {
            isSidebarOpen && <div className="flex flex-col  h-full mt-5">
            <div className="mb-4">
              <h1 className="text-2xl font-extrabold">My Dashboard</h1>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold">User Info</h2>
              <p className="mt-2">Name: Anurag</p>
              <p>Total Quizzes: 10</p>
              <p>Total Interviews: 5</p>
            </div>
            <nav>
              <ul>
                <li className="mb-4">
                  <a href="#" className="text-lg font-medium hover:text-gray-300">
                    Recent Quizzes
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="text-lg font-medium hover:text-gray-300">
                    Recent Interviews
                  </a>
                </li>
                <li>
                  <a href="#" className="text-lg font-medium hover:text-gray-300">
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        }
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 p-4 lg:p-8 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-1/5" : "ml-2"
        }`}
      >
        {/* Header */}
        <header className="mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <h1 className="text-2xl lg:text-3xl font-extrabold mb-4 lg:mb-0">
              Welcome, Anurag!
            </h1>
            {/* <div className="flex items-center space-x-4">
              <span className="font-medium">Anurag</span>
              <img
                src={user}
                alt="Profile"
                className="rounded-full w-12 h-12 border-4 border-indigo-600"
              />
            </div> */}
          </div>
          <div className="mt-4 flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6">
            <a href="#" className="p-3 bg-blue-900 rounded-xl shadow-md text-lg hover:text-indigo-400 font-medium">
              Dashboard
            </a>
            <a href="#" className="p-3 bg-blue-900 rounded-xl shadow-md text-lg hover:text-indigo-400 font-medium">
              Quizzes
            </a>
          
            <Link to="/interview" className="p-3 bg-blue-900 rounded-xl shadow-md text-lg hover:text-indigo-400 font-medium">
              Interviews
            </Link>
          </div>
        </header>

        {/* Performance Overview */}
        <section className="mb-8">
          <h2 className="text-xl lg:text-2xl font-semibold mb-4">Performance Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Quizzes Section */}
            <div className="bg-gray-800 p-4 lg:p-6 rounded-lg shadow-lg">
              <h3 className="text-lg lg:text-xl font-bold text-indigo-400 mb-4">Quizzes</h3>
              <div className="flex gap-5 h-24 lg:h-40 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg">
                 <div className="flex justify-center items-center w-1/2">
                      <CircularChart value={95} color={'orange'}/>
                 </div>
                 <div className="flex justify-center items-center w-1/2 ">
                      <CircularChart value={85} color={'green'}/>
                 </div>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-blue-900 rounded-xl shadow-md">
                  <p className="font-semibold">Highest Score: 95%</p>
                </div>
                <div className="p-3 bg-blue-900 rounded-xl shadow-md">
                  <p className="font-semibold">Average Score: 85%</p>
                </div>
              </div>
            </div>

            {/* Interviews Section */}
            <div className="bg-gray-800 p-4 lg:p-6 rounded-lg shadow-lg">
              <h3 className="text-lg lg:text-xl font-bold text-indigo-400 mb-4">Interviews</h3>
              <div className="flex gap-5 h-24 lg:h-40 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg">
              <div className="flex justify-center items-center w-1/2 ">
                     <HorizontalBarChart value={8} color={'yellow'}/>
                 </div>
                 <div className="flex justify-center items-center w-1/2 ">
                 <HorizontalBarChart value={5} color={'red'}/>
                 </div>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-green-900 rounded-xl shadow-md">
                  <p className="font-semibold">Technical Skills: 8/10</p>
                </div>
                <div className="p-3 bg-green-900 rounded-xl shadow-md">
                  <p className="font-semibold">Communication: 5/10</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-xl lg:text-2xl font-semibold mb-4">Recent Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recent Quizzes */}
            <div className="bg-gray-800 p-4 lg:p-4 rounded-lg shadow-lg">
              <h3 className="text-lg lg:text-xl font-bold text-indigo-400 mb-4">Recent Quizzes</h3>
              <ul>
                <li className="flex mb-2"><span className="font-bold text-green-400 mr-3">Quiz 1</span><ScrollChart value={85} color={'orange'}/> 85%</li>
                <li className="flex mb-2"><span className="font-bold text-green-400 mr-3">Quiz 2</span><ScrollChart value={45} color={'green'}/> 90%</li>
                <li className="flex"><span className="font-bold text-green-400 mr-3">Quiz 3</span><ScrollChart value={75} color={'blue'}/> 88%</li>
              </ul>
            </div>

            {/* Recent Interviews */}
            <div className="bg-gray-800 p-4 lg:p-6 rounded-lg shadow-lg">
              <h3 className="text-lg lg:text-xl font-bold text-indigo-400 mb-4">Recent Interviews</h3>
              <ul>
              <li className="flex mb-2 w-full"><span className="font-bold text-sm text-green-400 mr-3">Interview 1</span><ScrollChart value={9*10} color={'red'}/> 9/10</li>
                <li className="flex mb-2 w-full"><span className="font-bold text-sm text-green-400 mr-3">Interview 2</span><ScrollChart value={7*10} color={'yellow'}/> 7/10</li>
                <li className="flex w-full"><span className="font-bold text-sm text-green-400 mr-3">Interview 3</span><ScrollChart value={8*10} color={'violet'}/> 8/10</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResponsiveDashboard;
