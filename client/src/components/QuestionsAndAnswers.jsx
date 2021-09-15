import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import QuestionEntry from './QuestionEntry.jsx';

const QuestionsAndAnswers = () => {
  // Get the current product_id
  const currentId = useSelector((state) => state.product.id);

  // Create the state component to hold the questions
  const [questions, setQuestions] = useState([]);
  const [questionCount, setCount] = useState(4);
  const [extra, setExtra] = useState(false);

  // Retrieve the questions from the API
  const fetchQuestions = () => {
    axios.get(`/qa/questions/${currentId}`)
      .then((response) => {
        const { results } = response.data;
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
  useEffect(fetchQuestions, [currentId]);

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
          question_id,
          question_body,
          question_date,
          asker_name,
          question_helpfulness,
          reported,
          answers,
        } = question;
        return (
          <div>
            <QuestionEntry
              key={question_id}
              question={question_body}
              date={question_date}
              asker={asker_name}
              helpfulness={question_helpfulness}
              reported={reported}
              answers={answers}
            />
          </div>
        );
      })}
      {() => { if (extra) { return <button type="button" onClick={() => { setCount(questionCount + 2); }}>Load More Questions</button>; } }}
    </>
  );
};

export default QuestionsAndAnswers;
