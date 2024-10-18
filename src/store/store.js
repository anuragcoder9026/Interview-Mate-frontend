import {configureStore} from '@reduxjs/toolkit';
import userIntroSlice from './userIntroSilice';
import userAboutSlice from './userAboutSlice';
import userEducationSlice from './userEducationSlice';
export const InterviewMateStore=configureStore({
      reducer:{
        userIntro:userIntroSlice.reducer,
        userAbout:userAboutSlice.reducer,
        userEducation:userEducationSlice.reducer
      }
})

export default InterviewMateStore;