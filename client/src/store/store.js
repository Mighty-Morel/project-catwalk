import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../reducers/Example-Reducer';
import styleReducer from '../reducers/Style-Reducer';
import { productsSlice, stylesSlice } from '../reducers/Example-Api-Slice';

export default configureStore({
  reducer: {
    product: productReducer,
    [productsSlice.reducerPath]: productsSlice.reducer,
    // add Reducers here!
    style: styleReducer,
    [stylesSlice.reducerPath]: stylesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(productsSlice.middleware, stylesSlice.middleware),
});

// store will be called in the Provider of the index.jsx file
// this will make it available to all components of app
// Note: You should only add state to the global store if it will be used in multiple parts of
// the application, otherwise simply create a local state for your component.
