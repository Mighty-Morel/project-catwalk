import React, { useState } from 'react';

const QuestionEntry = (props) => {
  const [answerCount, setCount] = useState(2);

  // const displayedAnswers = props.answers.slice(0, answerCount);
  return (
    <>
      <h1>{props.question}</h1>
      <span>{props.asker} {props.date}</span>

    </>
  );
};

export default QuestionEntry;
