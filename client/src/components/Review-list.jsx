import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetReviewsQuery } from '../reducers/Review-List-Slice';

const ReviewList = () => {
  const [moreReviews, setMoreReviews] = useState(true);
  const [sortBy, setSortBy] = useState('helpful');
  const [count, setCount] = useState(2);
  const productId = useSelector((state) => state.product.id);
  const {
    data: reviews,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetReviewsQuery(
    {
      productId,
      count,
      sort: sortBy,
    },
  );

  const moreReviewsVisibility = () => {
    setCount(count + 2);
    if (reviews.results.length < count) {
      setMoreReviews(false);
    }
  };

  let style;

  if (moreReviews) {
    style = { display: 'visible' };
  } else {
    style = { display: 'none' };
  }

  let content;
  if (isLoading) {
    content = (
      <p>
        Loading...zzz, this request might be taking some time
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

  return (
    <>
      Add Dropdown here
      {content}
      <button style={style} type="button" onClick={moreReviewsVisibility}>More Reviews</button>
    </>
  );
};

export default ReviewList;
