import React, { useState } from 'react';
import axios from 'axios';
import styling from './questions.css';

const QuestionModal = (props) => {
  const [textInput, setTextInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  // Destructuring
  const { toggleQuestionForm, productId } = props;

  // Input change handlers
  const textChangeHandler = (event) => {
    setTextInput(event.target.value);
  };

  const nameChangeHandler = (event) => {
    setNameInput(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmailInput(event.target.value);
  };

  // submit question information to API
  const submitQuestion = () => {
    const questionInfo = {
      body: textInput,
      name: nameInput,
      email: emailInput,
      product_id: productId,
    };
    axios.post('/qa/questions', questionInfo)
      .then(() => {
        toggleQuestionForm();
      })
      .catch((error) => {
        console.log('error in posting question on the client', error);
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Submit Question</h4>
        </div>
        <form>
          <div className="modal-body">
            <span>Your Question:</span>
            <input type="text" id="question-entry" size="100" maxLength="1000" placeholder="Why did you like the product or not?" onChange={textChangeHandler} />
            <span>Name: </span>
            <input type="text" maxLength="60" placeholder="Example: jackson11!" onChange={nameChangeHandler} />
            <span>For privacy reasons, do not use your full name or email address</span>
            <span>Email: </span>
            <input type="text" maxLength="60" onChange={emailChangeHandler} />
            <span>For authentication reasons, you will not be emailed</span>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={toggleQuestionForm}>Close</button>
            <button type="button" onClick={submitQuestion}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionModal;
