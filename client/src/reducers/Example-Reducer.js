/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 48432,
  productInfo: {},
  expandedView: false,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateProductId: (state, action) => {
      state.id = action.payload;
    },
    updateProductInfo: (state, action) => {
      state.productInfo = action.payload;
    },
    updateView: (state, action) => {
      state.expandedView = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateProductId, updateProductInfo, updateView } = productSlice.actions;

export default productSlice.reducer;

// the reducers will take in an initial state and an action object.
// the reducers will then return a new form of state or the previous state passed in

// Create a new reducer for each component then add it to the store!
