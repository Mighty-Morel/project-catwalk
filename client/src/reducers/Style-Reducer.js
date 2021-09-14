/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 293480,
};

export const styleSlice = createSlice({
  name: 'style',
  initialState,
  reducers: {
    updateItem: (state, action) => {
      state.id = action.payload;
    },
    increment: (state, action) => {
      state.id = action.payload + 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateItem, increment } = styleSlice.actions;

export default styleSlice.reducer;

// the reducers will take in an initial state and an action object.
// the reducers will then return a new form of state or the previous state passed in

// Create a new reducer for each component then add it to the store!
