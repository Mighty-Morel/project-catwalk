import React, { useState } from 'react';
import axios from 'axios';
import styling from './questions.css';

const AnswerModal = (props) => {
  const [textInput, setTextInput] = useState('');
  const [nameInput, setNameInput] = useState('sample');
  const [emailInput, setEmailInput] = useState('sample@yahoo.com');
  const [imageInput, setImageInput] = useState([]);

  // Destructuring
  const { toggleAnswerForm, id } = props;

  // Input change handlers
  const textChangeHandler = (event) => {
    setTextInput(event.target.value);
  };

  // post answer information to API
  const postAnswer = () => {
    const answerInfo = {
      body: textInput,
      name: nameInput,
      email: emailInput,
      photos: imageInput,
    };
    axios.post(`/qa/questions/${id}/answers`, answerInfo)
      .then(() => {
        toggleAnswerForm();
      })
      .catch((error) => {
        console.log('error in posting answer on the client', error);
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Submit Answer</h4>
        </div>
        <div className="modal-body">
          <textarea id="answer-entry" maxLength="200" onChange={textChangeHandler} />
        </div>
        <div className="modal-footer">
          <button type="button" onClick={toggleAnswerForm}>Close</button>
          <button type="submit" onClick={postAnswer}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default AnswerModal;
