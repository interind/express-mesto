const fs = require('fs');
const router = require('express').Router();
const path = require('path');

const user = [];
const main = {
  name: "Douglas Engelbart",
  about: "Engineer, inventor",
  avatar:
    "https://images.fineartamerica.com/images-medium-large-5/douglas-engelbart-emilio-segre-visual-archivesamerican-institute-of-physics.jpg",
  _id: "3c8c16ee9b1f89a2f8b5e4b2",
};

router.get('/users', (req, res) => {
  // if (!users[req.params.id]) {
  //   res.send({ error: 'Такого пользователя нет' });
  //   return;
  // }

  fs.readFile(path.join(__dirname, '..', 'data', 'users.json'), 'utf8', (err, data) => {
    if (err) throw err;
    user.push(data);

    res.status(200).send(main);
  });
});

module.exports = router;
