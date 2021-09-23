import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styling from './questions.css';
// eslint-disable-next-line import/extensions
import QuestionEntry from './QuestionEntry.jsx';
import QuestionModal from './QuestionModal.jsx';

const QuestionsAndAnswers = () => {
  // Get the current product_id
  console.log(11);
  const currentId = useSelector((state) => state.product.id);

  // Create the state component to hold the questions
  const [questions, setQuestions] = useState([]);
  const [questionCount, setCount] = useState(2);
  const [extra, setExtra] = useState(false);
  const [questionModal, setQuestionModal] = useState(false);

  // Retrieve the questions from the API
  const getQuestions = () => {
    axios.get(`/qa/questions/${currentId}`)
      .then((response) => {
        console.log(24, response);
        const { results } = response.data;
        results.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
        setQuestions(results);
        // Compares count to number of questions, display up to four questions
        if (results.length > 2) {
          console.log(30);
          setCount(2);
          setExtra(true);
        } else {
          console.log(34);
          setCount(results.length);
        }
      })
      .catch((error) => {
        console.log('Error from GET request:', error);
      });
  };

  // Mount questions to state
  useEffect(getQuestions, [currentId]);

  // Show more questions and conditional rendering for extras
  const showMoreQuestions = () => {
    console.log(48);
    setCount(questionCount + 2);
    (() => { if (questions.length <= questionCount + 2) { setExtra(false); } })();
  };

  // Can be taken out if deemed collapse is unnecessary
  const collapseQuestions = () => {
    console.log(55);
    setCount(2);
    setExtra(true);
  };

  const renderMoreQuestions = () => {
    console.log(61);
    // Can be taken out if deemed collapse is unnecessary
    if (extra) {
      return (<button data-testid="render-more-question" type="button" onClick={showMoreQuestions}>See more questions</button>);
    }
    if (questionCount > 2) {
      return (<button data-testid="render-more-question" type="button" onClick={collapseQuestions}>Collapse questions</button>);
    }
    return null;
  };

  const displayedQuestions = questions.slice(0, questionCount);

  const toggleQuestionForm = () => {
    setQuestionModal(!questionModal);
  };

  const renderModal = () => {
    if (questionModal) {
      return (<QuestionModal toggleQuestionForm={toggleQuestionForm} productId={currentId} />);
    }
    return null;
  };

  return (
    <>
      {displayedQuestions.map((question) => {
        const {
          // eslint-disable-next-line camelcase
          question_id,
          // eslint-disable-next-line camelcase
          question_body,
          // eslint-disable-next-line camelcase
          question_date,
          // eslint-disable-next-line camelcase
          asker_name,
          // eslint-disable-next-line camelcase
          question_helpfulness,
          reported,
        } = question;
        return (
          <QuestionEntry
            // eslint-disable-next-line camelcase
            key={question_id}
            // eslint-disable-next-line camelcase
            id={question_id}
            // eslint-disable-next-line camelcase
            question={question_body}
            // eslint-disable-next-line camelcase
            date={question_date}
            // eslint-disable-next-line camelcase
            asker={asker_name}
            // eslint-disable-next-line camelcase
            helpfulness={question_helpfulness}
            reported={reported}
          />
        );
      })}
      {renderMoreQuestions()}
      <button data-testid="add-question" type="button" onClick={toggleQuestionForm}> Add Question</button>
      {renderModal()}
    </>
  );
};

export default QuestionsAndAnswers;
