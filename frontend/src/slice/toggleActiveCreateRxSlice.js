import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    toggle: false
}

export const toggleActiveCreateRxSlice = createSlice({
    name: 'toggleActive',
    initialState,
    reducers: {
        toggleOn: (state) => {
            state.toggle = true;
        },
        toggleOff: (state) => {
            state.toggle = false;
        }
    }
});

export const { toggleOn, toggleOff } = toggleActiveCreateRxSlice.actions;

export default toggleActiveCreateRxSlice.reducer;

