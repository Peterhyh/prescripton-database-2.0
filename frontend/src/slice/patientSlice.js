import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [],
}

export const patientSlice = createSlice({
    name: 'patientSlice',
    initialState,
    reducers: {
        addToPatientList: (state, action) => {
            state.list = action.payload;
        }
    }
});

export const { addToPatientList } = patientSlice.actions;

export default patientSlice.reducer;