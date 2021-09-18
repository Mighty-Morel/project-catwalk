/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React from 'react';
import axios from 'axios';
import modal from './modal.css';

// class Modal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {

//     };
//     this.handleClose = this.handleClose.bind(this);
//     this.showHideClassName = this.showHideClassName.bind(this);
//   }

//   render() {
//     return (
//       <div className={showHideClassName}>
//         <section className="modal-main">
//           {children}
//           <button type="button" onClick={handleClose}>
//             Close
//           </button>
//         </section>
//       </div>
//     );
//   }
// }

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;
