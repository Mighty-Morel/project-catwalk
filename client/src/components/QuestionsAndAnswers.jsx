import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
// eslint-disable-next-line import/extensions
import QuestionEntry from './QuestionEntry.jsx';

const QuestionsAndAnswers = (props) => {
  // Get the current product_id
  const currentId = useSelector((state) => state.product.id);

  // Create the state component to hold the questions
  const [questions, setQuestions] = useState([]);
  const [questionCount, setCount] = useState(4);
  const [extra, setExtra] = useState(false);

  // Retrieve the questions from the API
  const getQuestions = () => {
    axios.get(`/qa/questions/${currentId}`)
      .then((response) => {
        const { results } = response.data;
        results.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
        setQuestions(results);
        // Compares count to number of questions, display up to four questions
        if (results.length > 4) {
          setCount(4);
          setExtra(true);
        } else {
          setCount(results.length);
        }
      })
      .catch((error) => {
        console.log('Error from GET request:', error);
      });
  };

  // Mount questions to state
  useEffect(getQuestions, [currentId]);

  if (questions.length === 0) {
    // display a button to submit a new question
    return (
      <>
        <button type="button">Submit Question</button>
      </>
    );
  }
  // onChange handler to sort questions
  // change format on button
  const displayedQuestions = questions.slice(0, questionCount);
  return (
    <>
      <input type="text" placeholder="Search questions..." />
      {displayedQuestions.map((question) => {
        const {
          // eslint-disable-next-line camelcase
          question_id,
          // eslint-disable-next-line camelcase
          question_body,
          // eslint-disable-next-line camelcase
          question_date,
          // eslint-disable-next-line camelcase
          asker_name,
          // eslint-disable-next-line camelcase
          question_helpfulness,
          reported,
        } = question;
        return (
          <QuestionEntry
            // eslint-disable-next-line camelcase
            key={question_id}
            // eslint-disable-next-line camelcase
            id={question_id}
            // eslint-disable-next-line camelcase
            question={question_body}
            // eslint-disable-next-line camelcase
            date={question_date}
            // eslint-disable-next-line camelcase
            asker={asker_name}
            // eslint-disable-next-line camelcase
            helpfulness={question_helpfulness}
            reported={reported}
          />
        );
      })}
      {/* {() => { if (extra) { return <button type="button"
      onClick={() => { setCount(questionCount + 2); }}>Load More Questions</button>; } }} */}
    </>
  );
};

export default QuestionsAndAnswers;
