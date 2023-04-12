const mongoose = require('mongoose');

// Определяем схему для модели пользователя.
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Создаем модель пользователя на основе схемы.
const User = mongoose.model('user', userSchema);

module.exports = User;