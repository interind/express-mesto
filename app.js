/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users.js');
const routerCards = require('./routes/cards.js');
const routerError = require('./routes/error.js');

const PORT = config.get('PORT') || 3000;
const BASE_PATH = `http://localhost:${PORT}`;
const app = express();
const mongodbUrl = config.get('mongodbUrl');

async function start() {
  try {
    await mongoose.connect(mongodbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () => {
      console.log(`the server is running at ${BASE_PATH}`);
    });
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
}
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
app.use(routerUsers);
app.use(routerCards);
app.use(routerError);

start();
