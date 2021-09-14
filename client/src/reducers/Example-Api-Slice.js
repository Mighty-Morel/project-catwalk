import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const productsSlice = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({ baseUrl: '/products' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/',
    }),
    getProductInfo: builder.query({
      query: (productId) => `/${productId}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery, useGetProductInfoQuery } = productsSlice;

// MY UPDATES ===========================================================

// export const productInfoSlice = createApi({
//   reducerPath: 'products',
//   baseQuery: fetchBaseQuery({ baseUrl: '/products' }),
//   endpoints: (builder) => ({
//     getProductInfo: builder.query({
//       query: (productId) => `/products/${productId}`,
//     }),
//   }),
// });

// export const { useGetProductInfoQuery } = productInfoSlice;


// Define a service using a base URL and expected endpoints
export const stylesSlice = createApi({
  reducerPath: 'styles',
  baseQuery: fetchBaseQuery({ baseUrl: '/products' }),
  endpoints: (builder) => ({
    getStyles: builder.query({
      query: (productId) => `/${productId}/styles`,
    }),
  }),
});

export const { useGetStylesQuery } = stylesSlice;
