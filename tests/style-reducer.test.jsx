import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import reducer, { updateStyleId, updateStyles } from '../client/src/reducers/Style-Reducer';

afterEach(cleanup);

test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(
    {
      id: 293480,
      allStyles: [],
    },
  );
});

test('should update the Style Id', () => {
  const previousState = {
    id: 293480,
    allStyles: [],
  };
  expect(reducer(previousState, updateStyleId(123456))).toEqual(
    {
      id: 123456,
      allStyles: [],
    },
  );
});

test('should return an array of objects with style info', () => {
  const previousState = {
    id: 293480,
    allStyles: [],
  };
  expect(reducer(previousState, updateStyles([
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
  ]))).toEqual({
    id: 293480,
    allStyles: [
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
  });
});
