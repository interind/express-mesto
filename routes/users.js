const router = require('express').Router();
const getUsers = require('../controllers/users.js');
const getUser = require('../controllers/user.js');

router.get('/', getUsers);
router.get('/:id', getUser);

module.exports = router;
