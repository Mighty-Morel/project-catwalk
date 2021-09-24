/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useGetMetaReviewsQuery } from '../../reducers/Review-List-Slice';

const StarRatings = ({ productId }) => {
  // const productId = useSelector((state) => state.product.id);
  const [starType, setStarType] = useState(0);

  let ratings = {};
  const getRatings = (productId) => {
    axios.get('/api/reviews/meta', { product_id: productId })
      .then((response) => {
        ratings = response.data.ratings;
        return response.data})
      .catch((err) => console.log('Error getting ratings', err));
  };
  // useEffect(getRatings(productId), []);
  // const {
  //   data: reviewInfo,
  //   isLoading,
  //   isSuccess: reviewInfoSuccess,
  // } = useGetMetaReviewsQuery(productId);

  // useEffect(useGetMetaReviewsQuery(productId), []);

  // const { ratings } = reviewInfo;
  let totalRatings = 0;
  let totalScore = 0;
  Object.entries(ratings).forEach((pair) => {
    const score = pair[0];
    const count = pair[1];
    totalRatings += Number(count);
    totalScore += (score * count);
  });

  const avgRating = totalScore / totalRatings;
  const wholeNum = Math.floor(avgRating);
  const decimals = avgRating - wholeNum;

  console.log(totalRatings, totalScore, avgRating, wholeNum, decimals);

  // render star type
  const renderStarType = () => {
    if (decimals < 0.125) {
      setStarType(0);
    } else if (decimals < 0.375) {
      setStarType(1);
    } else if (decimals < 0.625) {
      setStarType(2);
    } else if (decimals < 0.875) {
      setStarType(3);
    } else setStarType(4);
  };

  useEffect(renderStarType, [productId]);

  const renderStars = () => {
    switch (wholeNum) {
      case 1:
        return (
          <span>
            {starType}
            ☆☆☆☆
          </span>
        );
      case 2:
        return (
          <span>
            ★
            {starType}
            ☆☆☆
          </span>
        );
      case 3:
        return (
          <span>
            ★★
            {starType}
            ☆☆
          </span>
        );
      case 4:
        return (
          <span>
            ★★★
            {starType}
            ☆
          </span>
        );
      default:
        return (
          <span>
            ★★★★
            {starType}
          </span>
        );
    }
  };

  if (!ratings[1]) {
  // if (isLoading || !reviewInfo.ratings[1]) {
    return <div>Loading Rating...</div>;
  }
  return (
    <>
      {renderStars()}
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
