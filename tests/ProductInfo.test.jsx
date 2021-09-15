/**
 * @jest-environment jsdom
 */

// Product Info Tests ==============================================

import React from 'react';
import {
  render, cleanup, waitFor, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import { Provider } from 'react-redux';
import ProductInfo from '../client/src/components/ProductInfo';
import store from '../client/src/store/store';

beforeAll(() => {
  axios.get.mockImplementation((url) => {
    switch (url) {
      case '/products/3':
        return Promise.resolve(mockProductData);
      case '/products/3/styles':
        return Promise.resolve(mockStyleData);
      default:
        return Promise.reject(new Error('Error - this test is not working'));
    }
  });
});

afterEach(cleanup);

jest.mock('axios');
jest.mock('../client/src/components/Price.jsx', () => () => (<div>$100</div>));
jest.mock('../client/src/components/StyleSelector.jsx', () => () => (<div>Styles Placeholder</div>));

const mockProductData = {
  id: 3,
  name: 'Morning Joggers',
  slogan: 'Make yourself a morning person',
  description: "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
  category: 'Pants',
  default_price: '40',
};

const mockStyleData = {
  product_id: '1',
  results: [
    {
      style_id: 293480,
      name: 'Desert Brown & Tan',
      original_price: '140.00',
    },
    {
      style_id: 123456,
      name: 'Testing only',
      original_price: '0',
    },
    {
      style_id: 654321,
      name: 'Testing 2',
      original_price: '10.00',
    },
  ],
};

// TESTS =======================================================
it('should load and display the selected product data',
  () => axios.get('/products/3')
    .then((productInfo) => expect(productInfo).toEqual(mockProductData)));

it('should load and display the styles of the product',
  () => axios.get('/products/3/styles')
    .then((styles) => expect(styles).toEqual(mockStyleData)));

it('should load and display the selected product data', () => {
  axios.get('/products/3');
  const { getByTestId } = render(
    <Provider store={store}>
      <ProductInfo />
    </Provider>,
  );
    // On first render, we expect the "loading" span to be displayed
  expect(getByTestId('loading')).toHaveTextContent('Loading...');
  // const resolvedDiv = await waitFor(() => screen.getByTestId('resolved'));
  // const category = await waitFor(() => screen.getByTestId('show-category'));
  // const name = await waitFor(() => screen.getByTestId('show-name'));
  // const description = await waitFor(() => screen.getByTestId('show-description'));

  // expect(resolvedDiv).toHaveTextContent('Star Ratings Placeholder');
  // expect(category).toHaveTextContent('Pants');
  // expect(name).toHaveTextContent('Morning Joggers');
  // expect(description).toHaveTextContent('Whether you\'re a morning person or not. Whether you\'re gym bound or not. Everyone looks good in joggers.');
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

// it('should load and display the selected product data', async () => {
//   // What data Axios is to return when `get` is called.

//   axios.get.mockResolvedValue(mockProductData);

//   const url = '/products/3';
//   const { getByTestId } = render(
//     <Provider store={store}>
//       <ProductInfo url={url} />
//     </Provider>,
//   );

//   // On first render, we expect the "loading" span to be displayed
//   expect(getByTestId('loading')).toHaveTextContent('Loading...');
//   // We need to handle the async nature of an AJAX call by waiting for the
//   // element to be rendered.
//   const allStyles = { results: [1, 2, 3, 4] };
//   const resolvedDiv = await waitFor(() => getByTestId('resolved'));
//   const category = await waitFor(() => getByTestId('show-category'));
//   const name = await waitFor(() => getByTestId('show-name'));
//   const description = await waitFor(() => getByTestId('show-description'));

//   expect(axios.get).toHaveBeenCalledTimes(1);
//   expect(axios.get).toHaveBeenCalledWith(url);
//   expect(resolvedDiv).toHaveTextContent('Star Ratings Placeholder');
//   expect(category).toHaveTextContent('Pants');
//   expect(name).toHaveTextContent('Morning Joggers');
//   expect(description).toHaveTextContent('Whether you\'re a morning person or not. Whether you\'re gym bound or not. Everyone looks good in joggers.');
// });

// it('should load and display the selected styles data', async () => {

//   const url = '/products/3';
//   const { getByTestId } = render(
//     <Provider store={store}>
//       <ProductInfo url={url} />
//     </Provider>,
//   );
//   axios.get.mockResolvedValueOnce(mockStyleData);
//   axios.get.mockResolvedValueOnce(mockStyleData);

//   // On first render, we expect the "loading" span to be displayed
//   expect(getByTestId('loading')).toHaveTextContent('Loading...');
//   // We need to handle the async nature of an AJAX call by waiting for the
//   // element to be rendered.
//   const resolvedDiv = await waitFor(() => getByTestId('resolved'));
//   const category = await waitFor(() => getByTestId('show-category'));
//   const name = await waitFor(() => getByTestId('show-name'));
//   const description = await waitFor(() => getByTestId('show-description'));

//   expect(axios.get).toHaveBeenCalledTimes(1);
//   expect(axios.get).toHaveBeenCalledWith(url);
//   expect(resolvedDiv).toHaveTextContent('Star Ratings Placeholder');
//   expect(category).toHaveTextContent('Pants');
//   expect(name).toHaveTextContent('Morning Joggers');
//   expect(description).toHaveTextContent('Whether you\'re a morning person or not. Whether you\'re gym bound or not. Everyone looks good in joggers.');
// });
