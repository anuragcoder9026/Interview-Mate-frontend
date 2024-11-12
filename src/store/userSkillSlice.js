import { createSlice } from "@reduxjs/toolkit";
const profileSkillData = []
  
const userSkillSlice=createSlice({
      name:'userSkill',
      initialState:profileSkillData,
      reducers:{
        handleUserSkill:(state,action)=>{
            state=[...state,action.payload];
            return state;
        },
        handleInitSkill:(state,action)=>{
          return action.payload;
        },
      }
})

export const userSkillAction=userSkillSlice.actions;
export default userSkillSlice;