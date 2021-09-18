// Import this sample server data for your tests
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, fireEvent, waitFor, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';

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

// declare which API requests to mock
const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('/products/48432', (req, res, ctx) =>
    // respond using a mocked JSON body
    res(ctx.json({ mockProductData }))),
  rest.get('/products/48432/styles', (req, res, ctx) =>
    // respond using a mocked JSON body
    res(ctx.json({ mockStyleData }))),
);

export default server;