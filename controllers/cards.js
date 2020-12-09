const Card = require('../models/card');
const {
  ERROR_CODE_CORRECT,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_DEFAULT,
} = require('../utils/constants.js');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => {
      if (cards.length !== 0) {
        return res.send({ data: cards });
      }
      return res.status(ERROR_CODE_NOT_FOUND).send({ message: 'карточек нет' });
    })
    .catch((err) => res.status(ERROR_CODE_DEFAULT).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const {
    name, link,
  } = req.body;

  Card.create({
    name, link, owner,
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(ERROR_CODE_CORRECT).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card !== null) {
        return res.send({ message: 'карточка удалена' });
      }
      return res.status(ERROR_CODE_NOT_FOUND).send({ message: 'такой карточки нет' });
    }).catch((err) => res.status(ERROR_CODE_DEFAULT).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(ERROR_CODE_DEFAULT).send({ message: err.message }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(ERROR_CODE_DEFAULT).send({ message: err.message }));
};
