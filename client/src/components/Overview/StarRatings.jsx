/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateProductInfo } from '../../reducers/Example-Reducer';
import { updateStyles, updateStyle } from '../../reducers/Style-Reducer';
import { useGetReviewsQuery, useGetMetaReviewsQuery, useGetProductInfoQuery } from '../../reducers/Review-List-Slice';

const StarRatings = ({ productId }) => {
  // const productId = useSelector((state) => state.product.id);

  const {
    data: reviewInfo,
    isLoading,
    isSuccess: reviewInfoSuccess,
  } = useGetMetaReviewsQuery(productId);

  const { ratings } = reviewInfo;
  let totalRatings = 0;
  let totalScore = 0;
  Object.entries(ratings).forEach((pair) => {
    const score = pair[0];
    const count = pair[1];
    totalRatings += Number(count);
    totalScore += (score * count);
  });

  const avgRating = totalScore / totalRatings;

  console.log(totalRatings, totalScore, avgRating);

  if (isLoading) {
    return <div>Loading Rating...</div>;
  }
  return (
    <>
      <a href="#reviews" className="overview-ratings-link">
        Read all
        {' '}
        {totalRatings}
        {' '}
        reviews
      </a>
    </>
  );
};
export default StarRatings;
