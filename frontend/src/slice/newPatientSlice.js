import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    street: ''
};

const newPatientSlice = createSlice({
    name: 'street',
    initialState,
    reducers: {
        updateStreet: (state, action) => {
            state.street = action.payload
        }
    }
});

export const { updateStreet } = newPatientSlice.actions;

export default newPatientSlice.reducer;