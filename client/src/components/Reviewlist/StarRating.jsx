/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './reviewlist.css';
import 'font-awesome/css/font-awesome.min.css';

const starRating = ({ width }) => (

  <div className="star-rating" title="70%">
    <div className="RLback-stars">
      <i className="fa fa-star" aria-hidden="true" />
      <i className="fa fa-star" aria-hidden="true" />
      <i className="fa fa-star" aria-hidden="true" />
      <i className="fa fa-star" aria-hidden="true" />
      <i className="fa fa-star" aria-hidden="true" />

      <div className="RLfront-stars" style={{ width: [width] }}>
        <i className="fa fa-star" aria-hidden="true" />
        <i className="fa fa-star" aria-hidden="true" />
        <i className="fa fa-star" aria-hidden="true" />
        <i className="fa fa-star" aria-hidden="true" />
        <i className="fa fa-star" aria-hidden="true" />
      </div>
    </div>
  </div>
);

export default starRating;
