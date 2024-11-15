import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userAboutAction } from '../store/userAboutSlice';
import { useSelector } from "react-redux";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import axios from "axios";
import {BACKEND_URL} from "../../url"
const EditAboutForm = ({ closeAboutpopup }) => {
  const dispatch=useDispatch(); 
  const [formData, setFormData] = useState(useSelector(store=>store.userAbout));

  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (content) => {
    setFormData({ ...formData, ['about']: content });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loader
    try {
      const jsonFormData = JSON.stringify(formData);  
      const res = await axios.post(`${BACKEND_URL}/api/users/about`, jsonFormData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log(res);
      
      setIsLoading(false);
      dispatch(userAboutAction.handleUserAbout(formData));
      closeAboutpopup(false);
    } catch (error) {
      console.log(error);
       setIsLoading(false);
      closeAboutpopup(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Fixed size container with scrollable content */}
      <div className="bg-white p-2 sm:p-6 rounded-lg shadow-lg w-[90%] max-w-lg h-[70vh] overflow-y-auto">
        {
          isLoading ?  <div className="flex items-center justify-center h-full">
          <div className="loader animate-spin rounded-full border-t-4 border-blue border-solid h-20 w-20"></div>
        </div>: 
         <>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Edit About</h3>
          <span
            className="hover:bg-gray-200 px-2.5 pb-1"
            style={{ borderRadius: "50%" }}
            onClick={() => closeAboutpopup(false)}
          >
            <button className="text-gray-500 text-3xl">&times;</button>
          </span>
        </div>
          
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="about">
              About
            </label>
            <ReactQuill
             className="border p-1 w-full rounded"
             value={formData.about}
             onChange={handleInputChange}
             placeholder="Enter About you self..."
            />
          </div>

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

export default EditAboutForm;
