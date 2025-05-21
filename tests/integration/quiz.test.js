const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { userOne, insertUsers } = require('../fixtures/user.fixture');
const { userOneAccessToken } = require('../fixtures/token.fixture');
const { quizQuestions, insertQuizQuestions } = require('../fixtures/quiz.fixture');

setupTestDB();

describe('Quiz routes', () => {
  beforeEach(async () => {
    await insertUsers([userOne]);
    await insertQuizQuestions(quizQuestions);
  });

  describe('GET /v1/quiz', () => {
    test('should return 200 and get quiz questions', async () => {
      const res = await request(app)
        .get('/v1/quiz')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        success: true,
        message: 'Quiz questions retrieved successfully',
        data: expect.any(Array),
        error: null,
      });
      expect(res.body.data).toHaveLength(quizQuestions.length);
      expect(res.body.data[0]).toEqual({
        id: expect.any(String),
        question: expect.any(String),
        options: expect.any(Array),
        correctAnswer: expect.any(String),
      });
    });

    test('should return 401 if access token is missing', async () => {
      await request(app).get('/v1/quiz').send().expect(httpStatus.UNAUTHORIZED);
    });

    test('should return 401 if access token is invalid', async () => {
      await request(app).get('/v1/quiz').set('Authorization', 'Bearer invalidToken').send().expect(httpStatus.UNAUTHORIZED);
    });
  });

  describe('POST /v1/quiz/submit', () => {
    test('should return 200 and calculate score when answers are submitted', async () => {
      const answers = {
        answers: quizQuestions.map((q) => ({
          questionId: q._id.toString(),
          selectedOption: q.correctAnswer,
        })),
      };

      const res = await request(app)
        .post('/v1/quiz/submit')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(answers)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        success: true,
        message: 'Quiz submitted successfully',
        data: {
          score: expect.any(Number),
          totalQuestions: quizQuestions.length,
          correctAnswers: quizQuestions.length,
        },
        error: null,
      });
    });

    test('should return 200 and calculate partial score when some answers are wrong', async () => {
      const answers = {
        answers: quizQuestions.map((q, index) => ({
          questionId: q._id.toString(),
          selectedOption: index === 0 ? 'wrong' : q.correctAnswer,
        })),
      };

      const res = await request(app)
        .post('/v1/quiz/submit')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(answers)
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        success: true,
        message: 'Quiz submitted successfully',
        data: {
          score: expect.any(Number),
          totalQuestions: quizQuestions.length,
          correctAnswers: quizQuestions.length - 1,
        },
        error: null,
      });
    });

    test('should return 400 if answers array is missing', async () => {
      await request(app)
        .post('/v1/quiz/submit')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send({})
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 if answers array is empty', async () => {
      await request(app)
        .post('/v1/quiz/submit')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send({ answers: [] })
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 if questionId is missing in any answer', async () => {
      const answers = {
        answers: [{ selectedOption: 'A' }, { questionId: quizQuestions[1]._id.toString(), selectedOption: 'B' }],
      };

      await request(app)
        .post('/v1/quiz/submit')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(answers)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 400 if selectedOption is missing in any answer', async () => {
      const answers = {
        answers: [
          { questionId: quizQuestions[0]._id.toString() },
          { questionId: quizQuestions[1]._id.toString(), selectedOption: 'B' },
        ],
      };

      await request(app)
        .post('/v1/quiz/submit')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(answers)
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 401 if access token is missing', async () => {
      await request(app).post('/v1/quiz/submit').send().expect(httpStatus.UNAUTHORIZED);
    });
  });
});
