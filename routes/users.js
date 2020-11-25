const fs = require('fs');
const router = require('express').Router();
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'users.json');

let users = {};

fs.readFile(dataPath, 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  users = Array.from(JSON.parse(data));
});

router.get('/', (req, res) => {
  res.status(200).send(users);
});

router.get("/:id", (req, res) => {
  if (users.some((i) => i._id === req.params.id)) {
    const user = users.filter((item) => item._id === req.params.id);
    res.status(200).send(...user);
  } else {
    res.status(404).send({ message: "Нет пользователя с таким id" });
  }
});
module.exports = router;
