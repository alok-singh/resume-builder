import { configureStore } from '@reduxjs/toolkit';
import buildPageReducer from './build-resume-slice';

export default configureStore({
  reducer: {
    buildPage: buildPageReducer,
  },
})