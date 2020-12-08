const mongoose = require('mongoose');
const { regHttp } = require('../utils/reg.ext.js');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return regHttp.test(link);
      },
      message: 'Ошибка в ссылке Карточки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: {
    type: Array,
    default: [],
  },
  createAt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('card', cardSchema);
