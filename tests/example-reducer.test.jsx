import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import { Provider, useSelector, useDispatch } from 'react-redux';
import reducer, { updateProductId, updateProductInfo } from '../client/src/reducers/Example-Reducer';

afterEach(cleanup);

test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(
    {
      id: 48432,
      productInfo: {},
    },
  );
});

test('should update the Product Id', () => {
  const previousState = {
    id: 48432,
    productInfo: {},
  };
  expect(reducer(previousState, updateProductId(123456))).toEqual(
    {
      id: 123456,
      productInfo: {},
    },
  );
});

test('should return an array of objects with style info', () => {
  const previousState = {
    id: 293480,
    productInfo: {},
  };
  expect(reducer(previousState, updateProductInfo({
    id: 11,
    name: 'Air Minis 250',
    slogan: 'Full court support',
    description: 'This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.',
    category: 'Basketball Shoes',
    default_price: '0',
    features: [
      {
        feature: 'Sole',
        value: 'Rubber',
      },
      {
        feature: 'Material',
        value: 'FullControlSkin',
      },
    ],
  }))).toEqual({
    id: 293480,
    productInfo: {
      id: 11,
      name: 'Air Minis 250',
      slogan: 'Full court support',
      description: 'This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.',
      category: 'Basketball Shoes',
      default_price: '0',
      features: [
        {
          feature: 'Sole',
          value: 'Rubber',
        },
        {
          feature: 'Material',
          value: 'FullControlSkin',
        },
      ],
    },
  });
});
