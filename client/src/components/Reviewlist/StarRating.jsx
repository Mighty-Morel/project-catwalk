/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './reviewlist.css';

const starRating = ({ width }) => (
  <span className="star-rating">
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
  </span>
);

export default starRating;
