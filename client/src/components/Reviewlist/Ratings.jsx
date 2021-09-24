/* eslint-disable import/extensions */
import React from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';

const Ratings = ({ meta }) => {
  const recommended = parseInt(meta.recommended.true, 10);
  const notRecommended = parseInt(meta.recommended.false, 10);
  const recommendPercent = ((recommended / (notRecommended + recommended)) * 100).toFixed(0);
  const ratings = [];
  const ratingKeys = Object.keys(meta.ratings);
  for (let i = 0; i < ratingKeys.length; i += 1) {
    ratings.push(parseInt(meta.ratings[ratingKeys[i]], 10));
  }
  const [ones, twos, threes, fours, fives] = ratings;
  const totalRatings = ones + twos + threes + fours + fives;
  const avgRating = (ones * 1 + twos * 2 + threes * 3 + fours * 4 + fives * 5) / totalRatings;
  const starAvg = (Math.round(avgRating * 4) / 4).toFixed(2);

  Ratings.propTypes = {
    meta: PropTypes.shape({
      recommended: PropTypes.shape({
        true: PropTypes.string,
        false: PropTypes.string,
      }),
      ratings: PropTypes.shape({
        1: PropTypes.string,
        2: PropTypes.string,
        3: PropTypes.string,
        4: PropTypes.string,
        5: PropTypes.string,
      }),
    }).isRequired,
  };

  return (
    <>
      <div className="ratingTitle">
        <div id="rating">{avgRating.toFixed(1)}</div>
        <StarRating width={`${(starAvg / 5) * 100}%`} />
      </div>
      <p>
        {recommendPercent}
        % of reviews recommend this product
      </p>
      <RatingBreakdown ratings={ratings} totalRatings={totalRatings} />
    </>
  );
};

export default Ratings;
