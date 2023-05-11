import { configureStore } from '@reduxjs/toolkit';
import drugListReducer from '../slice/drugListSlice';
import patientListReducer from '../slice/patientSlice';

export const store = configureStore({
  reducer: {
    drugList: drugListReducer,
    patientList: patientListReducer,
  }
});
