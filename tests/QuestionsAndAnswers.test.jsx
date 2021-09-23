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

const mockQuestionData = {};
mockQuestionData.data = {
  product_id: 11,
  results: [
    {
      question_id: 1,
      question_body: 'Can I wash it?',
      question_date: '2018-02-08T00:00:00.0007',
      asker_name: 'bobby',
      question_helpfulness: 8,
      reported: false,
      answers: {
        888999: {
          id: 888999,
          body: 'Put it in the washer',
          date: '2018-03-08T00:00:00.000Z',
          answerer_name: 'jimmy',
          helpfulness: 17,
          photos: [],
        },
      },
    },
    {
      question_id: 2,
      question_body: 'Is it big or small?',
      question_date: '2018-03-08T00:00:00.0007',
      asker_name: 'john',
      question_helpfulness: 12,
      reported: false,
      answers: {
        123456: {
          id: 123456,
          body: 'It runs extra large',
          date: '2018-04-08T00:00:00.000Z',
          answerer_name: 'lester',
          helpfulness: 21,
          photos: [],
        },
      },
    },
    {
      question_id: 3,
      question_body: 'What material is it?',
      question_date: '2018-05-08T00:00:00.0007',
      asker_name: 'stephen',
      question_helpfulness: 20,
      reported: false,
      answers: {
        654321: {
          id: 654321,
          body: 'The finest',
          date: '2019-04-08T00:00:00.000Z',
          answerer_name: 'bigdan',
          helpfulness: 2,
          photos: [],
        },
      },
    },
  ],
};

const mockAnswerData = {
  question: 1,
  page: 1,
  count: 5,
  results: [
    {
      answer_id: 888999,
      body: 'Put it in the washer',
      date: '2018-03-08T00:00:00.000Z',
      answerer_name: 'jimmy',
      helpfulness: 17,
      photos: [],
    },
  ],
};

// TESTS ---------------------------------------------------
it('should load the mock questions',
  () => axios.get('/qa/questions/48432')
    .then((questions) => expect(questions).toEqual(mockQuestionData)));

it('should load the mock answers',
  () => axios.get('/qa/questions/1/answers')
    .then((answers) => expect(answers).toEqual(mockAnswerData)));

it('should load and display the selected product data', async () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <QuestionsAndAnswers />
    </Provider>,
  );
  // await waitFor(() => screen.getByTestId('question-entry'));
  const questions = await screen.findAllByTestId('question-entry');
  // three questions as input from mock data, should only display 2 on load
  expect(questions).toHaveLength(2);
  expect(getByTestId('add-question')).toHaveTextContent('Add Question');
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
