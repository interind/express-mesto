/* eslint-disable no-console */
const mongoose = require('mongoose');
const config = require('config');
const app = require('./app.js');

const mongodbUrl = config.get('mongodbUrl');
const PORT = config.get('PORT') || 3000;
const BASE_PATH = `http://localhost:${PORT}`;

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

start();
