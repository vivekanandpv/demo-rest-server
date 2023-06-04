/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - gender
 *         - ipAddress
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the book
 *         firstName:
 *           type: string
 *           description: First name
 *         lastName:
 *           type: string
 *           description: Last name
 *         email:
 *           type: string
 *           description: Email
 *         gender:
 *           type: string
 *           description: Gender
 *         ipAddress:
 *           type: string
 *           description: IP Address
 *       example:
 *         id: 1
 *         firstName: Nissy
 *         lastName: Luckes
 *         email: nluckes9@princeton.edu
 *         gender: Female
 *         ipAddress: 114.38.254.142
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users RESTful Webservice
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: All users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *   put:
 *     summary: Update the user by id
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *   delete:
 *     summary: Delete the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The user id
 *     responses:
 *       204:
 *         description: The user deleted by id
 *
 *
 */

var express = require('express');
var router = express.Router();
var users = require('../data/user.data');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json(users);
});

router.get('/:id', function (req, res, next) {
  const user = users.find((u) => u.id === +req.params.id);
  if (!user) {
    res.status(404).send();
  } else {
    res.json(user);
  }
});

router.post('/', function (req, res, next) {
  req.body.createdAt = new Date();
  res.json(req.body);
});

router.put('/:id', function (req, res, next) {
  req.body.updatedAt = new Date();
  res.json(req.body);
});

router.patch('/:id', function (req, res, next) {
  req.body.updatedAt = new Date();
  res.json(req.body);
});

router.delete('/:id', function (req, res, next) {
  res.status(204).send();
});

module.exports = router;
