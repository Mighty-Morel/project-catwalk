import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionEntry = (props) => {
  const [answerCount, setCount] = useState(2);
  const [answers, setAnswers] = useState([]);

  const getAnswers = () => {
    axios.get(`/qa/questions/${props.id}/answers`)
      .then((response) => {
        const { results } = response.data;
        setAnswers(results);
        // Compares count to number of questions, display up to four questions
        if (results.length > 2) {
          setCount(2);
          // setExtra(true);
        } else {
          setCount(results.length);
        }
      })
      .catch((error) => {
        console.log('Error from GET request:', error);
      });
  };

  useEffect(getAnswers, [props.id]);

  const displayedAnswers = answers.slice(0, answerCount);
  return (
    <>
      <h1>{props.question}</h1>
      <AnswerEntry />
      <span>{props.asker} {props.date}</span>
    </>
  );
};

export default QuestionEntry;
