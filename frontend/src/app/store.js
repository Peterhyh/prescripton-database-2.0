import { configureStore } from '@reduxjs/toolkit';
import prescriptionListReducer from '../slice/prescriptionListSlice';
import patientListReducer from '../slice/patientSlice';
import toggleActiveCreateRxReducer from '../slice/toggleActiveCreateRxSlice';
import toggleAlertReducer from '../slice/toggleAlertSlice';
import newPatientReducer from '../slice/newPatientSlice';

export const store = configureStore({
  reducer: {
    prescriptionList: prescriptionListReducer,
    patientList: patientListReducer,
    toggleActiveCreateRx: toggleActiveCreateRxReducer,
    toggleAlert: toggleAlertReducer,
    streetAddress: newPatientReducer,
  }
});
