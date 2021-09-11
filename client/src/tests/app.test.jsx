/**
 * @jest-environment jsdom
 */

// app.test.js
// See https://reactjs.org/docs/testing-recipes.html for more testing examples
// And here: https://testing-library.com/docs/react-testing-library/example-intro/
import React from 'react';
// import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../components/App';

// let container = null;
// beforeEach(() => {
//   // setup a DOM element as a render target
//   container = document.createElement('div');
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   // cleanup on exiting
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });

// it('renders on load', () => {
//   act(() => {
//     render(<App />, container);
//   });
//   expect(container.textContent).toBe('Hello World!');
// });
console.log(typeof App);

test('renders on load', () => {
  const { getByText } = render(<App />)
  expect(getByText('Hello World!')).toBeInTheDocument()
  // expect(getByTestId(<div))
});