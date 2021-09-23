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
import
{
  mockProductData, mockCartData, mockStyleData, mockStyle,
}
  from './fixtures/mockData';

jest.mock('../client/src/components/Overview/overview.css', () => () => (<div>Placeholder Overview Style</div>));
jest.mock('../client/src/components/Overview/ProductInfo', () => () => (<div>Placeholder Product Info</div>));
jest.mock('../client/src/components/Overview/Gallery', () => () => (<div>Placeholder Gallery</div>));
jest.mock('../client/src/components/Q&A/QuestionsAndAnswers', () => () => (<div>Placeholder Questions And Answers</div>));
jest.mock('../client/src/components/Q&A/questions.css', () => () => (<div>Placeholder Questions And Answers Style</div>));
jest.mock('../client/src/components/Related/RelatedItems', () => () => (<div>Placeholder Questions And Answers</div>));
jest.mock('../client/src/components/Reviewlist/reviewlist.css', () => () => (<div>Review List Style</div>));
jest.mock('../client/src/components/Reviewlist/Review-list', () => () => (<div>Placeholder Review List</div>));
jest.mock('../client/src/reducers/Review-List-Slice.js', () => () => (<div>Review List Slice Placeholder</div>));

// declare which API requests to mock
const server = setupServer(
  rest.get('/products/48432', (req, res, ctx) => res(ctx.json(mockProductData))),
  rest.get('/products/48432/styles', (req, res, ctx) => res(ctx.json(mockStyleData))),
  rest.get('/cart', (req, res, ctx) => res(ctx.json(mockCartData))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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
//   // const item = {
//   //   sku_id: 123456,
//   //   count: 20,
//   // };

//   const { qtyInput } = setup();
//   fireEvent.change(qtyInput, { target: { value: '10' } });
//   expect(qtyInput.value).toBe('10');

//   // fireEvent.click(sizeInput, { target: { value: 'M' } });
//   // expect(sizeInput.value).toBe('M');
