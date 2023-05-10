import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [],
};

export const drugListSlice = createSlice({
    name: 'drugList',
    initialState,
    reducers: {
        addToList: (state, action) => {
            state.list = action.payload;
        },
    }
});

export const { addToList } = drugListSlice.actions;

export default drugListSlice.reducer;

