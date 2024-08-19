import React from "react";
import CustomCard from "./postcard"; // Adjust the path as necessary

function CardGrid() {
  return (
    <div className="bg-slate-200 p-2 sm:p-8">
      <div className="relative flex items-center pt-4">
        <h1 className="pl-2 sm:pl-4 md:pl-6 lg:pl-8 text-3xl sm:text-4xl font-serif font-semibold text-gray-800 mr-4">
          Blogs
        </h1>

        <hr className="border-t-2 border-gray-300 w-full sm:w-3/3" />
      </div>
      <div className="relative flex flex-wrap justify-center gap-6 pt-6 pb-6">
        <CustomCard />
        <CustomCard />
        <CustomCard />
        <CustomCard />
        <CustomCard />
        <CustomCard />
        {/* Add more CustomCard components as needed */}
      </div>
    </div>
  );
}

export default CardGrid;
