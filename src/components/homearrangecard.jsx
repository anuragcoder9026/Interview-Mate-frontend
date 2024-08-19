import React from "react";
import CustomCard from "./postcard"; // Adjust the path as necessary

function CardGrid() {
  return (
    <div className="relative flex flex-wrap justify-center gap-6 p-2 sm:p-6 bg-gray-900">
      <CustomCard />
      <CustomCard />
      <CustomCard />
      <CustomCard />
      <CustomCard />
      <CustomCard />
      {/* Add more CustomCard components as needed */}
    </div>
  );
}

export default CardGrid;
