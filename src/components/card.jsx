import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Card() {
  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 ">
      <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-80">
        <img
          src="https://docs.material-tailwind.com/img/team-3.jpg"
          alt="profile-picture"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6 text-center">
        <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          Natalie Paisley
        </h4>
        <p className="block font-sans text-base antialiased font-medium leading-relaxed text-black">
          CEO / Co-Founder
        </p>
      </div>
      <div className="flex justify-center p-6 pt-2 gap-7">
        <a href="#facebook">
          <FontAwesomeIcon icon={faFacebook} className="text-blue-600 text-xl" />
        </a>
        <a href="#twitter">
          <FontAwesomeIcon icon={faTwitter} className="text-light-blue-600 text-xl" />
        </a>
        <a href="#instagram">
          <FontAwesomeIcon icon={faInstagram} className="text-purple-600 text-xl" />
        </a>
      </div>
    </div>
  );
}

export default Card;
