import React from 'react';
// eslint-disable-next-line import/extensions
import StarRating from '../Reviewlist/StarRating.jsx';
import { useGetMetaReviewsQuery } from '../../reducers/Review-List-Slice';

const CarouselStar = ({ product }) => {
  const {
    data: reviewInfo,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMetaReviewsQuery(product.relatedId);

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

    starAvg = totalRatings === 0 ? 0 : totalScore / totalRatings;

    if (totalRatings === 0) {
      content = <div className="overview-ratings" />;
    } else {
      content = (
        <div className="overview-ratings">
          <StarRating width={`${(starAvg / 5) * 100}%`} />
        </div>
      );
    }
  } else if (isError) {
    content = (
      <p>
        {error.toString()}
      </p>
    );
  }

  return content;
};

export default CarouselStar;
