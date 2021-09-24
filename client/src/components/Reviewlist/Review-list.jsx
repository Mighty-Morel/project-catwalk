/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetReviewsQuery, useGetMetaReviewsQuery, useGetProductInfoQuery } from '../../reducers/Review-List-Slice';
import ReviewModal from './Review-Modal.jsx';
import './reviewlist.css';
import Tile from './Tile.jsx';
import Ratings from './Ratings.jsx';

const ReviewsAndRatings = () => {
  const [sortBy, setSort] = useState(() => 'helpful');
  const [count, setCount] = useState(() => 2);
  const [show, setShow] = useState(() => false);
  const productId = useSelector((state) => state.product.id);

  useEffect(() => {
    setCount(2);
    setSort('helpful');
  }, [productId]);

  const showModal = () => {
    setShow(true);
  };
  const hideModal = () => {
    setShow(false);
  };

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
  const {
    data: productInfo,
    isSuccess: infoSuccess,
  } = useGetProductInfoQuery(productId);

  const {
    data: reviewInfo,
    isSuccess: reviewInfoSuccess,
  } = useGetMetaReviewsQuery(productId);

  let dropdown;
  let content;
  let moreReviews;
  let addReview;
  let ratings;

  if (isLoading) {
    content = (
      <p>
        Loading...zzz, this request might be taking some time
      </p>
    );
  } else if (isSuccess && infoSuccess && reviewInfoSuccess) {
    dropdown = (
      <>
        {reviews.results.length}
        &nbsp;reviews, sorted by&nbsp;
        <div className="RLdropdown">
          {sortBy}
          <div className="RLdropdown-content">
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
    addReview = (
      <>
        <ReviewModal
          show={show}
          handleClose={hideModal}
          product={productInfo}
          reviewInfo={reviewInfo}
        />
        <button
          className="more-reviews"
          type="button"
          onClick={showModal}
        >
          Add a Review +
        </button>
      </>
    );
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
    ratings = (
      <Ratings
        meta={reviewInfo}
      />
    );
  } else if (isError) {
    content = (
      <p>
        {error.toString()}
      </p>
    );
  }

  return (
    <div id="ratingsAndReviews">
      <h4 className="RL"> Ratings & Reviews</h4>
      <div className="RLcontainer">
        <div className=".item-ratings">
          {ratings}
        </div>
        <div className="item-reviews">
          {dropdown}
          {content}
          <br />
          {moreReviews}
          {addReview}
        </div>
      </div>
    </div>
  );
};

export default ReviewsAndRatings;
