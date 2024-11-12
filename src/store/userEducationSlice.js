import { createSlice } from "@reduxjs/toolkit";

const x=[{
  course: "Bachelor of Technology",
  field: "Computer Science",
  image: "https://feualabang.edu.ph/assets/features/34/Pt6wH.png",
  institute: "Dr B R Ambedkar National Institute of Technology, Jalandhar",
  start_year: 2022,
  end_year: 2026,
  grade: "8.45 CGPA",
},
{
  course: "High School",
  field: "Science Stream",
  image: "https://feualabang.edu.ph/assets/features/34/Pt6wH.png",
  institute: "Vardhman Public School, Mirzapur",
  start_year: 2018,
  end_year: 2019,
  grade: "96 Percent",
},]
const profileEducationData = [
];

const userEducationSlice = createSlice({
  name: "userEducation",
  initialState: profileEducationData,
  reducers: {
    handleUserEducation: (state, action) => {
      const index = state.findIndex((item) => item._id === action.payload._id);
        state[index] = { ...state[index], ...action.payload };
        return state;
    },
    handleUserAddEducation:(state,action)=>{
      state=[action.payload,...state];
      return state;
    },
    handleInitEducation:(state,action)=>{
      return action.payload;
    },
    handleDeleteEducation: (state, action) => {
      const index = state.findIndex((item) => item._id === action.payload._id);
        state.splice(index, 1);  // Remove the item with the found index
        return state;
    },
    
  },
});

export const userEducationAction = userEducationSlice.actions;
export default userEducationSlice;
