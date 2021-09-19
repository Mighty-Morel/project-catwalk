import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetReviewsQuery } from '../reducers/Review-List-Slice';

const ReviewList = () => {
  const [style, setStyle] = useState({ display: 'visible' });
  const [sortBy, setSortBy] = useState('helpful');
  const [count, setCount] = useState(() => 2);
  const productId = useSelector((state) => state.product.id);

  useEffect(() => {
    setCount(2);
    setSortBy('helpful');
  }, [productId]);

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

  let content;
  if (isLoading) {
    content = (
      <p>
        Loading...zzz, this request might be taking some time
      </p>
    );
  } else if (isSuccess) {
    console.log('success:', reviews.results.length);
    console.log(count);
    content = reviews.results.map((review) => (
      <p key={review.review_id} value="test">
        {review.review_id}
      </p>
    ));
    if (count === reviews.results.length) {
      return (
        <>
          Add Dropdown here
          {content}
          <button
            style={style}
            type="button"
            onClick={() => {
              setCount((prevCount) => prevCount + 2);
            }}
          >
            More Reviews
          </button>
        </>
      );
    }
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
    </>
  );
};

export default ReviewList;
