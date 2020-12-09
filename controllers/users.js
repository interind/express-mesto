const User = require('../models/user');
const {
  ERROR_CODE_CORRECT,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_DEFAULT,
} = require('../utils/constants.js');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length !== 0) {
        return res.send({ data: users });
      }
      return res.send({ message: 'пользователей нет' });
    })
    .catch((err) => res.send({ message: err.name }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user !== null) {
        return res.send({ data: user });
      }
      return res.status(ERROR_CODE_NOT_FOUND).send({ message: 'такого пользователя нет' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_CORRECT).send({ message: err.message });
      }
      return res.status(ERROR_CODE_DEFAULT).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(ERROR_CODE_CORRECT).send({ message: err.message }));
};
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
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
      upsert: true,
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
