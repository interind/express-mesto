const fs = require('fs');
const path = require('path');
const router = require('express').Router();

router.get('/cards', (req, res) => {
  // if (!cards[req.params.id]) {
  //   res.send({ error: 'Такого пользователя нет' });
  //   return;
  // }
  fs.readFile(path.join(__dirname, '..', 'data', 'cards.json'),
    'utf8', (err, data) => {
      if (err) throw err;
      const arr = [data];
      const str = arr.join(", ");
      res.status(200).send(str);
    });
});

module.exports = router;
