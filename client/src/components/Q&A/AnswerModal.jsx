import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import styling from './questions.css';

const AnswerModal = (props) => {
  const [textInput, setTextInput] = useState('');

  // Destructuring
  const { toggleAnswerForm } = props;

  const onChangeHandler = (event) => {
    setTextInput(event.target.value);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Submit Answer</h4>
        </div>
        <div className="modal-body">
          <textarea id="answer-entry" maxLength="200" onChange={onChangeHandler} />
        </div>
        <div className="modal-footer">
          <button type="button" onClick={toggleAnswerForm}>Close</button>
          <button type="submit" onClick={toggleAnswerForm}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default AnswerModal;
