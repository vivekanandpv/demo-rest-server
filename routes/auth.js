/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Username
 *         password:
 *           type: string
 *           description: Password
 *       example:
 *         username: vivek
 *         password: greenfield
 */
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The auth RESTful Webservice
 * /api/v1/auth/login:
 *   post:
 *     summary: Login
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: The created car.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       500:
 *         description: Some server error
 * /api/v1/cars/{id}:
 *   get:
 *     summary: Get the car by id
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The car id
 *     responses:
 *       200:
 *         description: The car response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *   put:
 *     summary: Update the car by id
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The car id
 *     responses:
 *       200:
 *         description: The car response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *   delete:
 *     summary: Delete the car by id
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The car id
 *     responses:
 *       204:
 *         description: The car deleted by id
 *
 *
 */

var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const serverSecret =
  '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';

function generateAccessToken(username) {
  const payload = {
    username,
    roles: username === 'vivek' ? ['admin'] : ['user'],
  };
  return jwt.sign(payload, serverSecret, {
    expiresIn: '3600s',
  });
}

/* GET home page. */
router.post('/login', function (req, res, next) {
  const token = generateAccessToken(req.body.username);
  res.json({
    jwt: token,
  });
});

module.exports = router;
