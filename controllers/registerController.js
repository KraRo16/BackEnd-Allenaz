const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models');

// Обработка запроса на регистрацию пользователя.
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Хешируем пароль перед сохранением в базу данных.
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Создаем JWT-токен при успешной регистрации пользователя.
    const token = jwt.sign({ userId: user._id }, 'secret');

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


module.exports =  register ;