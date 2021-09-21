import React from 'react';
import moment from 'moment';

const tile = (props) => {
  console.log(props.review);
  return (
    <div className="tile">
      <p className="review-title">
        stars placeholder
        <span className="identity">
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
      <hr />
    </div>
  );
};

export default tile;
