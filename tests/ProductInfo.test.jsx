/**
 * @jest-environment jsdom
 */

// Product Info Tests ==============================================
import React from 'react';
import 'whatwg-fetch';
import {
  render, cleanup, waitFor, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import { Provider } from 'react-redux';
import ProductInfo from '../client/src/components/Overview/ProductInfo';
import mockData from './fixtures/OverviewMockData';

const {
  mockProductData, mockStyle, store,
} = mockData;

beforeAll(() => {
  axios.get.mockImplementation((url) => {
    switch (url) {
      case '/products/48432':
        return Promise.resolve(mockProductData);
      case '/products/48432/styles':
        return Promise.resolve(mockStyle);
      default:
        return Promise.reject(new Error('Error - this test is not working'));
    }
  });
});

afterEach(cleanup);

jest.mock('axios');
jest.mock('../client/src/components/Overview/overview.css', () => () => (<div>Placeholder Overview Style</div>));
jest.mock('../client/src/components/Overview/Price.jsx', () => () => (<div>$100</div>));
jest.mock('../client/src/components/Overview/StyleSelector.jsx', () => () => (<div>Styles Placeholder</div>));
jest.mock('../client/src/components/Reviewlist/reviewlist.css', () => () => (<div>Placeholder Reviewlist Style</div>));


// TESTS =======================================================
it('should load and display the selected product data',
  () => axios.get('/products/48432')
    .then((productInfo) => expect(productInfo).toEqual(mockProductData)));

it('should load and display the styles of the product',
  () => axios.get('/products/48432/styles')
    .then((styles) => expect(styles).toEqual(mockStyle)));

it('should load and display the selected product data', () => {
  axios.get('/products/48432');
  const { getByTestId } = render(
    <Provider store={store}>
      <ProductInfo />
    </Provider>,
  );
  // On first render, we expect the "loading" span to be displayed
  expect(getByTestId('loading')).toHaveTextContent('Loading...');
});

it('should load and display the selected product data', async () => {
  render(
    <Provider store={store}>
      <ProductInfo />
    </Provider>,
  );

  axios.get('/products/3/styles')
    .then(async () => {
    // On first render, we expect the "loading" span to be displayed
    // expect(getByTestId('loading')).toHaveTextContent('Loading...');
      const resolvedDiv = await waitFor(() => screen.getByTestId('resolved'));
      const category = await waitFor(() => screen.getByTestId('show-category'));
      const name = await waitFor(() => screen.getByTestId('show-name'));
      const description = await waitFor(() => screen.getByTestId('show-description'));
      console.log(name);
      expect(resolvedDiv).toHaveTextContent('Star Ratings Placeholder');
      expect(category).toHaveTextContent('Pants');
      expect(name).toHaveTextContent('Morning Joggers');
      expect(description).toHaveTextContent('Whether you\'re a morning person or not. Whether you\'re gym bound or not. Everyone looks good in joggers.');
    })
    .catch((err) => console.log(err));
});
