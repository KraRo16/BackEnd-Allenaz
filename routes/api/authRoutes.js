const express = require('express');
const router = express.Router();
const { registerController, loginController } = require('../../controllers');
const  requireAuth  = require('../../middlewares');

// Обработка запроса на регистрацию пользователя.
router.post('/register', registerController);

// Обработка запроса на авторизацию пользователя.
router.post('/login', loginController);

// Пример защищенного маршрута, который требует авторизации пользователя.
router.get('/protected', requireAuth, (req, res) => {
  res.json({ message: 'You are authorized' });
});

module.exports = router;