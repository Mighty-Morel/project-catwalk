import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../reducers/Example-Reducer';
import styleReducer from '../reducers/Style-Reducer';
import { reviewsSlice } from '../reducers/Review-List-Slice';
// import { setupListeners } from '@reduxjs/toolkit/query';

export default configureStore({
  reducer: {
    product: productReducer,
    style: styleReducer,
    // [reviewsSlice.reducerPath]: reviewsSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reviewsSlice.middleware),
});

// setupListeners(store.dispatch)
