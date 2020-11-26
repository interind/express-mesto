const fs = require('fs');
const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'data', 'cards.json'),
    'utf8', (err, data) => {
      if (err) {
        res.status(500).send({ message: `"${err}"` });
        return;
      }
      const cards = JSON.parse(data);
      res.status(200).send(cards);
    });
});

module.exports = router;
