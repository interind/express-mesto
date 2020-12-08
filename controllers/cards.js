const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    // .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const {
    name, link, likes, createAt, ownerId,
  } = req.body;

  Card.create({
    name, link, likes, createAt, owner: ownerId,
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
