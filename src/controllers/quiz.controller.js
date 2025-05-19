const catchAsync = require('../utils/catchAsync');
const { Quiz } = require('../services/quiz.service');

const getQuiz = catchAsync(async (req, res) => {
  const result = await Quiz(req, res);
  // The service already sends the response, so we don't need to send it again
  return result;
});

module.exports = {
  getQuiz,
};
