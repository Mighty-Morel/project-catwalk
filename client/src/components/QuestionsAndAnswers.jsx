import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const QuestionsAndAnswers = () => {
  const currentId = useSelector((state) => state.product.id);
  const productParams = { product_id: currentId };
  const [questions, setQuestions] = useState([]);
  axios.get(`/qa/questions/${currentId}`)
    .then((response) => {
      setQuestions(response.body);
    })
    .catch((error) => {
      console.log('Error from GET request:', error);
    });

  return (
    <>
      {questions}
    </>
  );
};

export default QuestionsAndAnswers;
