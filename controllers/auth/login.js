const { User } = require("../../models/userAuth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { RequestError } = require("../../helpers");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  // Проверка наличия значения email
  if (!email) {
    throw RequestError(400, "Email is required");
  }

  // Проверка наличия значения password
  if (!password) {
    throw RequestError(400, "Password is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw RequestError(401, "Email or password is wrong");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token });
};

module.exports = login;
