/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - make
 *         - model
 *         - year
 *         - vin
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the book
 *         make:
 *           type: string
 *           description: Manufacturer of the car
 *         model:
 *           type: string
 *           description: Model of the car
 *         year:
 *           type: number
 *           description: Year of manufacture
 *         vin:
 *           type: string
 *           description: Vehicle identification number
 *       example:
 *         id: 1
 *         make: Oldsmobile
 *         model: Bravada
 *         year: 1994
 *         vin: 1G6KD54Y65U989757
 */
/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: The cars RESTful Webservice
 * /api/v1/cars:
 *   get:
 *     summary: Get all cars
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: The created car.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *   post:
 *     summary: Create a new car
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
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
var cars = require('../data/car.data');

const serverSecret =
  '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';

function generateAccessToken(username) {
  return jwt.sign(username, serverSecret, { expiresIn: '1800s' });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, serverSecret, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

function adminAuthorize(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, serverSecret, (err, user) => {
    if (err) return res.sendStatus(403);

    if (!user.roles.includes('admin')) {
      return res.sendStatus(401);
    }

    next();
  });
}

/* GET users listing. */
router.get('/', authenticateToken, function (req, res, next) {
  res.json(cars);
});

router.get('/:id', authenticateToken, function (req, res, next) {
  const user = cars.find((u) => u.id === +req.params.id);
  if (!user) {
    res.status(404).send();
  } else {
    res.json(user);
  }
});

router.get('/admin/:id', adminAuthorize, function (req, res, next) {
  const user = cars.find((u) => u.id === +req.params.id);
  if (!user) {
    res.status(404).send();
  } else {
    res.json(user);
  }
});

router.post('/', authenticateToken, function (req, res, next) {
  req.body.createdAt = new Date();
  res.json(req.body);
});

router.put('/:id', authenticateToken, function (req, res, next) {
  req.body.updatedAt = new Date();
  res.json(req.body);
});

router.patch('/:id', authenticateToken, function (req, res, next) {
  req.body.updatedAt = new Date();
  res.json(req.body);
});

router.delete('/:id', authenticateToken, function (req, res, next) {
  res.status(204).send();
});

module.exports = router;
