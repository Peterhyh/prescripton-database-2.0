import { configureStore } from '@reduxjs/toolkit';
import prescriptionListReducer from '../slice/prescriptionListSlice';
import patientListReducer from '../slice/patientSlice';
import toggleActiveCreateRxReducer from '../slice/toggleActiveCreateRxSlice';

export const store = configureStore({
  reducer: {
    prescriptionList: prescriptionListReducer,
    patientList: patientListReducer,
    toggleActiveCreateRx: toggleActiveCreateRxReducer,
  }
});
