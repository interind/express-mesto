const config = require('config');
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(config.get('default')).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;

  const {
    name, link,
  } = req.body;

  Card.create({
    name,
    link,
    owner,
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(config.get('badRequest'))
          .send({ message: err.message });
      }
      return res.status(config.get('default')).send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        return res.send({ message: 'карточка удалена' });
      }
      return res
        .status(config.get('doNotFind'))
        .send({ message: 'такой карточки нет' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(config.get('badRequest'))
          .send({ message: err.message });
      }
      return res.status(config.get('default')).send({ message: err.message });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      return res
        .status(config.get('doNotFind'))
        .send({ message: 'такой карточки нет' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(config.get('badRequest'))
          .send({ message: err.message });
      }
      return res.status(config.get('default')).send({ message: err.message });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      return res
        .status(config.get('doNotFind'))
        .send({ message: 'такой карточки нет' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(config.get('badRequest'))
          .send({ message: err.message });
      }
      return res.status(config.get('default')).send({ message: err.message });
    });
};
