/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 293480,
  allStyles: {},
};

export const styleSlice = createSlice({
  name: 'style',
  initialState,
  reducers: {
    updateStyleId: (state, action) => {
      state.id = action.payload;
    },
    updateStyles: (state, action) => {
      state.allStyles = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateStyleId, updateStyles } = styleSlice.actions;

export default styleSlice.reducer;

// the reducers will take in an initial state and an action object.
// the reducers will then return a new form of state or the previous state passed in

// Create a new reducer for each component then add it to the store!
