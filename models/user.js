const mongoose = require('mongoose');
const { regHttp } = require('../utils/reg.ext.js');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regHttp.test(v),
    },
    message: 'Ошибка в ссылке Аватара',
  },
});

module.exports = mongoose.model('user', userSchema);
