// Environment Setup ------------------------------------------------------
import React from 'react';
import {
  render, cleanup, bwaitFor, fireEvent, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import { Provider } from 'react-redux';
import QuestionsAndAnswers from '../client/src/components/Q&A/QuestionsAndAnswers';

beforeAll(() => {
  axios.get.mockImplementation((url) => {
    switch (url) {
      case '/qa/questions/11':
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
jest.mock('../client/src/components/Q&A/QuestionEntry.jsx', () => () => (<div>Placeholder Question Entry</div>));
jest.mock('../client/src/components/Q&A/QuestionModal.jsx', () => () => (<div>Placeholder Question Modal</div>));

const mockQuestionData = {
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
it('should load and display the selected questions',
  () => axios.get('/qa/questions/11')
    .then((questions) => expect(questions).toEqual(mockQuestionData)));

it('should load and display the answers of the selected question',
  () => axios.get('/qa/questions/1/answers')
    .then((answers) => expect (answers).toEqual(mockAnswerData)));

// it('should load and display the questions for the selected product', () => {
//   axios.get('/qa/questions/11');

// })
