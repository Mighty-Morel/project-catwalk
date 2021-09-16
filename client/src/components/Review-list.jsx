import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetReviewsQuery } from '../reducers/Review-List-Slice';

const ReviewList = () => {
  const [moreReviews, setMoreReviews] = useState(false);
  const productId = useSelector((state) => state.product.id);

  const {
    data: reviews,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetReviewsQuery(productId);
  console.log(reviews);
  let content;

  if (isLoading) {
    content = (
      <p>
        Loading...plz forgive us, this request might be taking some time
      </p>
    );
  } else if (isSuccess) {
    content = reviews.results.map((review) => (
      <p key={review.review_id} value="test">
        {review.review_id}
      </p>
    ));
  } else if (isError) {
    content = (
      <p>
        {error.toString()}
      </p>
    );
  }

  if (moreReviews) {
    return (
      <>
        {content}
      </>
    );
  }
  return (
    <>
      {content}
    </>
  );
};

export default ReviewList;
