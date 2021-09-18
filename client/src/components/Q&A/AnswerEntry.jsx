import React from 'react';
import styling from './questions.css';

const AnswerEntry = (props) => {
  return (
    <>
      <h2>Answer:</h2>
      <p>{props.answer}</p>
    </>
  );
}

export default AnswerEntry;