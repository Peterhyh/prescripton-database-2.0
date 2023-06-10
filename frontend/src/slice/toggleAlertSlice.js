import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    alert: false,
}

export const toggleAlertSlice = createSlice({
    name: 'toggleAlert',
    initialState,
    reducers: {
        toggleAlertOn: (state) => {
            state.alert = true;
        },
        toggleAlertOff: (state) => {
            state.alert = false;
        },
    }
});

export const { toggleAlertOn, toggleAlertOff } = toggleAlertSlice.actions;

export default toggleAlertSlice.reducer;