import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 48432,
  value: 0,
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    updateItem: (state, action) => {
      state.id = action.payload;
    },
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { updateItem, increment } = questionSlice.actions;

export default questionSlice.reducer;
