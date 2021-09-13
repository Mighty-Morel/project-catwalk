/**
 * @jest-environment jsdom
 */

// app.test.jsx - USE THIS AS THE SAMPLE

// See https://reactjs.org/docs/testing-recipes.html for more testing examples
// And here: https://testing-library.com/docs/react-testing-library/example-intro/
import React from 'react';
import {render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import axiosMock from 'axios';
import store from '../client/src/store/store';
import { Provider } from 'react-redux';
import App from '../client/src/components/App';
import ProductInfo from '../client/src/components/ProductInfo';

afterEach(cleanup);

// Tests 1 and 2 are the same
it('test 1 using getByText: renders App on load', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(getByText('Hello World! CurrentId is48432')).toBeInTheDocument();
});

it('test 2 using getByTestId: renders App on load', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(getByTestId('loadapp')).toHaveTextContent('Hello World! CurrentId is48432');
});

test('renders on load', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(getByText('Hello World! CurrentId is48432')).toBeInTheDocument();
});
