const router = require('express').Router();
const auth = require('../middlewares/auth.js');
const {
  createUser,
  login,
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users.js');

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/signup', createUser);
router.post('/signin', login);
router.patch('/users/me', auth, updateUser);
router.patch('/users/me/avatar', auth, updateUserAvatar);

module.exports = router;
