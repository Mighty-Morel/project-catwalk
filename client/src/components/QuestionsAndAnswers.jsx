import React from 'react';
import { useGetQuestionsQuery } from '../reducers/Questions-Api-Slice';

const QuestionsAndAnswers = () => {
  const {
    data: questions,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetQuestionsQuery();

  let content;

  if (isLoading) {
    content = (
      <p>
        Loading
      </p>
    );
  } else if (isSuccess) {
    content = questions.map((question) => (
      <p key={question.id}>
        {question.body}
      </p>
    ));
  } else if (isError) {
    content = (
      <p>
        {error.toString()}
      </p>
    );
  }

  return (
    <section>
      <h2> Questions </h2>
      {content}
    </section>
  );
};

export default QuestionsAndAnswers;
