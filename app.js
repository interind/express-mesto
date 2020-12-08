/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users.js');
const routerCards = require('./routes/cards.js');
const routerError = require('./routes/error.js');

const PORT = process.env.PORT || 3000;
const { BASE_PATH = `http://localhost:${PORT}` } = process.env;
const app = express();

async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () => {
      console.log(`the server is running at ${BASE_PATH}`);
    });
  } catch (err) {
    console.log(err);
  }
}
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', routerUsers);
app.use('/cards', routerCards);
app.use('*', routerError);

start();
