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
        // Sorts answers whether the user is a 'seller' then by helpfulness
        const sellerAnswers = results.filter(answer => answer.answerer_name.toLowerCase() === 'seller');
        const otherAnswers = results.filter(answer => answer.answerer_name.toLowerCase() !== 'seller');
        sellerAnswers.sort((a, b) => b.helpfulness - a.helpfulness);
        otherAnswers.sort((a, b) => b.helpfulness - a.helpfulness);
        const sortedAnswers = sellerAnswers.concat(otherAnswers);
        setAnswers(sortedAnswers);
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

  // Show more answers and conditional rendering for extras
  const showMoreAnswers = () => {
    setCount(answerCount + 2);
  };

  const renderMoreAnswers = () => {
    if (extra) {
      return (<button type="button" onClick={showMoreAnswers}>See more answers</button>);
    }
  };

  useEffect(() => {
    if (answers.length < answerCount) {
      setExtra(false);
    }
  }, [answerCount]);

  const displayedAnswers = answers.slice(0, answerCount);

  return (
    <div className="question-entry">
      <h1>Q: {props.question}</h1>
      <h2>A: </h2>
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
      {renderMoreAnswers()}
    </div>
  );
};

export default QuestionEntry;
