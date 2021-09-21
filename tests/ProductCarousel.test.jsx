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
import axios from 'axios';

import ProductCarousel from '../client/src/components/Related/ProductCarousel';
import Modal from '../client/src/components/Related/Modal';
import RelatedItems from '../client/src/components/Related/RelatedItems';

beforeAll(() => {
  axios.get.mockImplementation((url) => {
    switch (url) {
      case '/products/1':
        return Promise.resolve(mockProductData);
      case '/products/1/related':
        return Promise.resolve(mockRelatedIds);
      default:
        return Promise.reject(new Error('Error - this test is not working'));
    }
  });
});

afterEach(cleanup);

jest.mock('../client/src/components/Related/card.css', () => () => (<div>Carousel Card Style Placeholder</div>));
jest.mock('../client/src/components/Related/carousel.css', () => () => (<div>Carousel Style Placeholder</div>));
jest.mock('../client/src/components/Related/modal.css', () => () => (<div>PlModal Style Placeholder</div>));

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
