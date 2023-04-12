const jwt = require('jsonwebtoken');

// Проверяем, что пользователь авторизован с помощью JWT-токена.
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = { requireAuth };