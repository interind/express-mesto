const path = require('path');
const express = require('express');
const routerUsers = require('./routes/users.js');
const routerCards = require('./routes/cards.js');
const routerError = require('./routes/error.js');

const PORT = process.env.PORT || 3000;
const { BASE_PATH = `http://localhost:${PORT}` } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', routerUsers);
app.use('/cards', routerCards);
app.use('*', routerError);

app.listen(PORT, () => {
  console.log(`'the server is running at' ${BASE_PATH}`);
});
