/**
 * @jest-environment jsdom
 */

// Product Carousel Tests ==============================================

import React from 'react';
import 'whatwg-fetch';
import { act } from 'react-dom/test-utils';
import {
  render, cleanup, waitFor, fireEvent, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import { Provider } from 'react-redux';
import axios from 'axios';

import ProductCarousel from '../client/src/components/Related/ProductCarousel';
import RelatedItems from '../client/src/components/Related/RelatedItems';
import Modal from '../client/src/components/Related/Modal';
import Price from '../client/src/components/Related/Price';
import store from '../client/src/store/store';

const mockRelatedIds = {
  data: [48433],
};

const mockRelatedDataSecond = {
  data: {
    id: 48433,
    campus: 'hr-sfo',
    name: 'Bright Future Sunglasses',
    slogan: 'You\'ve got to wear shades',
    description: 'Where you\'re going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.',
    category: 'Accessories',
    default_price: '69.00',
    created_at: '2021-09-09T19:03:37.378Z',
    updated_at: '2021-09-09T19:03:37.378Z',
    features:
      [{
        feature: 'Lenses',
        value: 'Ultrasheen',
      }, {
        feature: 'UV Protection',
        value: null,
      }, {
        feature: 'Frames',
        value: 'LightCompose',
      }],
  },
};

const mockRelatedDataThird = {
  data: {
    product_id: '48433',
    results: [{
      style_id: 293486,
      name: 'Black Lenses & Black Frame',
      original_price: '69.00',
      sale_price: null,
      'default?': false,
      photos: [{
        thumbnail_url: null, url: null,
      }],
      skus: {
        null: { quantity: null, size: null },
      },
    },
    {
      style_id: 293487,
      name: 'Black Lenses & Gold Frame',
      original_price: '69.00',
      sale_price: null,
      'default?': true,
      photos: [{
        thumbnail_url: null, url: null,
      }],
      skus: {
        null: {
          quantity: null, size: null,
        },
      },
    },
    {
      style_id: 293488,
      name: 'Gold Lenses & Black Frame',
      original_price: '69.00',
      sale_price: null,
      'default?': false,
      photos: [{
        thumbnail_url: null, url: null,
      }],
      skus:
      {
        null: {
          quantity: null, size: null,
        },
      },
    },
    {
      style_id: 293489,
      name: 'Gold Lenses & Gold Frame',
      original_price: '69.00',
      sale_price: null,
      'default?': false,
      photos: [{
        thumbnail_url: null, url: null,
      }],
      skus: {
        null: {
          quantity: null, size: null,
        },
      },
    }],
  },
};

beforeAll(() => {
  axios.get.mockImplementation((url) => {
    switch (url) {
      case '/products/48432/related':
        return Promise.resolve(mockRelatedIds);
      case '/products/48433':
        return Promise.resolve(mockRelatedDataSecond);
      case '/products/48433/styles':
        return Promise.resolve(mockRelatedDataThird);
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

// TESTS =======================================================
// axios tests =================================================
it('should load and display the related ids of the product',
  () => axios.get('/products/48432/related')
    .then((relatedIds) => expect(relatedIds).toEqual(mockRelatedIds)));

it('should load and display product info for related product data',
  () => axios.get('/products/48433')
    .then((relatedProductData) => expect(relatedProductData).toEqual(mockRelatedDataSecond)));

it('should load and display product styles for related product data',
  () => axios.get('/products/48433/styles')
    // eslint-disable-next-line max-len
    .then((relatedProductDataStyles) => expect(relatedProductDataStyles).toEqual(mockRelatedDataThird)));

it('should load and display carousel module title', async () => {
  render(
    <Provider store={store}>
      <RelatedItems />
    </Provider>,
  );
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

it('should load and render Modal component', async () => {
  render(
    <Provider store={store}>
      <Modal />
    </Provider>,
  );
});

// it('should have the comparison modal pop up when star is clicked', async () => {
//   const { getByTestId, findAllByTestId } = render(
//     <Provider store={store}>
//       <ProductCarousel />
//     </Provider>,
//   );

//   await screen.getByTestId('carousel');
//   const openComparisonModal = await screen.findAllByTestId('open-modal');
//   fireEvent.click(getByTestId(openComparisonModal));
//   // const comparisonModal = await findAllByTestId('comparison-modal');

//   expect(getByTestId('modal-title')).toHaveTextContent('Comparing');
// });

it('should load and display the product carousel title', async () => {
  const { getByTestId, findAllByTestId } = render(
    <Provider store={store}>
      <ProductCarousel />
    </Provider>,
  );
  await findAllByTestId('carousel-title');
  expect(getByTestId('carousel-title')).toHaveTextContent('RELATED PRODUCTS');
  // expect(carouselTitle).toHaveTextContent('RELATED PRODUCTS');
});

// findAllByTestId waits for everything to render
// getByTestId doesn't wait, will throw error immediately
