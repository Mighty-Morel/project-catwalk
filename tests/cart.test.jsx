/**
 * @jest-environment jsdom
 */
// Import this sample server data for your tests
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  act, render, waitFor, screen, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import { Provider } from 'react-redux';
import store from '../client/src/store/store';
import App from '../client/src/components/App';
import AddToCartFeatures from '../client/src/components/Overview/AddToCart';

jest.mock('../client/src/components/Overview/overview.css', () => () => (<div>Placeholder Overview Style</div>));
jest.mock('../client/src/components/Overview/ProductInfo', () => () => (<div>Placeholder Product Info</div>));
jest.mock('../client/src/components/Overview/Gallery', () => () => (<div>Placeholder Gallery</div>));
jest.mock('../client/src/components/Q&A/QuestionsAndAnswers', () => () => (<div>Placeholder Questions And Answers</div>));
jest.mock('../client/src/components/Q&A/questions.css', () => () => (<div>Placeholder Questions And Answers Style</div>));
jest.mock('../client/src/components/Related/RelatedItems', () => () => (<div>Placeholder Questions And Answers</div>));
jest.mock('../client/src/components/Reviewlist/reviewlist.css', () => () => (<div>Review List Style</div>));
jest.mock('../client/src/components/Reviewlist/Review-list', () => () => (<div>Placeholder Review List</div>));
jest.mock('../client/src/reducers/Review-List-Slice.js', () => () => (<div>Review List Slice Placeholder</div>));

// MOCK DATA FOR TESTS =========================================================
const mockProductData = {
  id: 48432,
  name: 'Morning Joggers',
  slogan: 'Make yourself a morning person',
  description: "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
  category: 'Pants',
  default_price: '40',
};

const mockStyleData = {
  product_id: '48432',
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

const mockStyle = {
  style_id: 293480,
  name: 'Forest Green & Black',
  original_price: '140.00',
  sale_price: null,
  'default?': true,
  photos: [{
    thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  },
  {
    thumbnail_url: 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    url: 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80',
  }],
  skus: {
    1702764: { quantity: 8, size: 'XS' },
    1702765: { quantity: 16, size: 'S' },
    1702766: { quantity: 17, size: 'M' },
    1702767: { quantity: 10, size: 'L' },
    1702768: { quantity: 15, size: 'XL' },
  },
};

const mockCartData = [
  {
    sku_id: 1702764,
    count: '1',
  },
  {
    sku_id: 1702799,
    count: '3',
  },
  {
    sku_id: 1702925,
    count: '7',
  },
];

// SETUP MOCK SERVER =============================================================
// declare which API requests to mock
const server = setupServer(
  rest.get('/products/48432', (req, res, ctx) => res(ctx.json(mockProductData))),
  rest.get('/products/48432/styles', (req, res, ctx) => res(ctx.json(mockStyleData))),
  rest.get('/cart', (req, res, ctx) => res(ctx.json(mockCartData))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// TESTS =============================================================

test('renders App on load', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  await waitFor(() => screen.getByText('Hello World! CurrentId is 48432 and current Style is 293480'));

  expect(screen.getByText('Placeholder Product Info')).toBeInTheDocument();
});

// test('handlers server error', async () => {
//   server.use(
//     rest.get('/products/48432', (req, res, ctx) => res(ctx.status(500))),
//   );

//   // ...
// });

test('renders Add to Cart Button on load', async () => {
  const { findAllByRole } = render(
    <Provider store={store}>
      <AddToCartFeatures style={mockStyle} />
    </Provider>,
  );

  await act(() => findAllByRole('menuitem'));

  expect(screen.getByTestId('addToCart')).toBeVisible();
});

test('shows error message on click if no size selected', async () => {
  const { findAllByRole } = render(
    <Provider store={store}>
      <AddToCartFeatures style={mockStyle} />
    </Provider>,
  );

  await act(() => findAllByRole('menuitem'));

  fireEvent.click(screen.getByTestId('addToCart'));
  expect(screen.getByText('Please select a size')).toBeInTheDocument();
});

test('quantity dropdown is no longer disabled when a size is selected', async () => {
  const { findAllByRole } = render(
    <Provider store={store}>
      <AddToCartFeatures style={mockStyle} />
    </Provider>,
  );

  // await act(() => findAllByRole('menuitem'));
  // 1702764: { quantity: 8, size: 'XS' },
  fireEvent.click(screen.getByTestId('1702764'));
  await act(() => findAllByRole('menuitem'));

  await act(() => screen.findAllByText('XS'));

  await act(() => screen.getByTestId('qtySelector'));
  expect(screen.getByTestId('qtySelector')).not.toBeDisabled();
});

// const setup = async () => {
//   const utils = render(
//     <Provider store={store}>
//       <AddToCartFeatures style={mockStyle} />
//     </Provider>,
//   );
//   await act(() => findAllByRole('menuitem'));
//   const input = utils.getByLabelText('qtySelector');
//   return {
//     input,
//     ...utils,
//   };
// };

// it('should add the selected size and quantity to the cart', async () => {
//   const { qtyInput } = setup();
//   fireEvent.change(qtyInput, { target: { value: '10' } });
//   expect(qtyInput.value).toBe('10');

//   fireEvent.click(sizeInput, { target: { value: 'M' } });
//   expect(sizeInput.value).toBe('M');
// }