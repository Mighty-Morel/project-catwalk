/**
 * @jest-environment jsdom
 */

// app.test.jsx - USE THIS AS THE SAMPLE

// See https://reactjs.org/docs/testing-recipes.html for more testing examples
// And here: https://testing-library.com/docs/react-testing-library/example-intro/
import React from 'react';
import 'whatwg-fetch';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import { Provider } from 'react-redux';
// import store from '../client/src/store/store';
import App from '../client/src/components/App';
import mockData from './fixtures/OverviewMockData';

afterEach(cleanup);

jest.mock('../client/src/components/Overview/overview.css', () => () => (<div>Placeholder Overview Style</div>));
jest.mock('../client/src/components/Overview/ProductInfo', () => () => (<div>Placeholder Product Info</div>));
jest.mock('../client/src/components/Overview/Gallery', () => () => (<div>Placeholder Gallery</div>));
jest.mock('../client/src/components/Q&A/QuestionsAndAnswers', () => () => (<div>Placeholder Questions And Answers</div>));
jest.mock('../client/src/components/Q&A/questions.css', () => () => (<div>Placeholder Questions And Answers Style</div>));
jest.mock('../client/src/components/Related/RelatedItems', () => () => (<div>Placeholder Questions And Answers</div>));
jest.mock('../client/src/components/Reviewlist/reviewlist.css', () => () => (<div>Review List Style</div>));
jest.mock('font-awesome/css/font-awesome.min.css', () => () => (<div>Ignore Font Awesome</div>));
jest.mock('../client/src/components/Reviewlist/Review-list', () => () => (<div>Placeholder Review List</div>));
jest.mock('../client/src/reducers/Review-List-Slice.js', () => () => (<div>Review List Slice Placeholder</div>));

const {store} = mockData;

// Tests 1 and 2 are the same
it('test 1 using getByText: renders App on load', async () => {
  const { getByText } = await render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(getByText('Hello World! CurrentId is 48432 and current Style is 293480')).toBeInTheDocument();
});

it('test 2 using getByTestId: renders App on load', async () => {
  const { getByTestId } = await render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(getByTestId('loadapp')).toHaveTextContent('Hello World! CurrentId is 48432 and current Style is 293480');
});

it('updates id on click', async () => {
  const { getByTestId } = await render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  fireEvent.click(getByTestId('loadapp'));
  expect(getByTestId('loadapp')).toHaveTextContent('Hello World! CurrentId is 48436 and current Style is 293480');
});
