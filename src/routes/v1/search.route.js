const express = require('express');

const router = express.Router();
const searchController = require('../../controllers/search.controller');

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Search functionality
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SearchResult:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *         name:
 *           type: string
 *           example: "Al-Fatiha"
 *         type:
 *           type: string
 *           enum: [surah, ayah]
 *           example: "surah"
 *         text:
 *           type: string
 *           example: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ"
 */

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search for items
 *     description: Search for items based on a query.
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query
 *         example: "fatiha"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SearchResult'
 *             example:
 *               results:
 *                 - id: "507f1f77bcf86cd799439011"
 *                   name: "Al-Fatiha"
 *                   type: "surah"
 *                   text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ"
 *       "400":
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 400
 *               message: "Search query is required"
 */

router.get('/search', searchController.search);

module.exports = router;
