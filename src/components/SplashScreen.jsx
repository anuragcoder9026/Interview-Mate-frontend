import React from 'react';
import logo from "../assets/images/logo.png"
import LoadingBar from './LoadingBar';
const SplashScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-700">
           <div>
            <img
              src={logo}
              alt="Logo"
              style={{
                width:"240px",
                height:"100px"
              }}
            />
            <LoadingBar/>
        </div>
    </div>
  );
};

export default SplashScreen;
