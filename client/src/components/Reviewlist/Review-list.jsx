import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetReviewsQuery } from '../../reducers/Review-List-Slice';
import './reviewlist.css';
// eslint-disable-next-line import/extensions
import Tile from './Tile.jsx';

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
      <Tile key={review.review_id} review={review} />
    ));
    if (count === reviews.results.length) {
      moreReviews = (
        <>
          <button
            className="more-reviews"
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
      <h4> Ratings & Reviews</h4>
      <div className="container">
        <div className=".item-ratings">
          Ratings Placeholder
        </div>
        <div className="item-reviews">
          {dropdown}
          {content}
          {moreReviews}
        </div>
      </div>
    </>
  );
};

export default ReviewList;
