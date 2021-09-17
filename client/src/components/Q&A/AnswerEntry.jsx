import React from 'react';
import moment from 'moment';
import styling from './questions.css';

const AnswerEntry = (props) => {
  // Destructuring
  const { date, answer, answerer, helpfulness } = props;
  // Format date
  const formattedDate = moment(date).format('LL');
  return (
    <>
      <p>{answer}</p>
      {answerer === 'seller'
        ? <span>by <b>Seller</b> </span>
        : <span>by {answerer}  </span>}
      <span>{formattedDate}</span>
      {/* <span>Helpful?</span> <input type="text">Yes {helpfulness}</input> */}
    </>
  );
};

export default AnswerEntry;
