/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './reviewlist.css';

const stars = ({ setStarRating }) => {
  const [star, setStar] = useState(() => '');

  const starRating = (
    star
  );
  return (
    <div id="rating">
      <div className="rate">
        <input type="radio" id="star5" name="rate" value="5" onClick={(e) => { setStar('Great'); setStarRating(parseInt(e.target.value, 10)); }} />
        <label htmlFor="star5" title="text">5 stars</label>
        <input type="radio" id="star4" name="rate" value="4" onClick={(e) => { setStar('Good'); setStarRating(parseInt(e.target.value, 10)); }} />
        <label htmlFor="star4" title="text">4 stars</label>
        <input type="radio" id="star3" name="rate" value="3" onClick={(e) => { setStar('Average'); setStarRating(parseInt(e.target.value, 10)); }} />
        <label htmlFor="star3" title="text">3 stars</label>
        <input type="radio" id="star2" name="rate" value="2" onClick={(e) => { setStar('Fair'); setStarRating(parseInt(e.target.value, 10)); }} />
        <label htmlFor="star2" title="text">2 stars</label>
        <input type="radio" id="star1" name="rate" value="1" onClick={(e) => { setStar('Poor'); setStarRating(parseInt(e.target.value, 10)); }} />
        <label htmlFor="star1" title="text">1 star</label>
      </div>
      &nbsp; &nbsp;
      {starRating}
    </div>
  );
};

export default stars;
