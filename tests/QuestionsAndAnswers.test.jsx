/**
 * @jest-environment jsdom
 */

// Environment Setup ------------------------------------------------------
import React from 'react';
import {
  render, cleanup, waitFor, fireEvent, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import { Provider } from 'react-redux';
import QuestionsAndAnswers from '../client/src/components/Q&A/QuestionsAndAnswers';
// import QuestionEntry from '../client/src/components/Q&A/QuestionEntry';
import store from '../client/src/store/store';
import data from './fixtures/QuestionMockData';

// Destructuring data from fixtures
const { mockQuestionData, mockAnswerData } = data;

beforeAll(() => {
  axios.get.mockImplementation((url) => {
    switch (url) {
      case '/qa/questions/48432':
        return Promise.resolve(mockQuestionData);
      case '/qa/questions/1/answers':
        return Promise.resolve(mockAnswerData);
      default:
        return Promise.reject(new Error('Error - Q&A test is not working'));
    }
  });
});

afterEach(cleanup);

jest.mock('axios');
jest.mock('../client/src/components/Q&A/questions.css', () => () => (<div>Placeholder QuestionsAndAnswers Style</div>));
jest.mock('../client/src/components/Q&A/QuestionEntry.jsx', () => () => (<div data-testid="question-entry">Placeholder Question Entry</div>));
jest.mock('../client/src/components/Q&A/QuestionModal.jsx', () => () => (<div data-testid="question-modal">Placeholder Question Modal</div>));

// TESTS ---------------------------------------------------
it('should load the mock questions',
  () => axios.get('/qa/questions/48432')
    .then((questions) => expect(questions).toEqual(mockQuestionData)));

it('should load the mock answers',
  () => axios.get('/qa/questions/1/answers')
    .then((answers) => expect(answers).toEqual(mockAnswerData)));

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
// it('should load and display the questions for the selected product', async () => {
//   const { getByTestId } = render(
//     <Provider store={store}>
//       <QuestionsAndAnswers />
//     </Provider>,
//   );

//   axios.get('/qa/questions/11')
//     .then(() => {
//       waitFor(() => screen.getByTestId('render-more-questions'));
//       fireEvent.click(getByTestId('render-more-questions'));
//       expect(getByTestId('render-more-questions')).toHaveTextContent('Collapse questions');
//     });
// });

// test('question modal should pop up after clicking add-question', () => {
//   const { getByTestId } = render(
//     <Provider store={store}>
//       <QuestionsAndAnswers />
//     </Provider>,
//   );

//   fireEvent.click(getByTestId('add-question'));
//   expect(getByTestId('question-modal')).toHaveTextContent('Placeholder Question Modal');
// });
