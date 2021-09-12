/**
 * @jest-environment jsdom
 */

// app.test.jsx - USE THIS AS THE SAMPLE

// See https://reactjs.org/docs/testing-recipes.html for more testing examples
// And here: https://testing-library.com/docs/react-testing-library/example-intro/
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../components/App';

test('renders on load', () => {
  const { getByText } = render(<App />);
  expect(getByText('Hello World!')).toBeInTheDocument();
});