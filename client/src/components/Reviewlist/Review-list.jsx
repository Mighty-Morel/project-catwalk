import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetReviewsQuery } from '../../reducers/Review-List-Slice';
import './reviewlist.css';

const ReviewList = () => {
  const [sortBy, setSort] = useState('helpful');
  const [count, setCount] = useState(() => 2);
  const productId = useSelector((state) => state.product.id);

  useEffect(() => {
    setCount(2);
    setSort('helpful');
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

  let dropdown;
  let content;
  let moreReviews;

  if (isLoading) {
    content = (
      <p>
        Loading...zzz, this request might be taking some time
      </p>
    );
  } else if (isSuccess) {
    dropdown = (
      <>
        {reviews.results.length}
        &nbsp;reviews, sorted by&nbsp;
        <div className="dropdown">
          {sortBy}
          <div className="dropdown-content">
            <option onClick={() => setSort('helpful')}>helpful</option>
            <option onClick={() => setSort('relevant')}>relevant</option>
            <option onClick={() => setSort('newest')}>recent</option>
          </div>
        </div>
      </>
    );
    content = reviews.results.map((review) => (
      <p key={review.review_id} value="test">
        {review.review_id}
      </p>
    ));
    if (count === reviews.results.length) {
      moreReviews = (
        <>
          <button
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
      {dropdown}
      {content}
      {moreReviews}
    </>
  );
};

export default ReviewList;
