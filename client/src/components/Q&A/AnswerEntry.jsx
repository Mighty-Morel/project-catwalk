import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import styling from './questions.css';

const AnswerEntry = (props) => {
  // Destructuring
  const { date, answer, answerer, helpfulness, id } = props;
  // Format date
  const formattedDate = moment(date).format('LL');
  const { helpfulnessClick, setHelpfulnessClick } = useState(false);

  const putHelpfulness = () => {
    axios.put(`/qa/answers/${id}/helpful`);
  };

  const test = () => {
    console.log('success');
  };

  return (
    <>
      <p>{answer}</p>
      {answerer === 'seller'
        ? <span>by <b>Seller</b> </span>
        : <span>by {answerer}  </span>}
      <span>{formattedDate}</span>
      <span>Helpful?</span>
      <span onClick={putHelpfulness}>Yes &#40;{helpfulness}&#41;</span>
    </>
  );
};

export default AnswerEntry;
