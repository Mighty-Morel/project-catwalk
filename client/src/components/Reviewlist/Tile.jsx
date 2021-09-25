import React from 'react';
import moment from 'moment';
// eslint-disable-next-line import/extensions
import StarRating from './StarRating.jsx';

const tile = ({ review }) => (
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
  </div>
);

export default tile;
