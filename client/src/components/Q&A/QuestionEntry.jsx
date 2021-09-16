import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerEntry from './AnswerEntry.jsx';
import styling from './questions.css';

const QuestionEntry = (props) => {
  const [answerCount, setCount] = useState(2);
  const [answers, setAnswers] = useState([]);
  const [extra, setExtra] = useState(false);

  const getAnswers = () => {
    axios.get(`/qa/questions/${props.id}/answers`)
      .then((response) => {
        const { results } = response.data;
        results.sort((a, b) => b.helpfulness - a.helpfulness);
        setAnswers(results);
        // Compares count to number of questions, display up to four questions
        if (results.length > 2) {
          setCount(2);
          setExtra(true);
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
    <div className="question-entry">
      <h1>Q: {props.question}</h1>
      {displayedAnswers.map((answer) => {
        const {
          answer_id,
          body,
          date,
          answerer_name,
          helpfulness,
          photos,
        } = answer;
        return (
          <AnswerEntry
          key={answer_id}
          id={answer_id}
          answer={body}
          date={date}
          answerer={answerer_name}
          helpfulness={helpfulness}
          photos={photos}
          />
        );
      })}
      <span>{props.asker} {props.date}</span>
    </div>
  );
};

export default QuestionEntry;
