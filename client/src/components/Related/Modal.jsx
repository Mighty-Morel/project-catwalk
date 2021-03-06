/* eslint-disable import/extensions */
import React from 'react';
import './modal.css';

// eslint-disable-next-line react/prop-types
const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'c-modal c-display-block' : 'c-modal c-display-none';

  return (
    <div className={showHideClassName}>
      <section className="c-modal-main">
        {children}
        <button className="c-modal-button" type="button" onClick={handleClose}>
          X
        </button>
      </section>
    </div>
  );
};

export default Modal;
