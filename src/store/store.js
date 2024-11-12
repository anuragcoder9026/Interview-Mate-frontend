import {configureStore} from '@reduxjs/toolkit';
import userIntroSlice from './userIntroSilice';
import userAboutSlice from './userAboutSlice';
import userEducationSlice from './userEducationSlice';
import userExperienceSlice from './userExperienceSlice';
import userSkillSlice from './userSkillSlice';
import userFollowingSlice from './userFollowing';
export const InterviewMateStore=configureStore({
      reducer:{
        userIntro:userIntroSlice.reducer,
        userAbout:userAboutSlice.reducer,
        userEducation:userEducationSlice.reducer,
        userExperience:userExperienceSlice.reducer,
        userSkill:userSkillSlice.reducer,
        userFollowing:userFollowingSlice.reducer
      }
})

export default InterviewMateStore;