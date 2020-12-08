const router = require('express').Router();
const { getCards, createCard } = require('../controllers/cards.js');

router.get('/', getCards);
router.post('/', createCard);

module.exports = router;
