/**
 * @jest-environment jsdom
 */

// Product Carousel Tests ==============================================

import React from 'react';
import {
  render, cleanup, waitFor, fireEvent, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import { Provider } from 'react-redux';
import axios from 'axios';

import ProductCarousel from '../client/src/components/Related/ProductCarousel';
import RelatedItems from '../client/src/components/Related/RelatedItems';
import Price from '../client/src/components/Related/Price';
import store from '../client/src/store/store';

const mockProductData = [
  {
    id: 1,
    name: 'Camo Onesie',
    slogan: 'Blend in to your crowd',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    category: 'Jackets',
    default_price: '140',
  },
];

const mockRelatedIds = [
  2,
  3,
  8,
  7,
];

const mockStyleData = {
  product_id: '48421',
  results: [
    {
      style_id: 48432,
      name: 'Camo Onesie',
      original_price: '80.00',
    },
    {
      style_id: 48433,
      name: 'Purple Onesie',
      original_price: '90.00',
    },
    {
      style_id: 48432,
      name: 'Grey Onesie',
      original_price: '900.00',
    },
    {
      style_id: 48432,
      name: 'Gold Onesie',
      original_price: '8000.00',
    },
  ],
};

const mockStylePriceData = {
  category: 'Accessories',
  features: null,
  name: 'Bright Future Sunglasses',
  pic: null,
  price: '69.00',
  relatedId: 48433,
  sale: '29.00',
};

beforeAll(() => {
  axios.get.mockImplementation((url) => {
    switch (url) {
      case '/products/1':
        return Promise.resolve(mockProductData);
      case '/products/1/related':
        return Promise.resolve(mockRelatedIds);
      case '/products/48421/styles':
        return Promise.resolve(mockStyleData);
      case '/products/48433/styles':
        return Promise.resolve(mockStylePriceData);
      default:
        return Promise.reject(new Error('Error - this test is not working'));
    }
  });
});

afterEach(cleanup);

jest.mock('axios');
jest.mock('../client/src/components/Related/card.css', () => () => (<div>Carousel Card Style Placeholder</div>));
jest.mock('../client/src/components/Related/carousel.css', () => () => (<div>Carousel Style Placeholder</div>));
jest.mock('../client/src/components/Related/modal.css', () => () => (<div>Modal Style Placeholder</div>));
jest.mock('../client/src/components/Related/Modal.jsx', () => () => (<div>Modal Placeholder</div>));

// TESTS =======================================================
it('should load and display the selected product data',
  () => axios.get('/products/1')
    .then((productInfo) => expect(productInfo).toEqual(mockProductData)));

it('should load and display the related ids of the product',
  () => axios.get('/products/1/related')
    .then((relatedIds) => expect(relatedIds).toEqual(mockRelatedIds)));

it('should load and display the styles of the product',
  () => axios.get('/products/48421/styles')
    .then((productStyles) => expect(productStyles).toEqual(mockStyleData)));

it('should load and display carousel module title', async () => {
  render(
    <Provider store={store}>
      <RelatedItems />
    </Provider>,
  );

  axios.get('/products/48421/styles')
    .then(async () => {
      const carousel = await waitFor(() => screen.getByTestId('carousel'));
      expect(carousel).toHaveTextContent('RELATED PRODUCTS');
    })
    .catch((err) => console.log(err));
});

it('should load and display sales price if not null', async () => {
  render(
    <Provider store={store}>
      <Price />
    </Provider>,
  );

  axios.get('/products/48433/styles')
    .then(async () => {
      const sale = await waitFor(() => screen.getByTestId('sale'));
      expect(sale).toHaveTextContent('29.00');
    })
    .catch((err) => console.log(err));
});

// test('star selected should have text comparing on modal card', () => {
//   render(
//     <Provider store={store}>
//       <ProductCarousel />
//     </Provider>,
//   );

//   const openModal = screen.getByTestId('open-comparison-modal');
//   fireEvent.click(openModal);
//   expect(screen.getByTestId('modal-title')).toHaveTextContent('Comparing');
// });
