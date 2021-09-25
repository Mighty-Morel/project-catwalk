import React from 'react';
import moment from 'moment';

const tile = (props) => (
  <div className="RLtile">
    <p className="review-title">
      stars placeholder
      <span className="RLidentity">
        {props.review.reviewer_name}
        ,&nbsp;
        {moment(props.review.date).format('LL')}
      </span>
    </p>
    <p className="review-summary">
      <b>{props.review.summary}</b>
    </p>
    <p className="review-body">
      {props.review.body}
    </p>
    <p className="review-footer">
      Helpful?&nbsp;
      <span role="option" aria-selected="false" tabIndex={0} aria-hidden="true" className="underline" onClick={() => props.handlePut(props.review.review_id, 'helpful')}>Yes</span>
      (
      {props.review.helpfulness}
      ) |&nbsp;
      <span role="option" aria-selected="false" tabIndex={0} aria-hidden="true" className="underline" onClick={() => props.handlePut(props.review.review_id, 'report')}>Report</span>
    </p>
  </div>
);

export default tile;
