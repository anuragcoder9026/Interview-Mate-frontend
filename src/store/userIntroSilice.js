import { createSlice } from "@reduxjs/toolkit";
const profileIntroData = {
    
  };
  
const userIntroSlice=createSlice({
      name:'userIntro',
      initialState:profileIntroData,
      reducers:{
        handleUserIntro:(state,action)=>{
            return action.payload;
        }
      }
})

export const userIntroAction=userIntroSlice.actions;
export default userIntroSlice;