import React from "react";
import CustomCard from "./postcard"; // Adjust the path as necessary

function CardGrid() {
  return (
    <div className="relative flex flex-wrap justify-center gap-6 p-6 bg-white">
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
