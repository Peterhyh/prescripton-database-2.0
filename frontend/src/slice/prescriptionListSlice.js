import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [],
};

export const prescriptionListSlice = createSlice({
    name: 'prescriptionList',
    initialState,
    reducers: {
        addToList: (state, action) => {
            state.list = action.payload;
        },
    }
});

export const { addToList } = prescriptionListSlice.actions;

export default prescriptionListSlice.reducer;

