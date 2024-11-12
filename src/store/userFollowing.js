import { createSlice } from "@reduxjs/toolkit";
const followingData = []
  
const userFollowingSlice=createSlice({
      name:'userFollowing',
      initialState:followingData,
      reducers:{
        handleAddUserFollowing:(state,action)=>{
            state=[...state,action.payload];
            return state;
        },
        handleDeleteFollowing: (state, action) => {
           const index = state.findIndex((item) => item._id === action.payload);
            state.splice(index, 1);
            return state;
        },
        handleInitFollowing:(state,action)=>{
          return action.payload;
        },
      }
})

export const userFollowingAction=userFollowingSlice.actions;
export default userFollowingSlice;