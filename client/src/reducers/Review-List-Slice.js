import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reviewsSlice = createApi({
  reducerPath: 'reviewsSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Reviews', 'MetaReviews'],
  endpoints: (build) => ({
    getReviews: build.query({
      query: ({ productId, count, sort }) => (`api/reviews?product_id=${productId}&count=${count}&sort=${sort}`),
      providesTags: (result, error, { id }) => [{ type: 'Reviews', id }],
    }),
    getMetaReviews: build.query({
      query: (productId) => ({ url: `api/reviews/meta?product_id=${productId}` }),
      providesTags: (result, error, { id }) => [{ type: 'MetaReviews', id }],
    }),
    getProductInfo: build.query({
      query: (productId) => ({ url: `products/${productId}` }),
      providesTags: (result, error, { id }) => [{ type: 'ProductInfo', id }],
    }),
  }),
});

export const {
  useGetReviewsQuery, useGetMetaReviewsQuery,
  useGetProductInfoQuery, useAddReviewMutation,
} = reviewsSlice;
