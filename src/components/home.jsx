import React from "react";
import CreatePost from "./createpost";
import CardGrid from "../components/homearrangecard";
import ProfileCard from "./ProfileCard";
import { useUserContext } from "../context/usercontext";
import GetStarted from "./getStarted";
import socket from "../../socket";
function Home() {
  const {userdata,setOnlineStatus}=useUserContext();
  socket.on('userOnlineStatus', ({ userId, online }) => {
    setOnlineStatus((prev) => ({ ...prev, [userId]: online }));
  });
  return (
    <div className="flex justify-center">
      {
        !userdata ? <GetStarted/> : <div className="flex flex-col lg:flex-row w-full max-w-6xl lg:space-x-1 space-y-4 lg:space-y-0 pt-2">
        {/* Profile Card */}
        <div className="lg:flex-shrink-0 px-2" >
          <ProfileCard />
        </div>
        {/* CreatePost and CardGrid */}
        <div className="flex-grow flex flex-col space-y-4 px-0">
          <div className="px-2 sm:px-1">
            <CreatePost />
          </div>
          <div className="px-1 sm:px-1">
            <CardGrid />
          </div>
        </div>
      </div>
      }
    </div>
  );
}

export default Home;