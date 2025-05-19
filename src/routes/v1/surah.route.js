const express = require('express');
const { dashboardSurah, SurahById } = require('../../controllers/surah.controller');

const router = express.Router();

router.get('/dashboard', dashboardSurah);
router.get('/get-surah/:surahId', SurahById);

module.exports = router;

// const API_URL = 'https://raw.githubusercontent.com/fardanahmed/recite-ml/refs/heads/master/data/quran.json'; // Predefined API URL

// router.get('/get-surah', async (req, res) => {
//   try {
//     // Fetch data from the external API
//     const response = await axios.get(API_URL);
//     let { data } = response;
//     data = data['1'];
//     // console.log(data);
//     res.setHeader('Content-Type', 'text/html; charset=utf-8');
//     const allDisplayText = Object.values(data)
//       // .flatMap((surah) => Object.values(surah))
//       .map((ayah) => ayah.displayText)
//       .filter((text) => text)
//       // .reverse()
//       .join(' ');
//     // console.log(allDisplayText); // Log the displayText to the console
//     res.json({ allDisplayText });
//   } catch (error) {
//     res.status(500).json({
//       error: 'Failed to fetch data from the third-party API',
//       details: error.message,
//     });
//   }
// });

/**
 * @swagger
 * tags:
 *   name: Surah
 *   description: Surah management and retrieval
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Surah:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         name:
 *           type: string
 *           example: "Al-Fatiha"
 *         nameTranslation:
 *           type: string
 *           example: "The Opening"
 *         numberOfAyahs:
 *           type: integer
 *           example: 7
 *         revelationType:
 *           type: string
 *           enum: [Meccan, Medinan]
 *           example: "Meccan"
 *         ayahs:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               number:
 *                 type: integer
 *                 example: 1
 *               text:
 *                 type: string
 *                 example: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ"
 *               translation:
 *                 type: string
 *                 example: "In the name of Allah, the Entirely Merciful, the Especially Merciful."
 *     SurahData:
 *       type: object
 *       properties:
 *         latin:
 *           type: string
 *           example: "An-Naba"
 *         english:
 *           type: string
 *           example: "The Tidings"
 *     DashboardResponse:
 *       type: object
 *       additionalProperties:
 *         $ref: '#/components/schemas/SurahData'
 *       example:
 *         "78":
 *           latin: "An-Naba"
 *           english: "The Tidings"
 *         "79":
 *           latin: "An-Nazi'at"
 *           english: "Those Who Drag Forth"
 */

/**
 * @swagger
 * /v1/surah/dashboard:
 *   get:
 *     summary: Get surahs 78-114
 *     description: Retrieve information about surahs 78 through 114, including their Latin and English names.
 *     tags: [Surah]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardResponse'
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Error fetching data"
 */

/**
 * @swagger
 * /v1/surah/get-surah/{surahId}:
 *   get:
 *     summary: Get a surah by ID
 *     description: Retrieve a specific surah by its ID.
 *     tags: [Surah]
 *     parameters:
 *       - in: path
 *         name: surahId
 *         required: true
 *         schema:
 *           type: string
 *         description: Surah ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Surah'
 *             example:
 *               id: "507f1f77bcf86cd799439011"
 *               name: "Al-Fatiha"
 *               nameTranslation: "The Opening"
 *               numberOfAyahs: 7
 *               revelationType: "Meccan"
 *               ayahs:
 *                 - number: 1
 *                   text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ"
 *                   translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful."
 *       "404":
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 404
 *               message: "Surah not found"
 */
