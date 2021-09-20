/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 293480,
  allStyles: [],
  style: {},
  photos: [],
  skus: {},
};

export const styleSlice = createSlice({
  name: 'style',
  initialState,
  reducers: {
    updateStyle: (state, action) => {
      state.style = action.payload;
      state.id = action.payload.style_id;
      state.photos = action.payload.photos;
      // eslint-disable-next-line prefer-destructuring
      state.skus = action.payload.skus;
    },
    updateStyles: (state, action) => {
      state.allStyles = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateStyles, updateStyle } = styleSlice.actions;

export default styleSlice.reducer;
