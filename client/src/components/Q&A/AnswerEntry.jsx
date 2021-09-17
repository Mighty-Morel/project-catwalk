import React from 'react';
import moment from 'moment';
import styling from './questions.css';

const AnswerEntry = (props) => {
  // Destructuring
  const { date, answer, answerer } = props;
  // Format date
  const formattedDate = moment(date).format('LL');
  return (
    <>
      <p>{answer}</p>
      <span>{formattedDate}</span>
    </>
  );
};

export default AnswerEntry;
