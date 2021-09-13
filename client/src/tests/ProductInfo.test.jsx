// /**
//  * @jest-environment jsdom
//  */

// import React from 'react';
// import {
//   render, cleanup,
// } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import 'regenerator-runtime/runtime';
// import axiosMock from 'axios';
// import ProductInfo from '../components/ProductInfo';

// afterEach(cleanup);

// // Product Info Tests ==============================================
// jest.mock('axios');

// it('should load and display the selected product data', async () => {
//   // What data Axios is to return when `get` is called.
//   axiosMock.get.mockResolvedValueOnce({
//     data: {
//       id: 3,
//       name: 'Morning Joggers',
//       slogan: 'Make yourself a morning person',
//       description: "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
//       category: 'Pants',
//       default_price: '40',
//     },
//   });

//   const { productId } = 3;
//   const url = '/products/3';
//   const { getByTestId } = render(<ProductInfo url={url} />);

//   // On first render, we expect the "loading" span to be displayed
//   expect(getByTestId('loading')).toHaveTextContent('Loading...');

//   // We need to handle the async nature of an AJAX call by waiting for the
//   // element to be rendered.
//   const resolvedDiv = await waitForElement(() => getByTestId('resolved'));
//   const category = await waitForElement(() => getByTestId('show-category'));
//   const name = await waitForElement(() => getByTestId('show-name'));
//   const description = await waitForElement(() => getByTestId('show-description'));

//   expect(axiosMock.get).toHaveBeenCalledTimes(1);
//   expect(axiosMock.get).toHaveBeenCalledWith(url);
//   expect(resolvedDiv).toHaveTextContent('Star Ratings Placeholder');
//   expect(category).toHaveTextContent('Pants');
//   expect(name).toHaveTextContent('Morning Joggers');
//   expect(description).toHaveTextContent('Whether you\'re a morning person or not. Whether you\'re gym bound or not. Everyone looks good in joggers.');
// });
