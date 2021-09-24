import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styling from './questions.css';

const AnswerModal = (props) => {
  const currentId = useSelector((state) => state.product.id);

  const [productName, setProductName] = useState('');
  const [textInput, setTextInput] = useState('');
  const [nameInput, setNameInput] = useState('sample');
  const [emailInput, setEmailInput] = useState('sample@yahoo.com');
  const [imageInput, setImageInput] = useState([]);
  const [textCheck, setTextCheck] = useState(false);
  const [nameCheck, setNameCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);

  // Destructuring
  const { toggleAnswerForm, id, question } = props;

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

  // post answer information to API
  const postAnswer = () => {
    const answerInfo = {
      body: textInput,
      name: nameInput,
      email: emailInput,
      photos: imageInput,
    };
    if (textCheck && nameCheck && emailCheck) {
      axios.post(`/qa/questions/${id}/answers`, answerInfo)
        .then(() => {
          toggleAnswerForm();
        })
        .catch((error) => {
          console.log('error in posting answer on the client', error);
        });
    } else {
      alert('You must contain the following: answer, nickname, and email.');
    }
  };

  // Get product name
  const getProductName = () => {
    axios.get(`/products/${currentId}`)
      .then((response) => {
        setProductName(response.data.name);
      })
      .catch((error) => {
        console.log('error in getting product name on the client side', error);
      });
  };

  useEffect(getProductName, [currentId]);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Submit Your Answer</h4>
          <span data-testid="modal-subheader">
            &#34;
            {productName}
            :&#160;
            {question}
            &#34;
          </span>
        </div>
        <form>
          <div className="modal-body">
            <span>Your Answer: *</span>
            <br />
            <textarea data-testid="answer-input" type="text" id="modal-textbox" maxLength="1000" onChange={textChangeHandler} />
            <br />
            <br />
            <span>What is your nickname: *</span>
            <input data-testid="answer-input" type="text" size="60" maxLength="60" placeholder="Example: jack543!" onChange={nameChangeHandler} />
            <br />
            <span><em>For privacy reasons, do not use your full name or email address</em></span>
            <br />
            <br />
            <span>Your email: *</span>
            <input data-testid="answer-input" type="text" size="60" maxLength="60" placeholder="jack@email.com" onChange={emailChangeHandler} />
            <br />
            <span><em>For authentication reasons, you will not be emailed</em></span>
          </div>
          <div className="modal-footer">
            <button data-testid="close-modal" type="button" onClick={toggleAnswerForm}>Close</button>
            <button data-testid="submit-answer" type="button" onClick={postAnswer}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnswerModal;
