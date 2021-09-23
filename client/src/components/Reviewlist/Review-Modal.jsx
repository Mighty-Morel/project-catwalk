/* eslint-disable import/extensions */
import axios from 'axios';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './reviewlist.css';
import Stars from './Stars.jsx';
import Recommend from './Recommend.jsx';
import Characteristic from './Characteristic.jsx';

const ReviewModal = ({
  handleClose, show, product, reviewInfo,
}) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  const [recommend, setRecommend] = useState(null);
  const [characteristics, setCharacteristics] = useState({});
  const [starRating, setStarRating] = useState(0);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (starRating === 0) {
      return 'Please rate the product';
    }
    if (recommend === null) {
      return 'Please select a recommendation';
    }
    if (body.length <= 50) {
      return 'Please input a body of at least 50 characters';
    }
    if (nickname.length === 0) {
      return 'Please input a nickname';
    }
    if (email.length === 0) {
      return 'Please input an email';
    }
    if (!email.includes('@') || !email.includes('.com')) {
      return 'Please input an email in proper format';
    }
    axios.post('/api/reviews',
      {
        product_id: product.id,
        rating: starRating,
        summary,
        body,
        recommend,
        name: nickname,
        email,
        characteristics,
      })
      .then(() => {
        handleClose();
      });
    return null;
  };

  const chars = Object.keys(reviewInfo.characteristics).map(
    (key) => (
      <Characteristic
        score={reviewInfo.characteristics[key]}
        key={reviewInfo.characteristics[key].id}
        id={reviewInfo.characteristics[key].id}
        name={key}
        setValue={setCharacteristics}
        characteristics={characteristics}
      />
    ),
  );

  ReviewModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    product: PropTypes.shape({
      campus: PropTypes.string,
      category: PropTypes.string,
      created_at: PropTypes.string,
      default_price: PropTypes.string,
      description: PropTypes.string,
      features: PropTypes.arrayOf(PropTypes.object),
      id: PropTypes.number,
      name: PropTypes.string,
      slogan: PropTypes.string,
      updated_at: PropTypes.string,
    }).isRequired,
    reviewInfo: PropTypes.shape({
      characteristics: PropTypes.shape({
        id: PropTypes.number,
        value: PropTypes.string,
      }),
    }).isRequired,
  };

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="modal-header">
          <h3 className="modal-title">Write Your Review</h3>
          <h5>
            About the&nbsp;
            {product.name}
          </h5>
        </div>
        <form className="modal-body">
          <Stars setStarRating={setStarRating} />
          <Recommend setRecommend={setRecommend} />
          <br />
          <span>Characteristics:</span>
          {chars}
          <span>Review Summary:</span>
          <input
            type="text"
            size="60"
            maxLength="60"
            placeholder="Example: Best purchase ever!"
            onChange={(e) => { setSummary(e.target.value); }}
          />
          <span>Review Body:</span>
          <textarea
            type="text"
            maxLength="1000"
            placeholder="Why did you like the product or not?."
            onChange={(e) => { setBody(e.target.value); }}
          />
          <span>What is your nickname: </span>
          <input
            type="text"
            size="60"
            maxLength="60"
            placeholder="Example: jack543!"
            onChange={(e) => { setNickname(e.target.value); }}
          />
          <span><em>For privacy reasons, do not use your full name or email address</em></span>
          <span>Your email: </span>
          <input
            type="text"
            size="60"
            maxLength="60"
            placeholder="jack@email.com"
            onChange={(e) => { setEmail(e.target.value); }}
          />
          <span><em>For authentication reasons, you will not be emailed</em></span>
          <span className="error">
            {error}
          </span>
        </form>
        <div className="modal-footer">
          <button
            className="more-reviews"
            type="button"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="more-reviews"
            type="button"
            onClick={() => {
              setError(handleSubmit());
            }}
          >
            Submit
          </button>
        </div>
      </section>
    </div>
  );
};

export default ReviewModal;
