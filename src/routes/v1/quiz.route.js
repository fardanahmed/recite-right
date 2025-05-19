const express = require('express');
const { getQuiz } = require('../../controllers/quiz.controller');
const validate = require('../../middlewares/validate');
const quizValidation = require('../../validations/quiz.validation');

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
 *                     statistics:
 *                       type: object
 *                       properties:
 *                         totalQuestions:
 *                           type: integer
 *                           example: 10
 *                         completeQuestions:
 *                           type: integer
 *                           example: 10
 *                         questionsWithAnswers:
 *                           type: integer
 *                           example: 10
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
router.post('/', validate(quizValidation.generateQuiz), getQuiz);

module.exports = router;
