import { createSlice } from "@reduxjs/toolkit";
const profileEducationData = [
{
    course:"Batchler of technology",
    field:"computer science",
    image:"https://feualabang.edu.ph/assets/features/34/Pt6wH.png",
    institute:"Dr B R Ambedkar National Institute of Technology, Jalandhar",
    start_year:2022,
    end_year:2026,
    grade:"8.45 cgpa"
}
];
  
const userEducationSlice=createSlice({
      name:'userEducation',
      initialState:profileEducationData,
      reducers:{
        handleUserEducation:(state,action)=>{
            console.log("payload:",action.payload);
            return action.payload;
        }
      }
})

export const userEducationAction=userEducationSlice.actions;
export default userEducationSlice;