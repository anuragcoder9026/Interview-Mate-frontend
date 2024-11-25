import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import { useUserContext } from '../context/usercontext';
import { useDispatch } from 'react-redux';
import { userIntroAction } from "../store/userIntroSilice"; 
import { userAboutAction } from '../store/userAboutSlice';
import { userEducationAction } from '../store/userEducationSlice';
import { userExperienceAction } from '../store/userExperienceSlice';
import { userSkillAction } from '../store/userSkillSlice';
import { userFollowingAction } from "../store/userFollowing";
import socket from "../../socket";
import {BACKEND_URL} from "../../url"
const LoginPopup = () => {
  
  const { setUserdata ,setUnseenMessageCount,setUnseenNotificationCount,setUserEvents} = useUserContext();
  const dispatch=useDispatch(); 
  const navigate =useNavigate();
  const [formData, setData] = useState({email: "", password: ""});
  const [loginError,setLoginError]=useState(null);
  const [loading,setLoading]=useState(false);
  const handleChange = evt => {
    const value = evt.target.value;
    setData({
      ...formData,
      [evt.target.name]: value
    });
  };
  
  const handleUnseenMessagesCount=async()=>{
    try { 
      const res = await axios.get(`${BACKEND_URL}/api/users/unseen-messages-count`, {
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);
    setLoading(true);
    try {
      const jsonFormData = JSON.stringify(formData); 
      console.log("data:",jsonFormData);
      const response = await axios.post(`${BACKEND_URL}/api/users/login`, jsonFormData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if(response.status==200){
        setUserdata(response.data.user);
        const notifications=response.data.user?.notifications.length;
        const readNotifications= response.data.user?.readNotifications.length;
        setUnseenNotificationCount(notifications-readNotifications);
        dispatch(userFollowingAction.handleInitFollowing(response.data.user.following));
        dispatch(userIntroAction.handleUserIntro(response.data.user.intro)); 
        dispatch(userAboutAction.handleUserAbout({about:response.data.user.about}));
        dispatch(userEducationAction.handleInitEducation(response.data.user.educations));
        dispatch(userExperienceAction.handleInitExperience(response.data.user.experiences));
        dispatch(userSkillAction.handleInitSkill(response.data.user.skills));
        socket.emit('join', response.data.user?._id);
        handleUnseenMessagesCount();
        setLoading(false);
         navigate("/profile");
      }
    } catch (error) {
      console.log(error.response.data.message);
      console.log(error)
      setLoading(false);
      if(error.response?.data?.message) setLoginError(error.response?.data?.message);
    }
    
  }
  const loginwitgoogle = () => {
    window.open(`${BACKEND_URL}/auth/google/signin`, "_self");
  };
  return (
    <div
      id="login-popup"
      tabIndex="-1"
      className="overflow-y-auto overflow-x-hidden h-full flex items-center justify-center"
    >
      <div className="w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white shadow px-4">
          <div className="p-5">
            <div className="text-center">
              <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                Login to your account
              </p>
              <p className="mt-2 text-sm leading-4 text-slate-600">
                You must be logged in to perform this action.
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-2">
              <button
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <img
                  src="https://www.svgrepo.com/show/512317/github-142.svg"
                  alt="GitHub"
                  className="h-[18px] w-[18px]"
                />
                Continue with GitHub
              </button>

              <button
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={loginwitgoogle} // Close popup when this button is clicked
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-[18px] w-[18px]"
                />
                Continue with Google
              </button>

              <button
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <img
                  src="https://www.svgrepo.com/show/448234/linkedin.svg"
                  alt="LinkedIn"
                  className="h-[18px] w-[18px]"
                />
                Continue with LinkedIn
              </button>
            </div>

            <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
              <div className="h-px w-full bg-slate-200"></div>
              OR
              <div className="h-px w-full bg-slate-200"></div>
            </div>

            <form className="w-full" onSubmit={handleLogin}>
              {/* Close popup when the form is submitted */}
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Email Address"
              />
              {loginError&& loginError=="Email does not match"&&
                <p style={{ color: 'red', fontWeight: "500",display:"flex",fontSize:"12px", alignItems:"center" ,marginTop:"5px" }}>Email does not match</p>
             }
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Password"
              />
              {loginError&& loginError=="Password does not match"&&
                <p style={{ color: 'red', fontWeight: "500",display:"flex",fontSize:"12px", alignItems:"center" ,marginTop:"5px" }}>Password does not match</p>
             }
              <p className="mb-3 mt-2 text-sm text-gray-500">
                <a
                  href="/forgot-password"
                  className="text-blue-800 hover:text-blue-600"
                >
                  Reset your password?
                </a>
              </p>
               
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
              >
                {loading && <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 "></span>}
                Continue
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              Don't have an account?
              <Link
                to="/signup"
                className="font-medium text-[#4285f4] "
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
