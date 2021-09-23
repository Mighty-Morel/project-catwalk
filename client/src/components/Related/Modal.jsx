/* eslint-disable import/extensions */
import React from 'react';
import './modal.css';

// eslint-disable-next-line react/prop-types
const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button className="modal-button" type="button" onClick={handleClose}>
          X
        </button>
      </section>
    </div>
  );
};

export default Modal;
