import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../reducers/exampleReducer';

export default configureStore({
  reducer: {
    product: productReducer,
    // add Reducers here!
  },
});

// store will be called in the Provider of the index.jsx file
// this will make it available to all components of app
// Note: You should only add state to the global store if it will be used in multiple parts of
// the application, otherwise simply create a local state for your component.