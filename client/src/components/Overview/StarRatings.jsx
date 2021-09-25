/* eslint-disable import/extensions */
import React from 'react';
import { useGetMetaReviewsQuery } from '../../reducers/Review-List-Slice';
import StarRating from '../Reviewlist/StarRating.jsx';

const StarRatings = ({ productId }) => {
  const {
    data: reviewInfo,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMetaReviewsQuery(productId);

  let content;

  if (isLoading) {
    content = (
      <p>
        Loading ratings...
      </p>
    );
  } else if (isSuccess) {
    let score = 0;
    let count = 0;
    let totalRatings = 0;
    let totalScore = 0;
    let starAvg = 0;

    Object.entries(reviewInfo.ratings).forEach((pair) => {
      score = parseInt(pair[0], 10);
      count = parseInt(pair[1], 10);
      totalRatings += count;
      totalScore += (score * count);
    });
    starAvg = totalScore / totalRatings;
    // console.log(totalScore, totalRatings)
    // console.log(reviewInfo.ratings, starAvg);

    content = (
      <div className="overview-ratings">
        <StarRating width={`${(starAvg / 5) * 100}%`} />
        <a href="#reviews" className="overview-ratings-link">
          Read all
          {' '}
          {totalRatings}
          {' '}
          reviews
        </a>
      </div>
    );
  } else if (isError) {
    content = (
      <p>
        {error.toString()}
      </p>
    );
  }

  return content;
};

export default StarRatings;
