import React, { useState } from 'react';
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

  // Destructuring
  const { toggleAnswerForm, id, question } = props;

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

  // Get product name
  axios.get(`/products/${currentId}`)
    .then((response) => {
      setProductName(response.data.name);
    })
    .catch((error) => {
      console.log('error in getting product name on the client side', error);
    });

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Submit Your Answer</h4>
          <span>"{productName}: {question}"</span>
        </div>
        <form>
          <div className="modal-body">
            <span>Your Answer:</span>
            <br />
            <input type="text" id="question-entry" size="100" maxLength="1000" onChange={textChangeHandler} />
            <br />
            <span>Name: </span>
            <input type="text" maxLength="60" placeholder="Example:jack543!" onChange={nameChangeHandler} />
            <br />
            <span><em>For privacy reasons, do not use your full name or email address</em></span>
            <br />
            <span>Email: </span>
            <input type="text" maxLength="60" placeholder="jack@email.com" onChange={emailChangeHandler} />
            <br />
            <span>For authentication reasons, you will not be emailed</span>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={toggleAnswerForm}>Close</button>
            <button type="button" onClick={postAnswer}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnswerModal;
