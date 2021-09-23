/**
 * @jest-environment jsdom
 */
import React from 'react';
import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  act, render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import { Provider } from 'react-redux';
import AddToCartFeatures from '../client/src/components/Overview/AddToCart';
import App from '../client/src/components/App';
import Style from '../client/src/components/Overview/Style';
import Gallery from '../client/src/components/Overview/Gallery';
import mockData from './fixtures/OverviewMockData';

// MOCK ALL COMPONENT AND CSS IMPORTS TO ISOLATE OVERVIEW COMPONENT ====================
jest.mock('../client/src/components/Overview/overview.css', () => () => (<div>Placeholder Overview Style Sheet</div>));
jest.mock('../client/src/components/Q&A/QuestionsAndAnswers', () => () => (<div>Placeholder Questions And Answers</div>));
jest.mock('../client/src/components/Q&A/questions.css', () => () => (<div>Placeholder Questions And Answers Style</div>));
jest.mock('../client/src/components/Related/RelatedItems', () => () => (<div>Placeholder Questions And Answers</div>));
jest.mock('../client/src/components/Reviewlist/reviewlist.css', () => () => (<div>Review List Style</div>));
jest.mock('../client/src/components/Reviewlist/Review-list', () => () => (<div>Placeholder Review List</div>));
jest.mock('../client/src/reducers/Review-List-Slice.js', () => () => (<div>Review List Slice Placeholder</div>));
jest.mock('../client/src/components/Overview/ProductInfo', () => () => (<div>Placeholder Product Info</div>));

// SETUP MOCK SERVER =============================================================
const {
  mockProductData, mockStyle, mockCartData, store,
} = mockData;

// declare which API requests to mock
const server = setupServer(
  rest.get('/products/48432', (req, res, ctx) => res(ctx.json(mockProductData))),
  rest.get('/products/48432/styles', (req, res, ctx) => res(ctx.json(mockStyle))),
  rest.get('/cart', (req, res, ctx) => res(ctx.json(mockCartData))),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// TESTS =============================================================
// APP ===============================================================
test('renders App on load', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  await waitFor(() => screen.getByText('Hello World! CurrentId is 48432 and current Style is 293480'));

  expect(screen.getByText('Placeholder Review List')).toBeInTheDocument();
});

// ADD TO CART =============================================================
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
  // 1702764: { quantity: 8, size: 'XS' },
  fireEvent.click(screen.getByTestId('1702764'));
  await act(() => findAllByRole('menuitem'));

  await act(() => screen.findAllByText('XS'));

  expect(screen.getByTestId('qtySelector')).not.toBeDisabled();
});

// STYLE SELECTOR ==============================================
test('selected images should have select formatting with border and checkmark', () => {
  const { getByAltText } = render(
    <Provider store={store}>
      <Style style={mockStyle} />
    </Provider>,
  );

  fireEvent.click(getByAltText('Forest Green & Black'));
  expect(getByAltText('Forest Green & Black')).toHaveClass('overview-style-selected');
});

// GALLERY IMAGES =========================================
test('main image should be of the selected thumbnail', async () => {
  const { getByAltText } = render(
    <Provider store={store}>
      <Gallery />
    </Provider>,
  );

  await act(() => screen.findAllByRole('menuitem'));

  expect(getByAltText('Forest Green & Black')).toBeInTheDocument();
});

test('main image should change to next photo when right arrow is clicked', async () => {
  render(
    <Provider store={store}>
      <Gallery />
    </Provider>,
  );
  await act(() => screen.findAllByRole('menuitem'));

  fireEvent.click(screen.getByAltText('right arrow'));

  expect(screen.getByAltText('Forest Green & Black_1')).toBeInTheDocument();
});

test('main image should not change if left arrow is clicked and the current photo is the already the first', async () => {
  render(
    <Provider store={store}>
      <Gallery />
    </Provider>,
  );
  await act(() => screen.findAllByRole('menuitem'));

  fireEvent.click(screen.getByAltText('left arrow'));

  expect(screen.getByAltText('Forest Green & Black_0')).toBeInTheDocument();
});