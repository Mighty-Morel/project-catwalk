/**
 * @jest-environment jsdom
 */
import React from 'react';
import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import { Provider } from 'react-redux';
import OverviewRatings from '../client/src/components/Overview/OverviewRatings';
import mockData from './fixtures/OverviewMockData';

// MOCK ALL COMPONENT AND CSS IMPORTS TO ISOLATE OVERVIEW COMPONENT ====================
jest.mock('../client/src/components/Reviewlist/reviewlist.css', () => () => (<div>Placeholder Reviewlist Style</div>));


// SETUP MOCK SERVER ======================================================================
const { store, mockRatingsData } = mockData;

// declare which API requests to mock
const server = setupServer(
  rest.get('api/reviews/meta', (req, res, ctx) => {
    const query = req.url.searchParams;
    const product_id = query.get('product_id');
    res(ctx.json(mockRatingsData));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// OVERVIEW STAR RATINGS TEST  =============================================================

jest.mock('../client/src/reducers/Review-List-Slice', () => {
  const reviewsSlice = {
    useGetMetaReviewsQuery: (productId) => {
      const result = {
        isLoading: false,
        isSuccess: true,
        data: mockRatingsData,
        isError: false,
      };
      return result;
    },
  };
  return reviewsSlice;
});

test('number of reviews should reflect the number of ratings for the product', async () => {
  const { getByText } = render(
    <Provider store={store}>
      <OverviewRatings productId={48432} />
    </Provider>,
  );

  expect(screen.getByTestId('rating')).toHaveTextContent('Read all 146 reviews');
});
