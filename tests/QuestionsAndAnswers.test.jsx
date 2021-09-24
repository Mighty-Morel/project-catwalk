/**
 * @jest-environment jsdom
 */

// Environment Setup ------------------------------------------------------
import React from 'react';
import 'whatwg-fetch';
import { act } from 'react-dom/test-utils';
import {
  render, cleanup, waitFor, fireEvent, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import { Provider } from 'react-redux';
import QuestionsAndAnswers from '../client/src/components/Q&A/QuestionsAndAnswers';
import QuestionModal from '../client/src/components/Q&A/QuestionModal';
import QuestionEntry from '../client/src/components/Q&A/QuestionEntry';
import store from '../client/src/store/store';
import { mockQuestionData, mockProductData } from './fixtures/QuestionMockData';

beforeAll(() => {
  axios.get.mockImplementation((url) => {
    switch (url) {
      case '/qa/questions/48432':
        return Promise.resolve(mockQuestionData);
      case '/products/48432':
        return Promise.resolve(mockProductData);
      default:
        return Promise.reject(new Error('Error - No URL found'));
    }
  });
  axios.post.mockImplementation((url) => {
    switch (url) {
      case '/qa/questions':
        return Promise.resolve('CREATED');
      default:
        return Promise.reject(new Error('Error - No URL found'));
    }
  });
});

afterEach(cleanup);

jest.mock('axios');
jest.mock('../client/src/components/Q&A/questions.css', () => () => (<div>Placeholder QuestionsAndAnswers Style</div>));
// jest.mock('../client/src/components/Q&A/QuestionEntry.jsx', () => () => (<div data-testid="question-entry">Placeholder Question Entry</div>));
// jest.mock('../client/src/components/Q&A/QuestionModal.jsx', () => () => (<div data-testid="question-modal">Placeholder Question Modal</div>));

// Mock Axios Request Questions ---------------------------------------------------------
it('should load the mock questions',
  () => axios.get('/qa/questions/48432')
    .then((questions) => expect(questions).toEqual(mockQuestionData)));

it('should load the mock answers',
  () => axios.get('/products/48432')
    .then((productInfo) => expect(productInfo).toEqual(mockProductData)));

it('should post mock question',
  () => axios.post('/qa/questions')
    .then((response) => expect(response).toEqual('CREATED')));

// Question And Answers Tests -------------------------------------------------------
it('should load and display the selected product data', async () => {
  const { getByTestId, findAllByTestId } = render(
    <Provider store={store}>
      <QuestionsAndAnswers />
    </Provider>,
  );
  // await waitFor(() => screen.getByTestId('question-entry'));
  const questions = await findAllByTestId('question-entry');
  // three questions as input from mock data, should only display 2 on load
  expect(questions).toHaveLength(2);
  expect(getByTestId('add-question')).toHaveTextContent('Add Question');
});

it('should be able to show more questions if there are more than two and then collapse', async () => {
  const { getByTestId, findAllByTestId } = render(
    <Provider store={store}>
      <QuestionsAndAnswers />
    </Provider>,
  );
  const initialQuestions = await findAllByTestId('question-entry');
  expect(initialQuestions).toHaveLength(2);
  expect(getByTestId('render-more-questions')).toHaveTextContent('See more questions');
  fireEvent.click(getByTestId('render-more-questions'));
  const moreQuestions = await findAllByTestId('question-entry');
  expect(moreQuestions).toHaveLength(3);
  expect(getByTestId('collapse-questions')).toHaveTextContent('Collapse questions');
  fireEvent.click(getByTestId('collapse-questions'));
  const endQuestions = await findAllByTestId('question-entry');
  expect(endQuestions).toHaveLength(2);
});

// Question Modal Tests -------------------------------------------------------
it('should have the question modal pop up when submit a question is clicked', async () => {
  const { getByTestId, findAllByTestId } = render(
    <Provider store={store}>
      <QuestionsAndAnswers />
    </Provider>,
  );
  // expect(getByTestId('question-modal')).toHaveTextContent('Placeholder Question');
  fireEvent.click(getByTestId('add-question'));
  getByTestId('close-modal');
  getByTestId('submit-question');
  await getByTestId('modal-subheader');
  const questionInputs = await findAllByTestId('question-input');

  expect(getByTestId('close-modal')).toHaveTextContent('Close');
  expect(getByTestId('submit-question')).toHaveTextContent('Submit');
  expect(getByTestId('modal-subheader')).toHaveTextContent('"About the gucci socks"');
  expect(questionInputs).toHaveLength(3);
});

it('inputs of the form should reflect the value when changed', () => {
  const { getByTestId, getByPlaceholderText } = render(
    <Provider store={store}>
      <QuestionsAndAnswers />
    </Provider>,
  );

  fireEvent.click(getByTestId('add-question'));
  fireEvent.change(getByPlaceholderText('Why did you like the product or not?'), { target: { value: 'question' } });
  fireEvent.change(getByPlaceholderText('Example: jackson11!'), { target: { value: 'nickname' } });
  fireEvent.change(getByPlaceholderText('jackson@email.com'), { target: { value: 'email@gmail.com' } });
  expect(getByPlaceholderText('Why did you like the product or not?').value).toBe('question');
  expect(getByPlaceholderText('Example: jackson11!').value).toBe('nickname');
  expect(getByPlaceholderText('jackson@email.com').value).toBe('email@gmail.com');
});

it('sends a post request if the inputs are correct', () => {
  const { getByTestId, getByPlaceholderText, queryByTestId } = render(
    <Provider store={store}>
      <QuestionsAndAnswers />
    </Provider>,
  );
  fireEvent.click(getByTestId('add-question'));
  fireEvent.change(getByPlaceholderText('Why did you like the product or not?'), { target: { value: 'question' } });
  fireEvent.change(getByPlaceholderText('Example: jackson11!'), { target: { value: 'nickname' } });
  fireEvent.change(getByPlaceholderText('jackson@email.com'), { target: { value: 'email@gmail.com' } });
  fireEvent.click(getByTestId('submit-question'));
  expect(queryByTestId('question-modal')).toBe(null);
});

//Question Entry Tests --------------------------------------------------

