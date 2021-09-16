import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reviewsSlice = createApi({
  reducerPath: 'reviewsSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  tagTypes: ['Reviews', 'MetaReviews'],
  endpoints: (build) => ({
    getReviews: build.query({
      query: (productId, count = 5, sort = 'helpful') => (`reviews?product_id=${productId}&count=${count}&sort=${sort}`),
      providesTags: (result, error, id) => [{ type: 'Reviews', id }],
    }),
    getMetaReviews: build.query({
      query: (productId) => ({ url: `reviews/meta?product_id=${productId}` }),
      providesTags: (result, error, id) => [{ type: 'MetaReviews', id }],
    }),
  }),
});

export const { useGetReviewsQuery, useGetMetaReviewsQuery } = reviewsSlice;
