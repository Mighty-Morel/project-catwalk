/* eslint-disable import/extensions */
import React from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';

const Ratings = ({ meta, setFilter, filter }) => {
  let recommended = parseInt(meta.recommended.true, 10);
  let notRecommended = parseInt(meta.recommended.false, 10);
  if (Number.isNaN(recommended)) {
    recommended = 0;
  }
  if (Number.isNaN(notRecommended)) {
    notRecommended = 0;
  }
  const recommendPercent = ((recommended / (notRecommended + recommended)) * 100).toFixed(0);
  const ratings = [];
  for (let i = 1; i < 6; i += 1) {
    if (meta.ratings[i]) {
      ratings.push(parseInt(meta.ratings[i], 10));
    } else {
      ratings.push(0);
    }
  }
  const [ones, twos, threes, fours, fives] = ratings;

  const totalRatings = ones + twos + threes + fours + fives;
  const avgRating = (ones * 1 + twos * 2 + threes * 3 + fours * 4 + fives * 5) / totalRatings;
  const starAvg = (Math.round(avgRating * 4) / 4).toFixed(2);

  let count = 0;
  let resetFilter;
  const filters = [];
  for (let i = 1; i < 6; i += 1) {
    if (filter[i]) {
      count += 1;
      filters.push(i);
    }
  }
  if (count > 1) {
    resetFilter = (
      <div>
        Currently filtering reviews by the following stars:
        <br />
        {filters.join(', ')}
        <option
          className="RLratingfilter"
          onClick={() => setFilter({
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
          })}
        >
          Remove All Filters
        </option>
      </div>
    );
  }
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
    setFilter: PropTypes.func.isRequired,
    filter: PropTypes.shape({
      1: PropTypes.bool,
      2: PropTypes.bool,
      3: PropTypes.bool,
      4: PropTypes.bool,
      5: PropTypes.bool,
    }).isRequired,
  };

  return (
    <>
      <div className="ratingTitle">
        <div id="rating">{avgRating.toFixed(1)}</div>
        <span className="star-rating">
          <StarRating width={`${(starAvg / 5) * 100}%`} />
        </span>
      </div>
      <p>
        {recommendPercent}
        % of reviews recommend this product
      </p>
      <RatingBreakdown
        ratings={ratings}
        totalRatings={totalRatings}
        setFilter={setFilter}
      />
      {resetFilter}
    </>
  );
};

export default Ratings;
