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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 */

router.get('/search', searchController.search);

module.exports = router;
