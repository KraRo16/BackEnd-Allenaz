const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models');


// Обработка запроса на авторизацию пользователя.
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ищем пользователя по email в базе данных.
    const user = await User.findOne({ email });

    // Проверяем, что пользователь найден и пароль совпадает.
    if (user && await bcrypt.compare(password, user.password)) {
      // Создаем JWT-токен при успешной авторизации пользователя.
      const token = jwt.sign({ userId: user._id }, 'secret');

      res.status(200).json({ user, token });
    } else {
      res.status(400).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports =  login ;