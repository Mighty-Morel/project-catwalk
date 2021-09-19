import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import styling from './questions.css';

const AnswerEntry = (props) => {
  const [helpfulnessClick, setHelpfulnessClick] = useState(false);
  const [reportClick, setReportClick] = useState(false);
  // Destructuring
  const { date, answer, answerer, helpfulness, id } = props;
  // Format date
  const formattedDate = moment(date).format('LL');

  const putHelpfulness = () => {
    axios.put(`/qa/answers/${id}/helpful`)
      .then(() => {
        setHelpfulnessClick(true);
      });
  };

  const putReported = () => {
    axios.put(`/qa/answers/${id}/report`)
      .then(() => {
        setReportClick(true);
      });
  };

  const renderSeller = () => {
    if (answerer.toLowerCase() === 'seller') {
      return (<span>by <b>Seller</b> </span>);
    } else {
      return (<span>by {answerer}  </span>);
    }
  };

  const renderHelpful = () => {
    if (!helpfulnessClick) {
      return (<span onClick={putHelpfulness}>Yes &#40;{helpfulness}&#41;</span>);
    } else {
      return (<span><b>Yes &#40;{helpfulness + 1}&#41;</b></span>);
    }
  };

  const renderReported = () => {
    if (!reportClick) {
      return (<span onClick={putReported}>Report</span>);
    } else {
      return (<span><b>Reported</b></span>);
    }
  };

  return (
    <>
      <p>{answer}</p>
      {renderSeller()}
      <span>{formattedDate}</span>
      <span>Helpful?</span>
      {renderHelpful()}
      {renderReported()}
    </>
  );
};

export default AnswerEntry;
