const config = require('config');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const ERROR_CODE_CORRECT = config.get('ERROR_CORRECT');
const ERROR_CODE_NOT_FOUND = config.get('ERROR_NOT_FOUND');
const ERROR_CODE_DEFAULT = config.get('ERROR_DEFAULT');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => res.send({ token: user._id })) // токен ответ
    .catch((err) => res.status(ERROR_CODE_CORRECT).send({ message: err.message }));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.send({ message: err.name }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      return res
        .status(ERROR_CODE_NOT_FOUND)
        .send({ message: 'Такого пользователя нет!⚠️' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(ERROR_CODE_CORRECT)
          .send({ message: 'Ошибка id пользователя!⚠️' });
      }
      return res.status(ERROR_CODE_DEFAULT).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body; // нужно хэшировать пароль.

  bcrypt.hash(password, 10).then((hash) => User.create({
    name,
    about,
    avatar,
    email,
    password: hash,
  }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_CORRECT).send({ message: err.message });
      }
      return res.status(ERROR_CODE_DEFAULT).send({ message: err.message });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_CORRECT).send({ message: err.message });
      }
      return res.status(ERROR_CODE_DEFAULT).send({ message: err.message });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_CORRECT).send({ message: err.message });
      }
      return res.status(ERROR_CODE_DEFAULT).send({ message: err.message });
    });
};
