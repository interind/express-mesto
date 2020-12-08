const router = require('express').Router();
const { createUser, getUsers } = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);

module.exports = router;
