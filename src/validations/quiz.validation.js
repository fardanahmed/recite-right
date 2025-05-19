const Joi = require('joi');

const generateQuiz = {
  body: Joi.object().keys({
    topic: Joi.string().required().min(3).max(200),
    numQuestions: Joi.number().integer().min(1).max(20).default(15),
  }),
};

module.exports = {
  generateQuiz,
};
