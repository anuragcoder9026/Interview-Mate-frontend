import { createSlice } from "@reduxjs/toolkit";
const profileAboutData = {
    
  };
  
const userAboutSlice=createSlice({
      name:'userAbout',
      initialState:profileAboutData,
      reducers:{
        handleUserAbout:(state,action)=>{
            return action.payload;
        }
      }
})

export const userAboutAction=userAboutSlice.actions;
export default userAboutSlice;