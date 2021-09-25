import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './questions.css';

const QuestionModal = (props) => {
  const [productName, setProductName] = useState('');
  const [textInput, setTextInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [textCheck, setTextCheck] = useState(false);
  const [nameCheck, setNameCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);

  // Destructuring
  const { toggleQuestionForm, productId } = props;

  // Input change handlers
  const textChangeHandler = (event) => {
    setTextInput(event.target.value);
    if (event.target.value.length > 0) {
      setTextCheck(true);
    } else {
      setTextCheck(false);
    }
  };

  const nameChangeHandler = (event) => {
    setNameInput(event.target.value);
    if (event.target.value.length > 0) {
      setNameCheck(true);
    } else {
      setNameCheck(false);
    }
  };

  const emailChangeHandler = (event) => {
    setEmailInput(event.target.value);
    if (event.target.value.indexOf('@') > -1) {
      setEmailCheck(true);
    } else {
      setEmailCheck(false);
    }
  };

  // submit question information to API
  const submitQuestion = () => {
    const questionInfo = {
      body: textInput,
      name: nameInput,
      email: emailInput,
      product_id: productId,
    };
    if (textCheck && nameCheck && emailCheck) {
      axios.post('/qa/questions', questionInfo)
        .then(() => {
          toggleQuestionForm();
        })
        .catch((error) => {
          console.log('error in posting question on the client', error);
        });
    } else {
      alert('You must contain the following: answer, nickname, and email.');
    }
  };

  // Get product name
  const getProductName = () => {
    axios.get(`/products/${productId}`)
      .then((response) => {
        setProductName(response.data.name);
      })
      .catch((error) => {
        console.log('error in getting product name on the client side', error);
      });
  };

  useEffect(getProductName, [productId]);

  return (
    <div className="QA-modal">
      <div className="QA-modal-content">
        <div className="QA-modal-header">
          <h4 className="QA-modal-title">Ask Your Question</h4>
          <span data-testid="modal-subheader">
            &#34;About the&#160;
            {productName}
            &#34;
          </span>
        </div>
        <form>
          <div className="QA-modal-body">
            <span>Your Question: *</span>
            <br />
            <textarea data-testid="question-input" type="text" id="QA-modal-textbox" maxLength="1000" placeholder="Why did you like the product or not?" onChange={textChangeHandler} />
            <br />
            <br />
            <span>What is your nickname: *</span>
            <input data-testid="question-input" type="text" size="60" maxLength="60" placeholder="Example: jackson11!" onChange={nameChangeHandler} />
            <br />
            <span><em>For privacy reasons, do not use your full name or email address</em></span>
            <br />
            <br />
            <span>Your email: *</span>
            <input data-testid="question-input" type="text" size="60" maxLength="60" placeholder="jackson@email.com" onChange={emailChangeHandler} />
            <br />
            <span><em>For authentication reasons, you will not be emailed</em></span>
          </div>
          <div className="QA-modal-footer">
            <button className="QA-buttons" data-testid="close-modal" type="button" onClick={toggleQuestionForm}>Close</button>
            <button className="QA-buttons" data-testid="submit-question" type="button" onClick={submitQuestion}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionModal;
