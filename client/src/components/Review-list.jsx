import SplitButton from 'react-bootstrap/SplitButton';
import Dropdown from 'react-bootstrap/Dropdown';
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
      <SplitButton
        key="sortBy"
        id="sortBy-dropDown"
        variant="sortby"
        title="sortBy"
      >
        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
        <Dropdown.Item eventKey="3" active>
          Active Item
        </Dropdown.Item>

      </SplitButton>
      {content}
      <button style={style} type="button" onClick={moreReviewsVisibility}>More Reviews</button>
    </>
  );
};

export default ReviewList;
