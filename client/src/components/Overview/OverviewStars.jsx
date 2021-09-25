/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

const stars = ({ width }) => (
  <span className="overview-stars">
    <div className="overview-back-stars">
      <i className="fa fa-star" aria-hidden="true" />
      <i className="fa fa-star" aria-hidden="true" />
      <i className="fa fa-star" aria-hidden="true" />
      <i className="fa fa-star" aria-hidden="true" />
      <i className="fa fa-star" aria-hidden="true" />

      <div className="overview-front-stars" style={{ width: [width] }}>
        <i className="fa fa-star" aria-hidden="true" />
        <i className="fa fa-star" aria-hidden="true" />
        <i className="fa fa-star" aria-hidden="true" />
        <i className="fa fa-star" aria-hidden="true" />
        <i className="fa fa-star" aria-hidden="true" />
      </div>
    </div>
  </span>
);

export default stars;
