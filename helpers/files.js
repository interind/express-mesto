/* eslint-disable no-console */
const fsPromises = require('fs').promises;

const getDataFromFile = (pathToFile) => fsPromises.readFile(pathToFile, { encoding: 'utf-8' })
  .then((data) => JSON.parse(data))
  .catch((err) => {
    console.log(err.message);
    throw err;
  });

module.exports = getDataFromFile;
