import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../reducers/Example-Reducer';
import { productsSlice } from '../reducers/Example-Api-Slice';

export default configureStore({
  reducer: {
    product: productReducer,
    [productsSlice.reducerPath]: productsSlice.reducer,
    // add Reducers here!
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsSlice.middleware),
});

// store will be called in the Provider of the index.jsx file
// this will make it available to all components of app
// Note: You should only add state to the global store if it will be used in multiple parts of
// the application, otherwise simply create a local state for your component.
