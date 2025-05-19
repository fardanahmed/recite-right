const { GoogleGenAI } = require('@google/genai');
const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();

// Ensure GEMINI_API_KEY is set in environment variables
if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is not set');
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL_NAME = 'gemini-2.0-flash-001';

// Function to parse the quiz text into structured data
function parseQuiz(text) {
  if (!text || typeof text !== 'string') {
    throw new Error('Invalid quiz text format');
  }

  const questions = [];
  const lines = text.split('\n');
  let currentQuestion = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line) continue;

    // Check if line is a question (starts with a number and dot)
    if (/^\d+\./.test(line)) {
      if (currentQuestion) {
        questions.push(currentQuestion);
      }
      currentQuestion = {
        question: line.replace(/^\d+\.\s*/, ''),
        options: [],
        correctAnswer: '',
      };
    }
    // Check if line is an option (starts with a letter and parenthesis)
    else if (/^[A-D][).]\s/.test(line)) {
      if (currentQuestion) {
        const option = line.replace(/^[A-D][).]\s*/, '');
        currentQuestion.options.push(option);
      }
    }
    // Check if line contains the answer
    else if (line.toLowerCase().includes('answer:') || line.toLowerCase().includes('correct answer:')) {
      if (currentQuestion) {
        const answer = line.split(':')[1].trim();
        currentQuestion.correctAnswer = answer;
      }
    }
  }

  // Add the last question if exists
  if (currentQuestion) {
    questions.push(currentQuestion);
  }

  // Validate the parsed questions
  const validQuestions = questions.filter(
    (q) =>
      q.question &&
      q.options.length === 4 &&
      q.correctAnswer &&
      ['A', 'B', 'C', 'D'].includes(q.correctAnswer.toUpperCase()),
  );

  if (validQuestions.length === 0) {
    throw new Error('No valid questions could be parsed from the response');
  }

  return validQuestions;
}

const Quiz = async (req, res) => {
  try {
    // Validate request body
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Invalid request body format',
      });
    }

    // Set default values and validate
    const topic = req.body.topic || 'Surahs 78 to 114 of the Quran';
    const numQuestions = parseInt(req.body.numQuestions) || 15;

    if (numQuestions < 1 || numQuestions > 20) {
      return res.status(400).json({
        success: false,
        error: 'Number of questions must be between 1 and 20',
      });
    }

    const prompt = `Generate a quiz about ${topic} with ${numQuestions} multiple choice questions.
Each question should be formatted exactly as follows:

1. [Question text]
A) [Option 1]
B) [Option 2]
C) [Option 3]
D) [Option 4]
Answer: [Correct option letter A, B, C, or D]

Requirements:
- Each question must have exactly 4 options
- The correct answer must be one of A, B, C, or D
- Questions should be clear and well-formatted
- Include a blank line between questions
- Make sure each question is numbered sequentially`;

    const result = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    // Extract and parse the generated text
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return res.status(500).json({
        success: false,
        error: 'Failed to generate quiz content',
      });
    }

    const quizData = parseQuiz(text);

    return res.json({
      success: true,
      data: {
        questions: quizData,
        statistics: {
          totalQuestions: quizData.length,
          completeQuestions: quizData.filter((q) => q.options.length === 4).length,
          questionsWithAnswers: quizData.filter((q) => q.correctAnswer).length,
        },
      },
    });
  } catch (error) {
    //console.error('Error generating quiz:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate quiz',
    });
  }
};

module.exports = {
  Quiz,
};
