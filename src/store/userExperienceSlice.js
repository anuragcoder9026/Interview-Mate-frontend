import { createSlice } from "@reduxjs/toolkit";

const x=[{
  title: "Software Engineer",
  emp_type: "Internship",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa4Vy2MHI6zbHxDmZiHG17HVgyBCRfZYvM5Q&s",
  company: "Optum",
  start_month:"june",
  start_year: 2025,
  end_month:"Aug",
  end_year: 2026,
  location:"Gurgaon, Haryana, India",
  loc_type:"Hybrid",
  description:"I worked on how can we provid a better experience to users about availibilty of services with more user friendly interface. I work on technologies like React js,Spring boot,etc.",
  readmore:false
},
{
  title: "Software Engineer",
  emp_type: "Fulltime",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa4Vy2MHI6zbHxDmZiHG17HVgyBCRfZYvM5Q&s",
  company: "Amazon",
  start_month:"june",
  start_year: 2025,
  end_month:"Aug",
  end_year: 2026,
  location:"Bengaluru, Karnataka, India",
  loc_type:"Hybrid",
  description:"I worked on how can we provid a better experience to users about availibilty of services with more user friendly interface. I work on technologies like React js,Spring boot,etc.",
  readmore:false
},]
const profileExperienceData = [
];

const userExperienceSlice = createSlice({
  name: "userExperience",
  initialState: profileExperienceData,
  reducers: {
    handleUserExperience: (state, action) => {
          const index = state.findIndex((item) => item._id === action.payload._id);
          state[index] = { ...state[index], ...action.payload };
          return state;
      },  
    handleUserAddExperience:(state,action)=>{
      state=[...state,action.payload];
      return state;
    },
    handleInitExperience:(state,action)=>{
      return action.payload;
    },
    handleExpandExperience:(state,action)=>{
      const index = state.findIndex((item) => item._id === action.payload.id);
      state[index] = { ...state[index], readmore:action.payload.readmore };
      return state;
    },
    handleDeleteExperience: (state, action) => {
          const index = state.findIndex((item) => item._id === action.payload._id);
          state.splice(index, 1);  // Remove the item with the found index
          return state;
      },
  },
});

export const userExperienceAction = userExperienceSlice.actions;
export default userExperienceSlice;
