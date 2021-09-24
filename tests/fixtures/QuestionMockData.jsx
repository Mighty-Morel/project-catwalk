const mockQuestionData = {};
mockQuestionData.data = {
  product_id: 11,
  results: [
    {
      question_id: 1,
      question_body: 'Can I wash it?',
      question_date: '2018-02-08T00:00:00.0007',
      asker_name: 'bobby',
      question_helpfulness: 8,
      reported: false,
      answers: {
        888999: {
          id: 888999,
          body: 'Put it in the washer',
          date: '2018-03-08T00:00:00.000Z',
          answerer_name: 'jimmy',
          helpfulness: 17,
          photos: [],
        },
      },
    },
    {
      question_id: 2,
      question_body: 'Is it big or small?',
      question_date: '2018-03-08T00:00:00.0007',
      asker_name: 'john',
      question_helpfulness: 12,
      reported: false,
      answers: {
        123456: {
          id: 123456,
          body: 'It runs extra large',
          date: '2018-04-08T00:00:00.000Z',
          answerer_name: 'lester',
          helpfulness: 21,
          photos: [],
        },
      },
    },
    {
      question_id: 3,
      question_body: 'What material is it?',
      question_date: '2018-05-08T00:00:00.0007',
      asker_name: 'stephen',
      question_helpfulness: 20,
      reported: false,
      answers: {
        654321: {
          id: 654321,
          body: 'The finest',
          date: '2019-04-08T00:00:00.000Z',
          answerer_name: 'bigdan',
          helpfulness: 2,
          photos: [],
        },
      },
    },
  ],
};

const mockAnswerData = {};
mockAnswerData.one = {
  data: {
    question: 1,
    page: 1,
    count: 5,
    results: [
      {
        answer_id: 888999,
        body: 'Put it in the washer',
        date: '2018-03-08T00:00:00.000Z',
        answerer_name: 'jimmy',
        helpfulness: 17,
        photos: [],
      },
    ],
  },
};
mockAnswerData.two = {
  data: {
    question: 2,
    page: 1,
    count: 5,
    results: [
      {
        answer_id: 123456,
        body: 'It runs extra large',
        date: '2018-04-08T00:00:00.000Z',
        answerer_name: 'lester',
        helpfulness: 21,
        photos: [],
      },
    ],
  },
};
mockAnswerData.three = {
  data: {
    question: 3,
    page: 1,
    count: 5,
    results: [
      {
        answer_id: 654321,
        body: 'The finest',
        date: '2019-04-08T00:00:00.000Z',
        answerer_name: 'bigdan',
        helpfulness: 2,
        photos: [],
      },
      {
        answer_id: 777888,
        body: 'Dont ever wash it',
        date: '2018-01-08T00:00:00.000Z',
        answerer_name: 'smelly',
        helpfulness: 1,
        photos: [],
      },
      {
        answer_id: 666777,
        body: 'Only with cold water',
        date: '2019-03-08T00:00:00.000Z',
        answerer_name: 'sam',
        helpfulness: 4,
        photos: [],
      },
    ],
  },
};

const mockProductData = {
  data: {
    name: 'gucci socks',
  },
};

export { mockQuestionData, mockAnswerData, mockProductData };
