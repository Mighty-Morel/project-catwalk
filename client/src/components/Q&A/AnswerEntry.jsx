import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import './questions.css';

const AnswerEntry = (props) => {
  const [helpfulnessClick, setHelpfulnessClick] = useState(false);
  const [reportClick, setReportClick] = useState(false);

  // Destructuring
  const {
    date,
    answer,
    answerer,
    helpfulness,
    id,
  } = props;

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
      return (
        <span>
          By:&#160;
          <b>
            Seller
          </b>
        </span>
      );
    }
    return (
      <span>
        By:&#160;
        {answerer}
      </span>
    );
  };

  const renderHelpful = () => {
    if (!helpfulnessClick) {
      return (
        <span
          onClick={putHelpfulness}
          onKeyPress={putHelpfulness}
          role="button"
          tabIndex="0"
          className="answer-helpful"
          id="QA-helpful-yes"
        >
          Yes &#40;
          {helpfulness}
          &#41;
        </span>
      );
    }
    return (
      <span className="answer-helpful">
        <b>
          Yes
          &#40;
          {helpfulness + 1}
          &#41;
        </b>
      </span>
    );
  };

  const renderReported = () => {
    if (!reportClick) {
      return (
        <span
          onClick={putReported}
          onKeyPress={putReported}
          role="button"
          tabIndex="-1"
        >
          Report
        </span>
      );
    }
    return (<span><b>Reported</b></span>);
  };

  return (
    <div className="answer-entry">
      <p className="answerText" data-testid="answer-entry">{answer}</p>
      <div className="answerExtras">
        <div className="answerSellerInfo">
          {renderSeller()}
          <span>
            &#160;&#160;
            <em>{formattedDate}</em>
          </span>
        </div>
        <div>
          <span className="answer-helpful">Helpful?&#160;</span>
          {renderHelpful()}
        </div>
        {renderReported()}
      </div>
    </div>
  );
};

export default AnswerEntry;
