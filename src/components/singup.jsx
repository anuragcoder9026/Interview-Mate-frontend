import React from 'react';
import onlyFnas from '../assets/images/onlyfans.png'
import toast, { Toaster } from "react-hot-toast";
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {BACKEND_URL} from "../../url"
const SignUpForm = () => {
  const [formData, setData] = useState({ name: "",username: "", email: "", password: "",pconfirm:"",branch:"",year:0,college:"" });
  const [passwordError,setPasswordError]=useState(false);
  const [usernameError,setUsernameError]=useState(false);
  const [emailError,setEmailError]=useState(false);
  const handleChange = evt => {
    const value = evt.target.value;
    setData({
      ...formData,
      [evt.target.name]: value
    });
  };
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(false);
    setUsernameError(false);
    if(formData.password!==formData.pconfirm){
      setPasswordError(true);
      return;
    }
    console.log(formData);
    try {
      const jsonFormData = JSON.stringify(formData); 
      const res = await axios.post(`${BACKEND_URL}/api/users/signup`, jsonFormData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log("resp:",res);
      if(res.status==200){
         window.location.href="https://alokthakur490.github.io/Interview-Mate-frontend/profile"
      }
    } catch (error) {
      console.log(error.response.data.message);
      if(error.response?.data?.message=="Email already exist.")setEmailError(true);
      if(error.response?.data?.message=="Username already exist.")setUsernameError(true);
    }
  }

  const queryParams = new URLSearchParams(location.search);
  const SignUpError = queryParams.get('error');
  const signupwithgoogle = () => {
    window.open(`${BACKEND_URL}/auth/google/signup`, "_self");
  };
  return (
    <div className="min-h-screen bg-gray-50 flex z-50 flex-col justify-center py-12 sm:px-6 lg:px-8 m-6 mt-0 mb-0">
      <Toaster />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Create a new account
        </h2>
      {SignUpError === 'email_exists' && 
                <p style={{ color: 'red', fontWeight: "500",display:"flex",justifyContent:"center",alignItems:"center" ,marginTop:"5px" }}>This User already exists. </p>
      }
      {SignUpError === 'auth_fail' && 
                <p style={{ color: 'red', fontWeight: "500",display:"flex",justifyContent:"center",alignItems:"center" ,marginTop:"5px" }}>Authentication Failed. </p>
      }
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Sign up with Google button */}
          <div className='mb-3'>
            <button
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            onClick={signupwithgoogle}>
              <img
                className="w-5 h-5 mr-2"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
              />
              Sign up with Google
            </button>
          </div>
          <div>
            <button
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              <img
                className="ml-3 w-5 h-5 mr-2"
                src={onlyFnas}
                alt="OnlyFans logo"
              />
              Sign up with OnlyFans
            </button>
          </div>    
          {/* Divider */}
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm leading-5">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* User input form */}
          <form onSubmit={handleSubmit} className="mt-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Username
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="username"
                  name="username"
                  placeholder="alok@nitj"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
            {usernameError&& 
                <p style={{ color: 'red', fontWeight: "500",display:"flex",fontSize:"12px", alignItems:"center" ,marginTop:"5px" }}>This Username already exist</p>
             }
            <div className="mt-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  placeholder="user@example.com"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
            {emailError&& 
                <p style={{ color: 'red', fontWeight: "500",display:"flex",fontSize:"12px", alignItems:"center" ,marginTop:"5px" }}>This Email already exist.</p>
             }
            <div className="mt-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="password_confirmation"
                  name="pconfirm"
                  type="password"
                  required
                  value={formData.pconfirm}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
             {passwordError&& 
                <p style={{ color: 'red', fontWeight: "500",display:"flex",fontSize:"12px", alignItems:"center" ,marginTop:"5px" }}>confirm password does not match</p>
             }
            <div className="mt-6">
              <label
                htmlFor="branch"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Branch Name
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="branch"
                  name="branch"
                  placeholder="Computer Science"
                  type="text"
                  required
                  value={formData.branch}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="year"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Year
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="year"
                  name="year"
                  placeholder="2"
                  type="number"
                  required
                  value={formData.year}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="college"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                College Name
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="college"
                  name="college"
                  placeholder="Your College Name"
                  type="text"
                  required
                  value={formData.college}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  Create account
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
