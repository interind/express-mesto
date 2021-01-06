const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
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
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  createUser,
);
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  login,
);
router.patch('/users/me', auth, updateUser);
router.patch('/users/me/avatar', auth, updateUserAvatar);

module.exports = router;
