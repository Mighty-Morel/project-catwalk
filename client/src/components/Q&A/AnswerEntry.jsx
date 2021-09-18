import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import styling from './questions.css';

const AnswerEntry = (props) => {
  const [helpfulnessClick, setHelpfulnessClick] = useState(false);
  // Destructuring
  const { date, answer, answerer, helpfulness, id } = props;
  // Format date
  const formattedDate = moment(date).format('LL');

  const putHelpfulness = () => {
    axios.put(`/qa/answers/${id}/helpful`);
    setHelpfulnessClick(true);
  };

  const clickHelpful = () => {
    if (!helpfulnessClick) {
      return (<span onClick={putHelpfulness}>Yes &#40;{helpfulness}&#41;</span>);
    } else {
      return (<span><b>Yes &#40;{helpfulness + 1}&#41;</b></span>)
    }
  };

  // useEffect(clickHelpful, [helpfulnessClick]);

  return (
    <>
      <p>{answer}</p>
      {answerer === 'seller'
        ? <span>by <b>Seller</b> </span>
        : <span>by {answerer}  </span>}
      <span>{formattedDate}</span>
      <span>Helpful?</span>
      {clickHelpful()}
      {/* <span onClick={putHelpfulness}>Yes &#40;{helpfulness}&#41;</span> */}
    </>
  );
};

export default AnswerEntry;
