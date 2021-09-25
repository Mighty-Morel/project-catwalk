import React from 'react';
import moment from 'moment';
// eslint-disable-next-line import/extensions
import StarRating from './StarRating.jsx';

const tile = ({ review, handlePut }) => (
  <div className="RLtile">
    <div className="review-title">
      <StarRating width={`${(parseInt(review.rating, 10) / 5) * 100}%`} />
      <span className="RLidentity">
        {review.reviewer_name}
        ,&nbsp;
        {moment(review.date).format('LL')}
      </span>
    </div>
    <p className="review-summary">
      <b>{review.summary}</b>
    </p>
    <p className="review-body">
      {review.body}
    </p>
    <p className="review-footer">
      Helpful?&nbsp;
      <span role="option" aria-selected="false" tabIndex={0} aria-hidden="true" className="underline" onClick={() => handlePut(review.review_id, 'helpful')}>Yes</span>
      (
      {review.helpfulness}
      ) |&nbsp;
      <span role="option" aria-selected="false" tabIndex={0} aria-hidden="true" className="underline" onClick={() => handlePut(review.review_id, 'report')}>Report</span>
    </p>
  </div>
);

export default tile;
