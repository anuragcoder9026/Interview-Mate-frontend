import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userEducationAction } from '../store/userEducationSlice';
import { useSelector } from "react-redux";
import axios from "axios"
import {BACKEND_URL} from "../../url"
const EditEducationForm = ({closeEduPopup,id}) => {
  const dispatch=useDispatch(); 
  const eduImage="https://feualabang.edu.ph/assets/features/34/Pt6wH.png"
  // Form state
  const data=(id==-1)?{image: eduImage,}:useSelector(store=>store.userEducation)[id];
  
  const [formData, setFormData] = useState(data);

  // Loader state
  const [isLoading, setIsLoading] = useState(false);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
     setIsLoading(true); // Show loader
    try {
      const jsonFormData = JSON.stringify({id:id,education:formData});  
      const res = await axios.post(`${BACKEND_URL}/api/users/education`, jsonFormData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      setIsLoading(false);
       if(id==-1)dispatch(userEducationAction.handleUserAddEducation(formData)); 
       else dispatch(userEducationAction.handleUserEducation(formData)); 
       closeEduPopup(false); // Close the popup
    } catch (error) {
      console.log(error);
       setIsLoading(false);
       closeEduPopup(false);
    }
  };

  const handleDelete = async(e) => {
    e.preventDefault();
    setIsLoading(true); // Show loader
    try {
      const jsonFormData = JSON.stringify({educationId:formData._id});  
      const res = await axios.post(`${BACKEND_URL}/api/users/delete-education`, jsonFormData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      setIsLoading(false);
      dispatch(userEducationAction.handleDeleteEducation({id:id,...formData})); 
      closeEduPopup(false); // Close the popup
    } catch (error) {
      setIsLoading(false);
      closeEduPopup(false); // Close the popup
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
          <h3 className="text-xl font-semibold">{id==-1?'Add':'Edit'} Education</h3>
          <span
            className="hover:bg-gray-200 px-2.5 pb-1"
            style={{ borderRadius: "50%" }}
            onClick={() => closeEduPopup(false)}
          >
            <button className="text-gray-500 text-3xl">&times;</button>
          </span>
        </div>
          
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="institute">
              School/College
            </label>
            <input
              type="text"
              id="institute"
              name="institute"
              className="border p-1 w-full rounded"
              defaultValue={id==-1?"":formData?.institute}
              onChange={handleInputChange}
              required
            />
          </div>
         
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="course">
              Degree
            </label>
            <input
              type="text"
              id="course"
              name="course"
              className="border p-1 w-full rounded"
              defaultValue={id==-1?"":formData?.course}
              onChange={handleInputChange}
              placeholder="Enter your course here"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="field"> 
              Field of Study
            </label>
            <div className="flex mb-2">
              <input
                type="text"
                id="field"
                name="field"
                className="border p-1 w-full rounded"
                defaultValue={id==-1?"":formData?.field}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="start_year">
              Start Year
            </label>
            <input
              type="number"
              id="start_year"
              name="start_year"
              className="border p-1 w-full rounded"
              defaultValue={id==-1?undefined:formData.start_year}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="end_year">
              End Year
            </label>
            <input
              type="number"
              id="end_year"
              name="end_year"
              className="border p-1 w-full rounded"
              defaultValue={id==-1?undefined:formData.end_year}
              onChange={handleInputChange}
              required
            />
          </div>

          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="grade">Grade</label>
            <div className="flex mb-2">
              <input
                type="text"
                id="grade"
                name="grade"
                className="border p-1 w-full rounded"
                defaultValue={id==-1?"":formData.grade}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className={`flex ${id!=-1?'justify-between':'justify-end'}`}>
           { id!=-1&& <button
              type="submit"
              className="px-4 py-1.5 text-white bg-red-500 mb-2 hover:cursor-pointer"
              style={{ borderRadius: "18px" }}
              onClick={handleDelete}
            >
              delete
            </button>
            } 
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

export default EditEducationForm;
