/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 293480,
  allStyles: [],
  style: {},
  photos: [],
};

export const styleSlice = createSlice({
  name: 'style',
  initialState,
  reducers: {
    // updateStyleId: (state, action) => {
    //   state.id = action.payload;
    // },
    updateStyle: (state, action) => {
      state.style = action.payload;
      state.photos = action.payload.photos;
      state.id = action.payload.style_id;
    },
    updateStyles: (state, action) => {
      state.allStyles = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateStyleId, updateStyles, updateStyle } = styleSlice.actions;

export default styleSlice.reducer;
