import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userExperienceAction } from '../store/userExperienceSlice';
import { useSelector } from "react-redux";
import axios from "axios";
import {BACKEND_URL} from "../../url"
const EditExperienceForm = ({closeExpPopup,id}) => {
  const dispatch=useDispatch(); 
  const expImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa4Vy2MHI6zbHxDmZiHG17HVgyBCRfZYvM5Q&s";
  // Form state
  const data=(id==-1)?{image: expImage,readmore:false}:useSelector(store=>store.userExperience)[id];
  
  const [formData, setFormData] = useState({readmore:false,...data});
  const EmpTypeOptions = ["Please Select","Full-Time", "Part-Time", "Internship", "Trainee"];
  const LocTypeOptions = ["Please Select","On-Site","Hybrid","Remote"] ;
  const MonthOptions = [["Month", "Month"],["Jan", "January"],["Feb", "February"],["Mar", "March"],["Apr", "April"],["May", "May"],["Jun", "June"],["Jul", "July"],["Aug", "August"],["Sep", "September"],["Oct", "October"],["Nov", "November"],["Dec", "December"]];
  
  // Loader state
  const [isLoading, setIsLoading] = useState(false);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
     setIsLoading(true);
    try {
      const jsonFormData = JSON.stringify({id:id,experience:formData});  
      const res = await axios.post(`${BACKEND_URL}/api/users/experience`, jsonFormData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log(res);
      
      setIsLoading(false);
       if(id==-1)dispatch(userExperienceAction.handleUserAddExperience(formData)); 
       else dispatch(userExperienceAction.handleUserExperience(formData)); 
       closeExpPopup(false);// Close the popup
    } catch (error) {
      console.log(error);
      setIsLoading(false);
       closeExpPopup(false);
    }
  };
  const handleDelete = async(e) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      const jsonFormData = JSON.stringify({experienceId:formData._id});  
      const res = await axios.post(`${BACKEND_URL}/api/users/delete-experience`, jsonFormData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log(res);
      setIsLoading(false);
      dispatch(userExperienceAction.handleDeleteExperience(formData)); 
      closeExpPopup(false); // Close the popup
    } catch (error) {
      setIsLoading(false);
      closeExpPopup(false); // Close the popup
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
          <h3 className="text-xl font-semibold">{id==-1?'Add':'Edit'} Experience</h3>
          <span
            className="hover:bg-gray-200 px-2.5 pb-1"
            style={{ borderRadius: "50%" }}
            onClick={() => closeExpPopup(false)}
          >
            <button className="text-gray-500 text-3xl">&times;</button>
          </span>
        </div>
          
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-2">
            <label className="block text-sm font-medium mb-2" htmlFor="title">
              Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="border p-1 w-full rounded"
              defaultValue={id==-1?"":formData?.title}
              onChange={handleInputChange}
              placeholder="Ex- Software Engineer"
              required
            />
          </div>
           
          <div className="mb-2">
            <label className="block text-sm font-medium mb-2" htmlFor="emp_type">
              Employment Type
            </label>
            <select
              id="emp_type"
              name="emp_type"
              className="border p-1 w-full rounded"
              defaultValue={id==-1?"Please Select":formData?.emp_type}
              onChange={handleInputChange}
            >
            {EmpTypeOptions.map((option) => (<option key={option} value={option}>{option}</option>))}
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium mb-2" htmlFor="company">
              Company Name*
            </label>
            <input
              type="text"
              id="company"
              name="company"
              className="border p-1 w-full rounded"
              defaultValue={id==-1?"":formData?.company}
              onChange={handleInputChange}
              placeholder="Enter your work Company here.."
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium mb-2" htmlFor="location"> 
              Location
            </label>
            <div className="flex mb-2">
              <input
                type="text"
                id="location"
                name="location"
                className="border p-1 w-full rounded"
                defaultValue={id==-1?"":formData?.location}
                onChange={handleInputChange}
                placeholder="Ex- Gurgaon, Haryana, India"
                required
              />
            </div>
          </div>
           
          <div className="mb-2">
            <label className="block text-sm font-medium mb-2" htmlFor="loc_type">
              Location Type
            </label>
            <select
              id="loc_type"
              name="loc_type"
              className="border p-1 w-full rounded"
              defaultValue={id==-1?"Please Select":formData?.loc_type}
              onChange={handleInputChange}
            >
            {LocTypeOptions.map((option) => (<option key={option} value={option}>{option}</option>))}
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium mb-2" htmlFor="start_month">
              Start Month
            </label>
            <select
              id="start_month"
              name="start_month"
              className="border p-1 w-full rounded"
              defaultValue={id==-1?"Month":formData?.start_month}
              onChange={handleInputChange}
            >
            {MonthOptions.map((option) => (<option key={option[0]} value={option[0]}>{option[1]}</option>))}
            </select>
          </div>
          
          <div className="mb-2">
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
          
          <div className="mb-2">
            <label className="block text-sm font-medium mb-2" htmlFor="end_month">
              End Month
            </label>
            <select
              id="end_month"
              name="end_month"
              className="border p-1 w-full rounded"
              defaultValue={id==-1?"Month":formData?.end_month}
              onChange={handleInputChange}
            >
            {MonthOptions.map((option) => (<option key={option[0]} value={option[0]}>{option[1]}</option>))}
            </select>
          </div>

          <div className="mb-2">
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

          
          <div className="mb-2">
            <label className="block text-sm font-medium mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="border p-1 w-full rounded"
              defaultValue={id==-1?"":formData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Enter your desciption here..."
            />
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

export default EditExperienceForm;
