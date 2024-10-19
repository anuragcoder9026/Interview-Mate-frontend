import { createSlice } from "@reduxjs/toolkit";
const profileIntroData = {
    city: "Jalandhar I, Punjab",
    country: "India",
    current_position: "Software Engineer",
    education: "Dr. Br. Ambedkar National Institute of Technology, Jalandhar, Punjab, India, 144011",
    headline: "Upcoming Intern @Optum | Pre final year Student at NIT Jalandhar | NITJ CSE 26 | Full stack Web Development | DSA | 3 ⭐ Leetcode | Python | C | C++ | Java | Rajbhasa Club | #web #dsa #mern #sde",
    industry: "Microsoft",
    name: "ANURAG SINGH",
    pronouns: "He/Him",
    tagline: "3rd Year CSE Student at NIT Jalandhar"
  };
  
const userIntroSlice=createSlice({
      name:'userIntro',
      initialState:profileIntroData,
      reducers:{
        handleUserIntro:(state,action)=>{
            console.log("payload:",action.payload);
            return action.payload;
        }
      }
})

export const userIntroAction=userIntroSlice.actions;
export default userIntroSlice;