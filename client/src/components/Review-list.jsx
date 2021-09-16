import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetReviewsQuery } from '../reducers/Review-List-Slice';

const ReviewList = () => {
  const [moreReviews, setMoreReviews] = useState(true);
  const [sortBy, setSortBy] = useState('helpful');
  const [count, setCount] = useState(10);
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

  return (
    <>
      Dropdownbutton here for sort by
      {content}
      <button type="button" onClick={moreReviewsVisibility}>More Reviews</button>
    </>
  );
};

export default ReviewList;
