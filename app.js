const express = require('express');
const app = express();
const authRoutes = require('./routes/api');

app.use(express.json());

// Подключаем маршруты для обработки запросов на авторизацию и регистрацию.
app.use('/api/auth', authRoutes);

