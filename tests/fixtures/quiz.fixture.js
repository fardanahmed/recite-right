const Quiz = require('../../src/models/quiz.model');
const { userOne } = require('./user.fixture');

const quizQuestions = [
  {
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 'Paris',
    createdBy: userOne._id,
    description: 'Test quiz description',
    title: 'Test quiz title',
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Jupiter',
    createdBy: userOne._id,
    description: 'Test quiz description',
    title: 'Test quiz title',
  },
];

const insertQuizQuestions = async (questions) => {
  await Quiz.insertMany(questions);
};

module.exports = {
  quizQuestions,
  insertQuizQuestions,
};
