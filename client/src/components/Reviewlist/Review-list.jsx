/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [filter, setFilter] = useState(() => (
    {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    }
  ));

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
    data: allReviews,
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
    isLoading: infoIsLoading,
    isSuccess: infoIsSuccess,
    // isError: infoisError,
    // error: infoError
  } = useGetProductInfoQuery(productId);
  const {
    data: reviewInfo,
    isLoading: reviewInfoIsLoading,
    isSuccess: reviewInfoIsSuccess,
  } = useGetMetaReviewsQuery(productId);

  const handlePut = (reviewId, type) => {
    axios.put(`/api/reviews/${reviewId}/${type}`);
  };

  let dropdown;
  let content;
  let moreReviews;
  let addReview;
  let ratings;

  if (isLoading || infoIsLoading || reviewInfoIsLoading) {
    content = (
      <p>
        Loading...zzz, this request might be taking some time
      </p>
    );
  } else if (isSuccess && infoIsSuccess && reviewInfoIsSuccess) {
    console.log(allReviews);
    let reviews = [];
    for (let i = 0; i < allReviews.results.length; i += 1) {
      if (filter[allReviews.results[i].rating]) {
        reviews.push(allReviews.results[i]);
      }
    }
    if (reviews.length === 0) {
      reviews = allReviews.results;
    }
    console.log('reviews', reviews);
    dropdown = (
      <>
        {reviews.length}
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
    content = reviews.map((review) => (
      <Tile key={review.review_id} review={review} handlePut={handlePut} />
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
    if (count === allReviews.results.length) {
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
        setFilter={setFilter}
        filter={filter}
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
