import React from "react";
import Card from "./card";

function Founder() {
  return (
    <>
      <div className="relative flex flex-col items-center">
        <div className="mt-6 ">
          <h1 className="text-black font-serif font-extrabold text-4xl tracking-wide uppercase">
            Our Founder
          </h1>
        </div>
        <div className="flex flex-wrap justify-center">
          <div className="p-8">
            <Card url = "https://media.themoviedb.org/t/p/w440_and_h660_face/9j89QzeC034brQNNJyzogylI56H.jpg"/>
          </div>
          <div className="p-8">
            <Card url = "https://i.pinimg.com/originals/79/1f/ba/791fbac76aaf4eacb3d67fdbe6283643.jpg"/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Founder;
