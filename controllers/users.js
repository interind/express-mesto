const { NODE_ENV, JWT_SECRET } = process.env;
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : config.get('secretKey'),
        {
          expiresIn: '7d',
        },
      );
      res.send({ token });
    })
    .catch((err) => res.status(config.get('unAuthorized')).send({ message: err.message }));
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
        .status(config.get('doNotFind'))
        .send({ message: 'Такого пользователя нет!⚠️' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(config.get('badRequest'))
          .send({ message: 'Ошибка id пользователя!⚠️' });
      }
      return res.status(config.get('default')).send({ message: err.message });
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
        return res
          .status(config.get('badRequest'))
          .send({ message: err.message });
      }
      return res.status(config.get('default')).send({ message: err.message });
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
        return res
          .status(config.get('badRequest'))
          .send({ message: err.message });
      }
      return res.status(config.get('default')).send({ message: err.message });
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
        return res
          .status(config.get('badRequest'))
          .send({ message: err.message });
      }
      return res.status(config.get('default')).send({ message: err.message });
    });
};
