import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userIntroAction } from '../store/userIntroSilice';
import { useSelector } from "react-redux";
import axios from "axios"
import {BACKEND_URL} from "../../url"
const EditIntroForm = ({ closeIntroPopup }) => {
  const dispatch=useDispatch(); 
  
  // Form state
  const [formData, setFormData] = useState(useSelector(store=>store.userIntro));

  // Loader state
  const [isLoading, setIsLoading] = useState(false);

  // Pronouns options
  const pronounOptions = ["He/Him", "She/Her", "They/Them", "Custom"];

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loader
    try {
      const jsonFormData = JSON.stringify(formData);  
      const res = await axios.post(`${BACKEND_URL}/api/users/intro`, jsonFormData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      setIsLoading(false);
      dispatch(userIntroAction.handleUserIntro(formData)); 
      closeIntroPopup(false);
    } catch (error) {
      console.log(error);
      closeIntroPopup(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Fixed size container with scrollable content */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg h-[80vh] overflow-y-auto">
        {
          isLoading ?  <div className="flex items-center justify-center h-full">
          <div className="loader animate-spin rounded-full border-t-4 border-blue border-solid h-20 w-20"></div>
        </div>: 
         <>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Edit intro</h3>
          <span
            className="hover:bg-gray-200 px-2.5 pb-1"
            style={{ borderRadius: "50%" }}
            onClick={() => closeIntroPopup(false)}
          >
            <button className="text-gray-500 text-3xl">&times;</button>
          </span>
        </div>
          
        <form onSubmit={handleSubmit} className="mt-4">
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border p-1 w-full rounded"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Pronouns */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="pronouns">
              Pronouns
            </label>
            <select
              id="pronouns"
              name="pronouns"
              className="border p-1 w-full rounded"
              value={formData.pronouns}
              onChange={handleInputChange}
            >
              {pronounOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Headline */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="headline">
              Headline
            </label>
            <textarea
              id="headline"
              name="headline"
              className="border p-1 w-full rounded"
              value={formData.headline}
              onChange={handleInputChange}
              rows="3"
              placeholder="Enter your headline here..."
            />
          </div>

          {/* Tagline */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="tagline">
              Tagline (Max 45 characters)
            </label>
            <input
              type="text"
              id="tagline"
              name="tagline"
              className="border p-1 w-full rounded"
              value={formData.tagline}
              onChange={handleInputChange}
              placeholder="Enter your tagline here..."
              maxLength={45}
              required
            />
          </div>

          {/* Current Position */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor='current_position'>
              Current Position
            </label>
            <div className="flex mb-2">
              <input
                type="text"
                id="current_position"
                name="current_position"
                className="border p-1 w-full rounded"
                value={formData.current_position}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Industry */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="industry">
              Company/Institute Name
            </label>
            <input
              type="text"
              id="industry"
              name="industry"
              className="border p-1 w-full rounded"
              value={formData.industry}
              onChange={handleInputChange}
              placeholder="Select your industry"
            />
          </div>

          {/* Education */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor='education'>Education</label>
            <div className="flex mb-2">
              <input
                type="text"
                id="education"
                name="education"
                className="border p-1 w-full rounded"
                value={formData.education}
                onChange={handleInputChange}
              />
            </div>
          
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="country">
              Country/Region
            </label>
            <input
              type="text"
              id="country"
              name="country"
              className="border p-1 w-full rounded"
              value={formData.country}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="city">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="border p-1 w-full rounded"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-1.5 text-white bg-blue mb-2 hover:cursor-pointer"
              style={{ borderRadius: "18px" }}
            >
              Save
            </button>
          </div>
        </form>
        </>
}
      </div>
    </div>
  );
};

export default EditIntroForm;
