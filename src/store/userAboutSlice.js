import { createSlice } from "@reduxjs/toolkit";
const profileAboutData = {
    about:"I am a final-year Computer Science Engineering student at NIT Jalandhar with a passion for software development and web technologies. I have developed several projects using modern web frameworks like React.js, and I have a strong foundation in algorithms and data structures. In my spare time, I enjoy contributing to open-source projects and learning about the latest trends in technology." 
  };
  
const userAboutSlice=createSlice({
      name:'userAbout',
      initialState:profileAboutData,
      reducers:{
        handleUserAbout:(state,action)=>{
            console.log("payload:",action.payload);
            return action.payload;
        }
      }
})

export const userAboutAction=userAboutSlice.actions;
export default userAboutSlice;