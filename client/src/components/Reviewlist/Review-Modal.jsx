import './reviewlist.css';
import React from 'react';
import PropTypes from 'prop-types';
import { useAddReviewMutation } from '../../reducers/Review-List-Slice';

const ReviewModal = ({ handleClose, show }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  ReviewModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
  };
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="modal-header">
          <h4 className="modal-title">Submit Review</h4>
        </div>
        <div className="modal-body">
          <textarea
            id="answer-entry"
            maxLength="200"
          />
        </div>
        <div className="modal-footer">
          <button type="button" onClick={handleClose}>Close</button>
          <button type="submit" onClick={() => {}}>Submit</button>
        </div>
      </section>
    </div>
  );
};

export default ReviewModal;
