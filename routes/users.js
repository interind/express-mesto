const fs = require('fs');
const router = require('express').Router();
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'users.json');

let users = {};

router.get('/', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message });
      return;
    }
    users = Array.from(JSON.parse(data));
    res.status(200).send(users);
  });
});

router.get('/:id', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message });
      return;
    }
    users = Array.from(JSON.parse(data));
    if (users.some((i) => i._id === req.params.id)) {
      const user = users.filter((item) => item._id === req.params.id);
      res.status(200).send(...user);
    } else {
      res.status(404).send({ message: "Нет пользователя с таким id" });
    }
  });
});
module.exports = router;
