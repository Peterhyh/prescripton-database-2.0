import { configureStore } from '@reduxjs/toolkit';
import prescriptionListReducer from '../slice/prescriptionListSlice';
import patientListReducer from '../slice/patientSlice';

export const store = configureStore({
  reducer: {
    prescriptionList: prescriptionListReducer,
    patientList: patientListReducer,
  }
});
