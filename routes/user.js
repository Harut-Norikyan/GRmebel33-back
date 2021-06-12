const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');
const { check } = require("express-validator");

router.post("/add-user", [
  check("firstName", "Имя пользователя не может быть пустым !!!").notEmpty(),
  check("lastName", "Фамилия пользователя не может быть пустым !!!").notEmpty(),
  check("email", "Электронная почта не действительна !!!").isEmail(),
  check("password", "Пароль не может быть пустым !!!").notEmpty(),
], UserController.registration);
router.post("/login", [
  check("email", "Электронная почта не действительна !!!").isEmail(),
  check("password", "Пароль не может быть пустым !!!").notEmpty(),
], UserController.login);
router.get("/get-users", auth, UserController.getUsers);
router.post("/submit-your-application", UserController.submitYourApplication);
router.put("/update-user-by-id", auth, UserController.updateUserById);
router.delete("/remove-user", auth, UserController.removeUserById);

module.exports = router;