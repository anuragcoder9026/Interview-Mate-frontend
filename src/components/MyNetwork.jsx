import React from 'react';
import MenageNetworkCard from "../components/ManageNetworkCard";
import NetworkGrid from './NetworkGrid';
import ShowFollowers from './showFollowers';
const MyNetwork = () => {
  return (
    <div className="bg-gray-100 flex justify-center px-0 pt-4">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl lg:space-x-1 space-y-4 lg:space-y-0">
        {/* Profile Card */}
        <div className="lg:flex-shrink-0 px-2"  >
          <MenageNetworkCard />
          <ShowFollowers/>
        </div>
        {/* CreatePost and CardGrid */}
        <div className="flex-grow flex flex-col space-y-4 px-0">
          <div className="px-1 sm:px-1">
            <NetworkGrid/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNetwork;
