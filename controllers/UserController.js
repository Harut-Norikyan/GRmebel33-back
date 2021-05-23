const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require("../config");
const { validationResult } = require("express-validator")

generateAccessToken = (id) => {
  const payload = { id }
  return jwt.sign(payload, secret, { expiresIn: "6h" });
}

module.exports = {
  registration: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Ошибка при регистрации !!!", errors })
      }
      const { firstName, lastName, email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "Пользователь с такой электронной почтой уже существует !!!" })
      }
      const hashPassword = bcrypt.hashSync(password, 5);
      await User.create({
        firstName, lastName, email, password: hashPassword
      })
      return res.status(200).json({
        message: "Пользователь успешно добавлен !!!"
      })
    } catch (error) {
      next(error)
    }
  },

  login: async (req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*");
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Ошибка при входе !!!", errors })
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Неверная электронная почта или пароль !!!" });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Введен неверный пароль !!!" })
      }
      const token = generateAccessToken(user._id);
      return res.status(200).json({
        token,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      })
    } catch (error) {
      res.status(500).json({
        error: error
      });
      next(error)
    }
  },

  getUsers: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
      res.json("Server work")
    } catch (error) {
      next(error)
    }
  },

  updateUserById: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {

    } catch (error) {
      next(error)
    }
  },

  removeUserById: async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {

    } catch (error) {
      next(error)
    }
  },

}