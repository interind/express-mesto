const router = require('express').Router();
const { getCards, createCard } = require('../controllers/cards.js');

router.get('/cards', getCards);
router.post('/cards', createCard);

module.exports = router;
