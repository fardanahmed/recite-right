const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const quizValidation = require('../../validations/quiz.validation');
const quizController = require('../../controllers/quiz.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Quiz
 *   description: Quiz generation and management
 */

/**
 * @swagger
 * /v1/quiz:
 *   post:
 *     summary: Generate a quiz with multiple choice questions
 *     description: Generates a quiz about a specified topic with the requested number of questions
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - topic
 *             properties:
 *               topic:
 *                 type: string
 *                 description: The topic for the quiz
 *                 example: "Surahs 78 to 114 of the Quran"
 *               numQuestions:
 *                 type: integer
 *                 description: Number of questions to generate (1-20)
 *                 minimum: 1
 *                 maximum: 20
 *                 default: 15
 *                 example: 10
 *     responses:
 *       "200":
 *         description: Quiz generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     title:
 *                       type: string
 *                       example: "Surahs 78 to 114 Quiz"
 *                     description:
 *                       type: string
 *                       example: "A quiz about Surahs 78 to 114 with 10 questions"
 *                     questions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           question:
 *                             type: string
 *                             example: "What is the name of Surah 78?"
 *                           options:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["An-Naba", "An-Nazi'at", "Abasa", "At-Takwir"]
 *                           correctAnswer:
 *                             type: string
 *                             example: "A"
 *       "400":
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Number of questions must be between 1 and 20"
 *       "500":
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Failed to generate quiz"
 */
router
  .route('/')
  .post(auth(), validate(quizValidation.generateQuiz), quizController.getQuiz)
  .get(auth(), quizController.getQuizzes);

/**
 * @swagger
 * /v1/quiz/{quizId}:
 *   get:
 *     summary: Get quiz details
 *     description: Get detailed information about a specific quiz
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: string
 *         description: Quiz ID
 *     responses:
 *       "200":
 *         description: Quiz details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     title:
 *                       type: string
 *                       example: "Surahs 78 to 114 Quiz"
 *                     description:
 *                       type: string
 *                       example: "A quiz about Surahs 78 to 114 with 10 questions"
 *                     questions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           question:
 *                             type: string
 *                             example: "What is the name of Surah 78?"
 *                           options:
 *                             type: array
 *                             items:
 *                               type: string
 *                             example: ["An-Naba", "An-Nazi'at", "Abasa", "At-Takwir"]
 *                           correctAnswer:
 *                             type: string
 *                             example: "A"
 *                     attempts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           user:
 *                             type: string
 *                             example: "507f1f77bcf86cd799439011"
 *                           score:
 *                             type: integer
 *                             example: 8
 *                           timeSpent:
 *                             type: integer
 *                             example: 240
 *       "404":
 *         description: Quiz not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Quiz not found"
 */
router.route('/:quizId').get(auth(), quizController.getQuizDetails);

/**
 * @swagger
 * /v1/quiz/submit:
 *   post:
 *     summary: Submit a quiz
 *     description: Submits a quiz and checks the answers
 *     tags: [Quiz]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quizId
 *               - answers
 *             properties:
 *               quizId:
 *                 type: string
 *                 description: The ID of the quiz
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - questionId
 *                     - selectedOption
 *                   properties:
 *                     questionId:
 *                       type: string
 *                       description: The ID of the question
 *                     selectedOption:
 *                       type: string
 *                       description: The selected answer option (A, B, C, or D)
 *     responses:
 *       "200":
 *         description: Quiz submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     score:
 *                       type: integer
 *                       example: 8
 *                     totalQuestions:
 *                       type: integer
 *                       example: 10
 *                     correctAnswers:
 *                       type: integer
 *                       example: 8
 *                     attemptId:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *       "400":
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Invalid quiz ID or answers"
 *       "404":
 *         description: Quiz not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Quiz not found"
 */
router.route('/submit').post(auth(), validate(quizValidation.submitQuiz), quizController.submitQuiz);

module.exports = router;
