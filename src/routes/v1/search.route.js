const express = require('express');

const router = express.Router();
const searchController = require('../../controllers/search.controller');

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Search functionality for Quranic content
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SurahData:
 *       type: object
 *       properties:
 *         latin:
 *           type: string
 *           description: Latin name of the surah
 *           example: "An-Naba"
 */

/**
 * @swagger
 * /v1/search:
 *   get:
 *     summary: Get information about Surahs 78-114
 *     description: Returns a list of surahs from 78 to 114 with their Latin names
 *     tags: [Search]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: object
 *                   additionalProperties:
 *                     $ref: '#/components/schemas/SurahData'
 *             example:
 *               response:
 *                 "78":
 *                   latin: "An-Naba"
 *                 "79":
 *                   latin: "An-Nazi'at"
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

router.get('/', searchController.search);

module.exports = router;
