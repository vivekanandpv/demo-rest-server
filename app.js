var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var carsRouter = require('./routes/cars');

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Demo RESTful Webservice API Documentation',
      version: '1.0.0',
      description: 'RESTful webservice for Angular, React, Vue apps',
      license: {
        name: 'MIT',
        url: 'https://vivekanandpv.com',
      },
      contact: {
        name: 'Vivekanand P V',
        url: 'https://vivekanandpv.com',
        email: 'vivekanandpv@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/cars', carsRouter);
app.use(
  '/swagger-ui',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use(function (req, res) {
  res.status(404).send();
});

module.exports = app;
