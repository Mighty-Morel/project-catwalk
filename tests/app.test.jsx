/**
 * @jest-environment jsdom
 */

// app.test.jsx - USE THIS AS THE SAMPLE

// See https://reactjs.org/docs/testing-recipes.html for more testing examples
// And here: https://testing-library.com/docs/react-testing-library/example-intro/
import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import axiosMock from 'axios';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from '../client/src/store/store';
import App from '../client/src/components/App';
import ProductInfo from '../client/src/components/ProductInfo';

afterEach(cleanup);

// // Tests with async
// it('test async: renders App on load', async () => {
//   // await updateProduct();
//   const { getByText } = await render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//   );
//   expect(getByText('Hello World! CurrentId is48432and current Style is 293480')).toBeInTheDocument();
// });

// // Tests 1 and 2 are the same
// it('test 1 using getByText: renders App on load', async () => {
//   const { getByText } = await render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//   );
//   expect(getByText('Hello World! CurrentId is48432and current Style is 293480')).toBeInTheDocument();
// });

// it('test 2 using getByTestId: renders App on load', async () => {
//   const { getByTestId } = await render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//   );
//   expect(getByTestId('loadapp')).toHaveTextContent('Hello World! CurrentId is48432');
// });

// test('renders on load', async () => {
//   const { getByText } = await render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//   );
//   expect(getByText('Hello World! CurrentId is48432and current Style is 293480')).toBeInTheDocument();
// });

// Product Info Tests ==============================================
jest.mock('axios');

it('should load and display the selected product data', async () => {
  // What data Axios is to return when `get` is called.
  axios.get.mockResolvedValue({
    data: {
      id: 3,
      name: 'Morning Joggers',
      slogan: 'Make yourself a morning person',
      description: "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
      category: 'Pants',
      default_price: '40',
    },
  });

  const { productId } = 3;
  const url = '/products/3';
  const { getByTestId } = render(
    <Provider store={store}>
      <ProductInfo url={url} />
    </Provider>,
  );

  // On first render, we expect the "loading" span to be displayed
  expect(getByTestId('loading')).toHaveTextContent('Loading...');

  // We need to handle the async nature of an AJAX call by waiting for the
  // element to be rendered.
  const resolvedDiv = await waitFor(() => getByTestId('resolved'));
  const category = await waitFor(() => getByTestId('show-category'));
  const name = await waitFor(() => getByTestId('show-name'));
  const description = await waitFor(() => getByTestId('show-description'));

  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(axiosMock.get).toHaveBeenCalledWith(url);
  expect(resolvedDiv).toHaveTextContent('Star Ratings Placeholder');
  expect(category).toHaveTextContent('Pants');
  expect(name).toHaveTextContent('Morning Joggers');
  expect(description).toHaveTextContent('Whether you\'re a morning person or not. Whether you\'re gym bound or not. Everyone looks good in joggers.');
});
