const fs = require('fs');
const router = require('express').Router();
const path = require('path');

router.get('/users', (req, res) => {
  // if (!users[req.params.id]) {
  //   res.send({ error: 'Такого пользователя нет' });
  //   return;
  // }
  const dataPath = path.join(__dirname, "..", "data", "users.json");

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const users = Array.from(JSON.parse(data));
      res.status(200).send(users);
    }
  });
});

module.exports = router;
