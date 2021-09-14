import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using the questions and answers base url and expected endpoints
export const questionsSlice = createApi({
  reducerPath: 'questions',
  baseQuery: fetchBaseQuery({ baseUrl: '/qa/questions' }),
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: () => '/',
    }),
  }),
});

// Export questions hooks for usage in functional components
export const { useGetQuestionsQuery } = questionsSlice;
