/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const routerAuth = require('./routes/auth.js');
const routerUsers = require('./routes/users.js');
const routerCards = require('./routes/cards.js');
const routerError = require('./routes/error.js');

const PORT = process.env.PORT || config.get('PORT');
const BASE_PATH = `http://localhost:${PORT}`;
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `${BASE_PATH}`);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(routerAuth);
app.use(routerUsers);
app.use(routerCards);
app.use(routerError);

app.use(errorLogger); // log ошибок
app.use(errors()); // ошибки celebrate
app.use((error, req, res, next) => {
  res.status(error.status || config.get('default')).send({
    status: error.status,
    message: error.message,
  });
  next();
});

module.exports = app;
