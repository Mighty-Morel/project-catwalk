import React from 'react';
// eslint-disable-next-line import/extensions
import StarRating from './StarRating.jsx';

const Ratings = ({ meta }) => {
  const recommended = parseInt(meta.recommended.true, 10);
  const notRecommended = parseInt(meta.recommended.false, 10);
  const recommendPercent = recommended / notRecommended;

  const ratings = [];
  const ratingKeys = Object.keys(meta.ratings);
  for (let i = 0; i < ratingKeys.length; i += 1) {
    ratings.push(parseInt(meta.ratings[ratingKeys[i]], 10));
  }
  const [one, two, three, four, five] = ratings;
  const totalRatings = one + two + three + four + five;
  const avgRating = (one * 1 + two * 2 + three * 3 + four * 4 + five * 5) / totalRatings;
  const starAvg = (Math.round(avgRating * 4) / 4).toFixed(2);
  console.log(starAvg);
  return (
    <StarRating width={`${(starAvg / 5) * 100}%`} />
  );
};

export default Ratings;
