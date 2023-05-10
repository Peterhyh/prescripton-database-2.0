import { configureStore } from '@reduxjs/toolkit';
import drugListReducer from '../slice/drugListSlice';

export const store = configureStore({
  reducer: {
    drugList: drugListReducer,
  }
});
